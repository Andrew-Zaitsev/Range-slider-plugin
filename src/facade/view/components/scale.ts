import { defaultOptions } from '../../model/optionsTypes';
import ScaleLabel from './scaleLabel';

export default class Scale {
  private parent!: HTMLElement;

  private options: defaultOptions;

  private scaleElem!: HTMLElement;

  private scaleLabels: ScaleLabel[] = [];

  constructor(parent: HTMLElement, options: defaultOptions) {
    this.options = options;
    this.init(parent);
  }

  public getScaleElem(): HTMLElement {
    return this.scaleElem;
  }

  public set():void {
    this.parent.prepend(this.scaleElem);
  }

  private init(parent: HTMLElement):void {
    this.parent = parent;
    this.scaleElem = document.createElement('div');
    this.scaleElem.classList.add('slider__scale');

    this.setScaleLabels();
    this.updateLabelsValue();
  }

  private setScaleLabels(): void {
    for (let i = 0; i < this.options.scaleDivisionsNumber; i += 1) {
      this.scaleLabels.push(new ScaleLabel(this.scaleElem));
    }

    this.scaleLabels.forEach((scaleLabel) => this.scaleElem.append(scaleLabel.getElem()));
  }

  private updateLabelsValue() {
    const { minValue, maxValue, scaleDivisionsNumber } = this.options;
    const valueRange = maxValue - minValue;
    const labelValueStep = valueRange / (scaleDivisionsNumber - 1);
    let labelValue = minValue;

    this.scaleLabels.forEach((label: ScaleLabel, i: number) => {
      label.setLabelText(`${labelValue.toFixed(0)}`);
      labelValue += labelValueStep;
    });
  }
}

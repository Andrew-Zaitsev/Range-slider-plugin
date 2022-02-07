import { defaultOptions } from '../../model/optionsTypes';
import ThumbLabel from './thumbLabel';

export default class Thumb {
  private thumbElem!: HTMLElement;

  private thumbLabel!: ThumbLabel;

  private scaleIndent!: number;

  constructor(private parent: HTMLElement) {
    this.init();
  }

  private init(): void {
    this.thumbElem = document.createElement('div');
    this.thumbElem.classList.add('slider__thumb');

    this.thumbLabel = new ThumbLabel(this.getElem());
    this.setLabel();
  }

  public setLabel(): void {
    this.thumbElem.append(this.thumbLabel.getElem());
  }

  public updateLabel(options: defaultOptions, thumbIndex: number): void {
    const { values, hasLabels } = options;
    const value: number = values[thumbIndex];

    if (hasLabels) {
      if (!this.hasLabel()) this.setLabel();

      this.updateLabelValue(value);
    } else {
      this.removeLabel();
    }
  }

  public getElem(): HTMLElement {
    return this.thumbElem;
  }

  public setThumb(): void {
    this.parent.prepend(this.thumbElem);
  }

  public removeThumb(): void {
    this.getElem().remove();
  }

  public setScaleIndent(scaleIndent: number): void {
    this.scaleIndent = scaleIndent;
  }

  public setPosition(options: defaultOptions, i: number): void {
    const {
      minValue,
      maxValue,
      values,
      isVertical,
      hasRange,
    } = options;

    const scaleRange: number = maxValue - minValue; // диапазон значений шкалы
    const minValueThumbValueDiff: number = values[i] - minValue; // значение от минимальной точки шкалы до ползунка
    const thumbScaleRate: number = (minValueThumbValueDiff / scaleRange);

    const scaleCssLength = `(100% - (${this.scaleIndent}px * 2))`;

    if (isVertical) {
      this.thumbElem.style.top = `calc(${scaleCssLength} * ${1 - thumbScaleRate} + ${this.scaleIndent}px)`;
      this.thumbElem.style.left = 'auto';
    } else {
      this.thumbElem.style.left = `calc(${scaleCssLength} * ${thumbScaleRate} + ${this.scaleIndent}px)`;
      this.thumbElem.style.top = 'auto';
    }
  }

  private hasLabel(): boolean {
    return (this.getElem().querySelector('.slider__thumb-label') !== null);
  }

  private removeLabel(): void {
    this.thumbLabel.getElem().remove();
  }

  private updateLabelValue(value: number): void {
    this.thumbLabel.setLabelText(String(value));
  }
}

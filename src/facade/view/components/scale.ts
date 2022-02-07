import { defaultOptions } from '../../model/optionsTypes';
import ScaleLabel from './scaleLabel';

type scaleSegmentsOptions = {
  integerSegmentValue?: number;
  integerSegmentsNumber?: number;
  residualSegmentValue?: number;
};

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

    if (this.options.hasScale) {
      this.createScaleLabels();
      this.renderScaleLabels();
    }
  }

  private createScaleLabels(): void {
    const { minValue } = this.options;
    const segments = this.calculateScaleSegments();
    const { integerSegmentsNumber = 0, integerSegmentValue, residualSegmentValue } = segments;
    const residualSegmentsNumber = (residualSegmentValue !== undefined) ? 1 : 0;
    const labelsNumber = integerSegmentsNumber + residualSegmentsNumber + 1;

    console.log('предусмотреть валидацию для недопустимости длины шкалы меньше 1');

    const segmentsValuesSequence: number[] = (new Array(integerSegmentsNumber)).fill(integerSegmentValue);

    if (residualSegmentValue !== undefined) segmentsValuesSequence.push(residualSegmentValue);

    for (let i = 0, labelValue: number = minValue; i < labelsNumber; i += 1) {
      const label = new ScaleLabel(this.scaleElem);
      label.setPosition(this.options, labelValue);
      label.setLabelText(labelValue.toString());
      this.scaleLabels.push(label);
      labelValue += segmentsValuesSequence[i];
    }
  }

  private renderScaleLabels(): void {
    this.scaleLabels.forEach((scaleLabel) => this.scaleElem.append(scaleLabel.getElem()));
  }

  private calculateScaleSegments(): scaleSegmentsOptions {
    const { minValue, maxValue } = this.options;
    let { scaleDivisionsNumber } = this.options;
    const scaleValuesRange: number = Math.abs(maxValue - minValue);
    const scaleSegments: scaleSegmentsOptions = {};
    let integerSegmentValue: number;
    let integerSegmentsNumber: number;

    while (scaleDivisionsNumber >= 3) { // Nd
      const scaleSectionsNumber: number = scaleDivisionsNumber - 1;
      const supposedScaleSectionLength: number = scaleValuesRange / scaleSectionsNumber;

      if (supposedScaleSectionLength < 1) {
        scaleDivisionsNumber -= 1;
      } else {
        if (Number.isInteger(supposedScaleSectionLength)) {
          scaleSegments.integerSegmentsNumber = scaleDivisionsNumber - 1;
          scaleSegments.integerSegmentValue = supposedScaleSectionLength;

          return scaleSegments;
        }
        integerSegmentValue = Math.ceil(supposedScaleSectionLength);
        integerSegmentsNumber = scaleDivisionsNumber - 2;

        while (integerSegmentValue * integerSegmentsNumber >= scaleValuesRange) {
          if ((integerSegmentValue - 1) < 1) {
            if ((integerSegmentsNumber - 1) < 1) {
              scaleSegments.residualSegmentValue = scaleValuesRange;

              return scaleSegments;
            }
            integerSegmentsNumber -= 1;
          } else {
            integerSegmentValue -= 1;
          }
        }

        scaleSegments.integerSegmentsNumber = integerSegmentsNumber;
        scaleSegments.integerSegmentValue = integerSegmentValue;
        scaleSegments.residualSegmentValue = scaleValuesRange - (integerSegmentValue * integerSegmentsNumber);

        return scaleSegments;
      }
    }
    scaleSegments.residualSegmentValue = scaleValuesRange; // 'меньше 3х делений, длина отрезка = длине шкалы';

    return scaleSegments;
  }
}

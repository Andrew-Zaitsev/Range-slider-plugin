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
      // this.updateLabelsValues();
    }
  }

  private createScaleLabels(): void {
    const { minValue } = this.options;
    const segments = this.calculateScaleSegments();
    const { integerSegmentsNumber = 0, integerSegmentValue, residualSegmentValue } = segments;
    const residualSegmentsNumber = (residualSegmentValue !== undefined) ? 1 : 0;
    const labelsNumber = integerSegmentsNumber + residualSegmentsNumber + 1;

    console.log('предусмотреть валидацию для недопустимости длины шкалы меньше 1');

    // for (let i = 0; i < this.options.scaleDivisionsNumber; i += 1) {
    // this.scaleLabels.push(new ScaleLabel(this.scaleElem));
    // }
    const segmentsValuesSequence: number[] = (new Array(integerSegmentsNumber)).fill(integerSegmentValue);

    if (residualSegmentValue !== undefined) segmentsValuesSequence.push(residualSegmentValue);

    console.log(labelsNumber, segments, segmentsValuesSequence);

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
    console.log('_______________ расчет отрезков');
    const scaleSegments: scaleSegmentsOptions = {};
    // расчет числа целочисленных отрезков шкалы и их длины в единицах измерения значения слайдера
    // scaleDivisionsNamber >= 2
    // integerScaleSectionLength - целое
    // scaleSectionLength
    // ___________________________________
    const result = 'ничего не решили по отрезкам шкалы';
    let Ac: number;
    let Nc: number;
    let Op: number;
    const { minValue, maxValue } = this.options;
    let { scaleDivisionsNumber } = this.options;
    const scaleValuesRange: number = Math.abs(maxValue - minValue); // Аш

    while (scaleDivisionsNumber >= 3) { // Nd
      const scaleSectionsNumber: number = scaleDivisionsNumber - 1; // No
      const supposedScaleSectionLength: number = scaleValuesRange / scaleSectionsNumber; // A
      console.log('длина отрезка шкалы: ', supposedScaleSectionLength);
      console.log('диапазон шкалы', scaleValuesRange, 'число отрезков', scaleSectionsNumber);

      if (supposedScaleSectionLength < 1) {
        scaleDivisionsNumber -= 1;
      } else {
        console.log('A >= 1');
        if (Number.isInteger(supposedScaleSectionLength)) { // ***
          console.log('А целое, все отрезки равны');
          scaleSegments.integerSegmentsNumber = scaleDivisionsNumber - 1;
          scaleSegments.integerSegmentValue = supposedScaleSectionLength;

          console.log('_______________');
          return scaleSegments;
        }
        console.log('A не целое');

        Ac = Math.ceil(supposedScaleSectionLength);
        Nc = scaleDivisionsNumber - 2;

        while (Ac * Nc >= scaleValuesRange) { // ****
          console.log('Ac * Nc >= scaleValuesRange');
          if ((Ac - 1) < 1) {
            if ((Nc - 1) < 1) {
              console.log('(Nc - 1) < 1, ');
              scaleSegments.residualSegmentValue = scaleValuesRange;

              return scaleSegments;
            }

            Nc -= 1;
          } else {
            Ac -= 1;
          }

          // return {};
        }

        Op = scaleValuesRange - (Ac * Nc);
        scaleSegments.integerSegmentsNumber = Nc;
        scaleSegments.integerSegmentValue = Ac;
        scaleSegments.residualSegmentValue = Op;

        console.log('_______________');
        return scaleSegments;
      }
    }

    scaleSegments.residualSegmentValue = scaleValuesRange; // 'меньше 3х делений, длина отрезка = длине шкалы';
    console.log('_______________');
    // ___________________________________
    // конец расчета делений

    return scaleSegments;
  }

  private updateLabelsValues() {
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

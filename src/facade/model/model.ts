import Observer from '../observer/observer';
import type { defaultOptions, userOptions } from './optionsTypes';

export default class Model {
  static readonly defaultOptions: defaultOptions = {
    minValue: 10,
    maxValue: 70,
    values: [15, 20],
    // добавить проверку на единичное значение при hasrange: false и на нахождение values в пределах между мин-макс
    isVertical: false,
    hasScale: true,
    hasRange: true,
    hasLabels: false,
    scaleDivisionsNumber: 4,
    step: 5,
  };

  private sliderData!: defaultOptions;

  public observer!: Observer;

  constructor(initOptions: userOptions) {
    this.init(initOptions);
  }

  public update(newOptions: userOptions): void {
    const {
      minValue: newMinValue,
      maxValue: newMaxValue,
      values: newValues,
      isVertical: newIsVertical,
      hasScale: newHasScale,
      hasRange,
      hasLabels,
      scaleDivisionsNumber: newScaleDivisionsNumber,
      step,
    } = newOptions;
    const emitOptions: userOptions = {};
    // в условиях производить валидацию значений (если невалидно - не обновлять sliderData и удалять из newOptions)
    if (newValues !== undefined) {
      console.log('***update model - values***');
      this.updateValues(newValues);
      emitOptions.values = newValues;
      // this.emitUpdates({ values: this.sliderData.values });
    }
    // реализовать апдейт мин мак значений и последующее изменение на виде
    if (newMinValue !== undefined) {
      this.updateMinValue(newMinValue);
      emitOptions.minValue = newMinValue;
    }
    if (newMaxValue !== undefined) {
      this.updateMaxValue(newMaxValue);
      emitOptions.maxValue = newMaxValue;
    }
    if (newIsVertical !== undefined) {
      this.updateIsVertical(newIsVertical);
      emitOptions.isVertical = newIsVertical;
    }
    if (newHasScale !== undefined) {
      this.updateHasScale(newHasScale);
      emitOptions.hasScale = newHasScale;
    }
    if (newScaleDivisionsNumber !== undefined) {
      // предусмотреть случай повторяющихся номеров делений при (число делений => maxValue - minValue)
      this.updateScaleDivisionsNumber(newScaleDivisionsNumber);
      emitOptions.scaleDivisionsNumber = newScaleDivisionsNumber;
    }
    if (Object.keys(emitOptions).length > 0) this.emitUpdates(emitOptions);
  }

  public getData(): defaultOptions {
    return this.sliderData;
  }

  private init(newOptions: userOptions) {
    this.observer = new Observer();
    this.setData(newOptions);
  }

  private setData(initData: userOptions): void {
    this.sliderData = {
      ...Model.defaultOptions,
      ...initData,
    };
  }

  private updateValues(data: number[]): void {
    this.sliderData.values = data;
  }

  private updateMinValue(data: number): void {
    this.sliderData.minValue = data;
  }

  private updateMaxValue(data: number): void {
    this.sliderData.maxValue = data;
  }

  private updateIsVertical(data: boolean): void {
    this.sliderData.isVertical = data;
  }

  private updateHasScale(data: boolean): void {
    this.sliderData.hasScale = data;
  }

  private updateScaleDivisionsNumber(data: number): void {
    this.sliderData.scaleDivisionsNumber = data;
  }

  private emitUpdates(newOptions: userOptions) {
    this.observer.emit(newOptions);
  }
}

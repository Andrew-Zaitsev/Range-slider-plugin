import Observer from '../observer/observer';
import type { defaultOptions, userOptions } from './optionsTypes';

export default class Model {
  static readonly defaultOptions: defaultOptions = {
    minValue: 10,
    maxValue: 70,
    values: [15, 20],
    // добавить проверку на единичное значение при hasrange: false и на нахождение values в пределах между мин-макс
    isVertical: false,
    hasScale: false,
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
      isVertical,
      hasScale,
      hasRange,
      hasLabels,
      scaleDivisionsNumber,
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
      console.log('***update model - min***');
      this.updateMinValue(newMinValue);
      emitOptions.minValue = newMinValue;
      // this.emitUpdates({ minValue: this.sliderData.minValue });
    }
    if (newMaxValue !== undefined) {
      console.log('***update model - max***');
      this.updateMaxValue(newMaxValue);
      emitOptions.maxValue = newMaxValue;
      // this.emitUpdates({ maxValue: this.sliderData.maxValue });
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

  private emitUpdates(newOptions: userOptions) {
    this.observer.emit(newOptions);
  }
}

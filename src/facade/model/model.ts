import Observer from '../observer/observer';
import type { defaultOptions, userOptions } from './optionsTypes';

export default class Model {
  static readonly defaultOptions: defaultOptions = {
    minValue: 10,
    maxValue: 70,
    values: [18, 50], // добавить проверку на единичное значение при hasrange: false и на нахождение values в пределах между мин-макс
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

  public update(options: userOptions): void {
    const {
      minValue,
      maxValue,
      values,
      isVertical,
      hasScale,
      hasRange,
      hasLabels,
      scaleDivisionsNumber,
      step,
    } = options;

    if (values !== undefined) {
      this.updateValues(values);
      this.emitUpdates({ values: this.sliderData.values });
    }
    console.log('***update model***', this.sliderData.values);
    // реализовать апдейт модели и последующее перемещение ползунка
  }

  public getData(): defaultOptions {
    return this.sliderData;
  }

  private init(options: userOptions) {
    this.observer = new Observer();
    this.setData(options);
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

  private emitUpdates(options: userOptions) {
    this.observer.emit(options);
  }
}

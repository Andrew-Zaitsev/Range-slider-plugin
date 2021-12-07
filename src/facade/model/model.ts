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

  constructor(initOptions: userOptions) {
    this.setData(initOptions);
  }

  private setData(initData: userOptions): void {
    this.sliderData = {
      ...Model.defaultOptions,
      ...initData,
    };
  }

  public getData(): defaultOptions {
    return this.sliderData;
  }

  public update(arr: any[]): void {
    // console.log(this);
    console.log(`***update model***arr:**${arr}**`);
  }
}

import type { defaultOptions, userOptions } from './optionsTypes';

export default class Model {
  static readonly defaultOptions: defaultOptions = {
    minValue: 10,
    maxValue: 70,
    isVertical: false,
    hasScale: false,
    values: [18, 50], // добавить проверку на единичное значение при hasrange: false и на нахождение values в пределах между мин-макс
    hasRange: true,
    hasLabels: false,
    step: 5,
  };

  private sliderData: defaultOptions;

  constructor(initOptions: userOptions) {
    this.setData(initOptions);
  }

  private setData(initData): void {
    this.sliderData = {
      ...Model.defaultOptions,
      ...initData,
    };
  }

  public getData() {
    return this.sliderData;
  }
}

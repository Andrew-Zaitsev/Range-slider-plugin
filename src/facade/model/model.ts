import type { defaultOptions, userOptions } from './optionsTypes';
import Presenter from '../presenter/presenter';

export default class Model {
  static readonly defaultOptions: defaultOptions = {
    minValue: 10,
    maxValue: 70,
    isVertical: false,
    hasScale: false,
    values: [18, 90], // добавить проверку на единичное значение при hasrange: false
    hasRange: true,
    hasLabels: false,
    step: 5,
  };

  private sliderData: defaultOptions;

  // private presenter: Presenter;

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

// console.log(this.sliderOptions);

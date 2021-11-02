import type { defaultOptions, userOptions } from './optionsTypes';
import Presenter from '../presenter/presenter';

export default class Model {
  static readonly defaultOptions: defaultOptions = {
    minValue: 10,
    maxValue: 70,
    isVertical: false,
    hasScale: false,
    hasRange: false,
    hasLabels: false,
    step: 5,
  };

  private sliderOptions: defaultOptions;

  // private presenter: Presenter;

  constructor(initOptions: userOptions) {
    this.setOptions(initOptions);
  }

  private setOptions(initData): void {
    this.sliderOptions = {
      ...Model.defaultOptions,
      ...initData,
    };
  }
}

// console.log(this.sliderOptions);

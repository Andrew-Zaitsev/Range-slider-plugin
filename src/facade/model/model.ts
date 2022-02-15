import type { defaultOptions, userOptions } from './optionsTypes';
import Observer from '../observer/observer';
import validators from './validators';

export default class Model {
  static readonly defaultOptions: defaultOptions = {
    minValue: 0,
    maxValue: 100,
    values: [20, 80],
    isVertical: false,
    hasScale: true,
    hasRange: true,
    hasLabels: true,
    scaleDivisionsNumber: 4,
    step: 1,
  };

  private sliderOptions: defaultOptions = Model.defaultOptions;

  public observer!: Observer;

  constructor(initOptions: userOptions) {
    this.init(initOptions);
  }

  public update(newOptions: userOptions): void {
    const emitOptions: userOptions = validators.getValidatedOptions(this.sliderOptions, newOptions);
    this.updateOptions(this.sliderOptions, emitOptions);

    if (Object.keys(emitOptions).length > 0) this.emitUpdates(emitOptions);
  }

  public getOptions(): defaultOptions {
    return this.sliderOptions;
  }

  private init(newOpts: userOptions): void {
    this.observer = new Observer();
    this.updateOptions(Model.defaultOptions, validators.getValidatedOptions(this.sliderOptions, newOpts));
  }

  private updateOptions(currentOptions: defaultOptions, validatedOptions: userOptions): void {
    this.sliderOptions = { ...currentOptions, ...validatedOptions };
  }

  private emitUpdates(newOptions: userOptions): void {
    this.observer.emit(newOptions);
  }
}

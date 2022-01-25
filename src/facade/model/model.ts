import type { defaultOptions, userOptions } from './optionsTypes';
import Observer from '../observer/observer';
import validators from './validators';

export default class Model {
  static readonly defaultOptions: defaultOptions = {
    minValue: 10,
    maxValue: 70,
    values: [15, 20],
    // добавить проверку на единичное значение при hasrange: false и на нахождение values в пределах между мин-макс
    isVertical: false,
    hasScale: true,
    hasRange: true,
    hasLabels: true,
    scaleDivisionsNumber: 4,
    step: 5,
  };

  private sliderOptions: defaultOptions = Model.defaultOptions;

  public observer!: Observer;

  constructor(initOptions: userOptions) {
    this.init(initOptions);
    console.log('---------------init-----------------');
  }

  public update(newOptions: userOptions): void {
    const emitOptions: userOptions = validators.getValidatedOptions(this.sliderOptions, newOptions);
    this.updateOptions(this.sliderOptions, emitOptions);

    if (Object.keys(emitOptions).length > 0) this.emitUpdates(emitOptions);
  }

  public getOptions(): defaultOptions {
    return this.sliderOptions;
  }

  private init(newOpts: userOptions) {
    this.observer = new Observer();
    this.updateOptions(Model.defaultOptions, newOpts);
  }

  private updateOptions(currentOptions: defaultOptions, newOptions: userOptions): void {
    this.sliderOptions = { ...currentOptions, ...validators.getValidatedOptions(this.sliderOptions, newOptions) };
  }

  private updateIsVertical(data: boolean): void {
    this.sliderOptions.isVertical = data;
  }

  private updateHasScale(data: boolean): void {
    this.sliderOptions.hasScale = data;
  }

  private updateHasRange(data: boolean): void {
    console.log(this.sliderOptions);
    this.sliderOptions.hasRange = data;
  }

  private emitUpdates(newOptions: userOptions) {
    this.observer.emit(newOptions);
  }
  /*
  static getValidatedOptions(currentOptions: defaultOptions, newOptions: userOptions): userOptions { // возвращает объект
    const { isVertical, hasScale, hasRange } = currentOptions;
    const { isVertical: newIsVertical, hasScale: newHasScale, hasRange: newHasRange } = newOptions;
    const validatedOptions: userOptions = {};

    if ((newHasRange !== undefined) && (newHasRange !== hasRange)) {
      validatedOptions.hasRange = newHasRange; // придумать как корректно обновить rengre и value[0]
    }

    if ((newIsVertical !== undefined) && (newIsVertical !== isVertical)) {
      validatedOptions.isVertical = newIsVertical;
    }
    if ((newHasScale !== undefined) && (newHasScale !== hasScale)) {
      validatedOptions.hasScale = newHasScale;
    }

    Object.assign(validatedOptions, validators.verifyOptions(currentOptions, newOptions));

    return validatedOptions; // возврат либо values, либо типа degaultoptions
  }
  */
}

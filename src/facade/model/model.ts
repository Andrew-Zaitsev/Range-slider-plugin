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

  private sliderOptions!: defaultOptions;

  public observer!: Observer;

  constructor(initOptions: userOptions) {
    this.init(initOptions);
    console.log('---------------init-----------------');
  }

  public update(newOptions: userOptions): void {
    const emitOptions: userOptions = this.updateOptions(this.sliderOptions, newOptions);

    if (Object.keys(emitOptions).length > 0) this.emitUpdates(emitOptions);
    // this.updateVerifiedOptions(validators.verifyOptions(this.sliderOptions, newOptions));// {};

    // if (newValues !== undefined) {
    // console.log('***update model - values***');
    // this.updateValues(newValues);
    // emitOptions.values = newValues;
    // this.emitUpdates({ values: this.sliderOptions.values });
    // }
    // if (newMinValue !== undefined) {
    // this.updateMinValue(newMinValue);
    // emitOptions.minValue = newMinValue;
    // }
    // if (newMaxValue !== undefined) {
    // this.updateMaxValue(newMaxValue);
    // emitOptions.maxValue = newMaxValue;
    // }
    // if (newIsVertical !== undefined) {
    // this.updateIsVertical(newIsVertical);
    // emitOptions.isVertical = newIsVertical;
    // }
    // if (newHasScale !== undefined) {
    // this.updateHasScale(newHasScale);
    // emitOptions.hasScale = newHasScale;
    // }
    // if (newScaleDivisionsNumber !== undefined) {
    // предусмотреть случай повторяющихся номеров делений при (число делений => maxValue - minValue)
    // this.updateScaleDivisionsNumber(newScaleDivisionsNumber);
    // emitOptions.scaleDivisionsNumber = newScaleDivisionsNumber;
    // }
  }

  public getData(): defaultOptions {
    return this.sliderOptions;
  }

  private init(newOpts: userOptions) {
    this.observer = new Observer();
    this.updateOptions(Model.defaultOptions, newOpts);
  }

  private updateOptions(currentOptions: defaultOptions, newOptions: userOptions): userOptions {
    const { isVertical, hasScale } = newOptions;
    const updatedOptions: userOptions = validators.verifyOptions(currentOptions, newOptions);
    this.sliderOptions = { ...currentOptions, ...updatedOptions };

    if (isVertical !== undefined) {
      this.updateIsVertical(isVertical);
      updatedOptions.isVertical = isVertical;
    }
    if (hasScale !== undefined) {
      this.updateHasScale(hasScale);
      updatedOptions.hasScale = hasScale;
    }

    return updatedOptions; // возврат либо values, либо типа degaultoptions
  }

  private updateIsVertical(data: boolean): void {
    this.sliderOptions.isVertical = data;
  }

  private updateHasScale(data: boolean): void {
    this.sliderOptions.hasScale = data;
  }

  private emitUpdates(newOptions: userOptions) {
    this.observer.emit(newOptions);
  }
}

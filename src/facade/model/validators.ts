import { defaultOptions, userOptions } from './optionsTypes';

type Validators = {
    readonly getValidatedOptions: (
        currentOptions: defaultOptions,
        newOptions: userOptions,
      ) => userOptions;
    readonly verifyValues: (
        currentOptions: defaultOptions,
        userValues: number[]|undefined,
      ) => userOptions;
    readonly verifyMinMaxValues: (
        currentOptions: defaultOptions,
        newMinValue: number | undefined,
        newMaxValue: number | undefined, // newOptions: userOptions,
      ) => {minValue: number, maxValue: number};
    readonly verifyScaleDivisionsNumber: (
        validatedMinMaxValues: {minValue: number, maxValue: number},
        newScaleDivisionsNumber: number | undefined,
      ) => userOptions;
    readonly isValidNumber: (value: any) => boolean;
    readonly moveToMinMaxRange: (min: number, max: number, value: number) => number;
}

const validators: Validators = {
  getValidatedOptions(currentOptions: defaultOptions, newOptions: userOptions): userOptions {
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
    } = currentOptions;
    const {
      minValue: newMinValue,
      maxValue: newMaxValue,
      values: newValues,
      isVertical: newIsVertical,
      hasScale: newHasScale,
      hasRange: newHasRange,
      hasLabels: newHasLabel,
      scaleDivisionsNumber: newScaleDivisionsNumber,
      step: newStep,
    } = newOptions;

    // если методу валидации опций переданы только значения, то в возвращаемом объекте только свойство values
    const areOnlyValuesGot: boolean = (Object.keys(newOptions).length === 1)
      && (Object.prototype.hasOwnProperty.call(newOptions, 'values') && (newValues !== undefined));

    if (areOnlyValuesGot && (newValues !== undefined)) { // если не диапазон, то ручка МИН не должна меняться
      const validatedValues: {values?: number[] | undefined} = this.verifyValues(currentOptions, newValues);

      return validatedValues;
    }

    // ___________________________________________________________________
    const validatedOptions: userOptions = {};

    if ((newHasRange !== undefined) && (newHasRange !== hasRange)) {
      validatedOptions.hasRange = newHasRange; // придумать как корректно обновить range и value[0]
    }
    if ((newIsVertical !== undefined) && (newIsVertical !== isVertical)) {
      validatedOptions.isVertical = newIsVertical;
    }
    if ((newHasScale !== undefined) && (newHasScale !== hasScale)) {
      validatedOptions.hasScale = newHasScale;
    }
    // ___________________________________________________________________

    // Object.assign(validatedOptions, this.verifyOptions(currentOptions, newOptions));
    // если методу валидации опций передано что либо другое в объекте
    const validatedMinMaxValues: {minValue: number, maxValue: number} = this.verifyMinMaxValues(
      currentOptions,
      newMinValue,
      newMaxValue,
    );
    Object.assign(validatedOptions, validatedMinMaxValues);

    const validatedValues: userOptions = this.verifyValues(
      { ...currentOptions, ...validatedOptions },
      newValues,
    );
    const validatedScaleDivisionsNumber: userOptions = this.verifyScaleDivisionsNumber(
      validatedMinMaxValues,
      newScaleDivisionsNumber,
    );
    Object.assign(validatedOptions, validatedMinMaxValues, validatedValues, validatedScaleDivisionsNumber);

    return validatedOptions;
  },

  verifyValues(currentOpt, userValues): userOptions {
    const {
      values, minValue, maxValue, hasRange,
    } = currentOpt;
    let from: number|undefined;
    let to: number|undefined;
    let verifiedValues: number[];

    if (userValues !== undefined) [from, to] = userValues;
    if (((from === undefined) && (to === undefined)) || (userValues === undefined)) {
      verifiedValues = [
        this.moveToMinMaxRange(minValue, maxValue, values[0]),
        this.moveToMinMaxRange(minValue, maxValue, values[1]),
      ];
    } else {
      if ((from !== undefined) && (!this.isValidNumber(from))) from = 0;
      if ((to !== undefined) && (!this.isValidNumber(to))) to = 0;
      if (from === undefined) [from] = values;
      if (to === undefined) [, to] = values;
      if (from > to) [from, to] = [to, from];

      from = this.moveToMinMaxRange(minValue, maxValue, from);
      to = this.moveToMinMaxRange(minValue, maxValue, to);

      verifiedValues = [from, to];
    }

    if (!hasRange) verifiedValues[0] = minValue;

    return { values: verifiedValues };
  },

  verifyMinMaxValues(currentOpt, newMin, newMax): {minValue: number, maxValue: number} {
    const { minValue: min, maxValue: max } = currentOpt;
    let newMinValue = newMin;
    let newMaxValue = newMax;

    if ((newMinValue === undefined) && (newMaxValue === undefined)) return { minValue: min, maxValue: max };
    if ((newMinValue !== undefined) && (!this.isValidNumber(newMinValue))) newMinValue = 0;
    if ((newMaxValue !== undefined) && (!this.isValidNumber(newMaxValue))) newMaxValue = 0;
    if (newMinValue === undefined) newMinValue = min;
    if (newMaxValue === undefined) newMaxValue = max;
    if (newMinValue === newMaxValue) newMaxValue += 1;
    if (newMinValue > newMaxValue) return { minValue: newMaxValue, maxValue: newMinValue };

    return { minValue: newMinValue, maxValue: newMaxValue };
  },

  verifyScaleDivisionsNumber(minMaxValues, number): userOptions {
    const { minValue, maxValue } = minMaxValues;
    const maxNumber: number = maxValue - minValue + 1;

    if (number === undefined) return {};
    if (!this.isValidNumber(number)) return { scaleDivisionsNumber: 2 };
    if (number < 2) return { scaleDivisionsNumber: 2 };
    if (number > maxNumber) return { scaleDivisionsNumber: maxNumber };

    return { scaleDivisionsNumber: number };
  },

  isValidNumber(value: any): boolean {
    if (Number.isInteger(value)) return true;
    console.log('unvalid data (isValidNumber), value = ', value);

    return false;
  },

  moveToMinMaxRange(min, max, value): number {
    if (value < min) return min;
    if (value > max) return max;

    return value;
  },
};

export default validators;

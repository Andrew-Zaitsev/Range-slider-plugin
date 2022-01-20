import { defaultOptions, userOptions } from './optionsTypes';

type Validators = {
    readonly verifyOptions: (
        currentOptions: defaultOptions,
        newOptions: userOptions,
      ) => userOptions;
    readonly verifyValues: (
        currentOptions: defaultOptions,
        userValues: number[]|undefined,
      ) => userOptions;
    readonly verifyMinMaxValues: (
        currentOptions: defaultOptions,
        newOptions: userOptions,
      ) => {minValue: number, maxValue: number};
    readonly verifyScaleDivisionsNumber: (
        validatedMinMaxValues: {minValue: number, maxValue: number},
        newScaleDivisionsNumber: number | undefined,
      ) => userOptions;
    readonly isValidNumber: (value: any) => boolean;
    readonly moveToMinMaxRange: (min: number, max: number, value: number) => number;
}

const validators: Validators = {
  verifyOptions(currentOptions: defaultOptions, newOptions: userOptions): userOptions {
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
    const areOnlyValuesGot: boolean = (Object.keys(newOptions).length === 1)
      && (Object.prototype.hasOwnProperty.call(newOptions, 'values') && (newValues !== undefined));

    // если методу валидации опций переданы только значения, то в возвращаемом объекте только свойство values
    if (areOnlyValuesGot && (newValues !== undefined)) {
      return this.verifyValues(currentOptions, newValues);
    }

    // если методу валидации опций передано что либо другое в объекте
    const validatedMinMaxValues: {minValue: number, maxValue: number} = this.verifyMinMaxValues(
      currentOptions,
      newOptions,
    );
    const validatedValues: userOptions = this.verifyValues(
      { ...currentOptions, ...validatedMinMaxValues },
      newValues,
    );
    const validatedScaleDivisionsNumber: userOptions = this.verifyScaleDivisionsNumber(
      validatedMinMaxValues,
      newScaleDivisionsNumber,
    );
    const validatedOptions: userOptions = { ...validatedMinMaxValues, ...validatedValues, ...validatedScaleDivisionsNumber };

    return validatedOptions;
  },

  verifyValues(currentOpt, userValues): userOptions {
    const { values: currentValues, minValue, maxValue } = currentOpt;
    let from: number|undefined;
    let to: number|undefined;

    if (userValues !== undefined) [from, to] = userValues;
    if (((from === undefined) && (to === undefined)) || (userValues === undefined)) {
      return {
        values: [
          this.moveToMinMaxRange(minValue, maxValue, currentValues[0]),
          this.moveToMinMaxRange(minValue, maxValue, currentValues[1]),
        ],
      };
    }

    if ((from !== undefined) && (!this.isValidNumber(from))) from = 0;
    if ((to !== undefined) && (!this.isValidNumber(to))) to = 0;
    if (from === undefined) [from] = currentValues;
    if (to === undefined) [, to] = currentValues;
    if (from > to) [from, to] = [to, from];

    from = this.moveToMinMaxRange(minValue, maxValue, from);
    to = this.moveToMinMaxRange(minValue, maxValue, to);
    return { values: [from, to] };
  },

  verifyMinMaxValues(currentOpt, newOpt): {minValue: number, maxValue: number} {
    const { minValue: min, maxValue: max } = currentOpt;
    let { minValue: newMin, maxValue: newMax } = newOpt;

    if ((newMin === undefined) && (newMax === undefined)) return { minValue: min, maxValue: max };
    if ((newMin !== undefined) && (!this.isValidNumber(newMin))) newMin = 0;
    if ((newMax !== undefined) && (!this.isValidNumber(newMax))) newMax = 0;
    if (newMin === undefined) newMin = min;
    if (newMax === undefined) newMax = max;
    if (newMin === newMax) newMax += 1;
    if (newMin > newMax) return { minValue: newMax, maxValue: newMin };

    return { minValue: newMin, maxValue: newMax };
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

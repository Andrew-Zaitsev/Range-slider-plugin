import './control-panel.scss';
import bind from 'bind-decorator';
import { defaultOptions, userOptions } from '../facade/model/optionsTypes';
import { ObserverCallback } from '../facade/observer/observer';

export default class ControlPanel {
  private minValueInput!: HTMLInputElement;

  private maxValueInput!: HTMLInputElement;

  private valueFromInput!: HTMLInputElement;

  private valueToInput!: HTMLInputElement;

  private directionInput!: HTMLInputElement;

  private showRangeInput: HTMLInputElement = document.createElement('input');

  private showScaleInput: HTMLInputElement = document.createElement('input');

  private showLabelsInput: HTMLInputElement = document.createElement('input');

  private scaleDivisionsNumberInput: HTMLInputElement = document.createElement('input');

  private stepInput: HTMLInputElement = document.createElement('input');

  private $demoSliderElem: JQuery<HTMLElement>;

  constructor(
    private parentElem: HTMLElement,
    private demoSliderElem: HTMLElement,
  ) {
    this.$demoSliderElem = $(this.demoSliderElem);

    this.init();
  }

  @bind
  public updateControlPanel(newOptions: userOptions):void {
    const {
      minValue: newMinValue,
      maxValue: newMaxValue,
      values: newValues,
      isVertical: newIsVertical,
      hasScale: newHasScale,
      hasRange: newHasRange,
      hasLabels: newHasLabels,
      scaleDivisionsNumber: newScaleDivisionsNamber,
      step: newStep,
    } = newOptions;

    // если передан minValue и оно не равно существующему - установить новое
    if ((newMinValue !== undefined)
        && (newMinValue !== +this.minValueInput.value)) {
      this.setMinValue(newMinValue);
    }
    // если передан maxValue и оно не равно существующему - установить новое
    if ((newMaxValue !== undefined)
        && (newMaxValue !== +this.maxValueInput.value)) {
      this.setMaxValue(newMaxValue);
    }
    if ((newValues !== undefined)
      && ((newValues[0] !== +this.valueFromInput.value)
        || ((newValues[1] !== +this.valueToInput.value)))) {
      this.setValues(newValues);
    }
    if ((newIsVertical !== undefined)
      && (newIsVertical !== this.directionInput.checked)) {
      this.setDirection(newIsVertical);
    }
    if ((newHasScale !== undefined)
      && (newHasScale !== this.showScaleInput.checked)) {
      this.setScaleVisibility(newHasScale);
    }
    if (newHasRange !== undefined) {
      if (newHasRange !== this.showRangeInput.checked) {
        this.setRange(newHasRange);
      }
      this.updateValueFromFieldAccessibility(newHasRange);
    }
    if ((newHasLabels !== undefined)
      && (newHasLabels !== this.showLabelsInput.checked)) {
      this.setLabelsVisibility(newHasLabels);
    }
    if ((newScaleDivisionsNamber !== undefined)
      && (newScaleDivisionsNamber !== +this.scaleDivisionsNumberInput.value)) {
      this.setScaleDivisionsNumber(newScaleDivisionsNamber);
    }
    if ((newStep !== undefined)
      && (newStep !== +this.stepInput.value)) {
      this.setStep(newStep);
    }
  }

  private getSliderOptions(): defaultOptions {
    return this.$demoSliderElem.rangeSlider('getOptions');
  }

  private init(): void {
    this.minValueInput = this.createField('min value');
    this.maxValueInput = this.createField('max value');
    this.valueFromInput = this.createField('value From');
    this.valueToInput = this.createField('value To');
    this.directionInput = this.createField('is vertical', 'checkbox');
    this.showRangeInput = this.createField('show range', 'checkbox');
    this.showScaleInput = this.createField('show scale', 'checkbox');
    this.showLabelsInput = this.createField('show labels', 'checkbox');
    this.scaleDivisionsNumberInput = this.createField('scale divisions number');
    this.stepInput = this.createField('step value');

    this.updateControlPanel(this.getSliderOptions());
    this.subscribeToSlider(this.updateControlPanel);
    this.bindEvents();
  }

  private createField(titleElemText: string, inputElemType = 'number'): HTMLInputElement {
    const fieldElem = document.createElement('div');
    fieldElem.classList.add('control-panel__field');

    const titleElem = document.createElement('span');
    titleElem.classList.add('control-panel__title');
    titleElem.textContent = titleElemText;

    const inputElem: HTMLInputElement = document.createElement('input');
    inputElem.classList.add('control-panel__input');
    inputElem.setAttribute('type', inputElemType);
    inputElem.value = (inputElemType === 'number') ? '0' : '';

    fieldElem.append(titleElem, inputElem);
    this.parentElem.append(fieldElem);

    return inputElem;
  }

  private subscribeToSlider(fn: ObserverCallback):void {
    this.$demoSliderElem.rangeSlider('subscribeToSliderUpdates', fn);
  }

  private setValues(values: number[]): void {
    const [valueFrom, valueTo] = values;
    this.valueFromInput.value = String(valueFrom);
    this.valueToInput.value = String(valueTo);
  }

  private setMinValue(value: number): void {
    this.minValueInput.value = (value !== 0) ? String(value) : '0';
  }

  private setMaxValue(value: number): void {
    this.maxValueInput.value = (value !== 0) ? String(value) : '0';
  }

  private setDirection(value: boolean): void {
    this.directionInput.checked = value;
  }

  private setScaleVisibility(value: boolean): void {
    this.showScaleInput.checked = value;
  }

  private setRange(value: boolean): void {
    this.showRangeInput.checked = value;
  }

  private updateValueFromFieldAccessibility(value: boolean): void {
    this.valueFromInput.disabled = !value;
  }

  private setLabelsVisibility(value: boolean): void {
    this.showLabelsInput.checked = value;
  }

  private setScaleDivisionsNumber(value: number): void {
    this.scaleDivisionsNumberInput.value = String(value);
  }

  private setStep(value: number): void {
    this.stepInput.value = String(value);
  }

  private bindEvents(): void {
    this.valueFromInput.addEventListener('change', this.handleValueInputChange);
    this.valueToInput.addEventListener('change', this.handleValueInputChange);
    this.minValueInput.addEventListener('change', this.handleMinValueInputChange);
    this.maxValueInput.addEventListener('change', this.handleMaxValueInputChange);
    this.directionInput.addEventListener('change', this.handleDirectionInputChange);
    this.showScaleInput.addEventListener('change', this.handleShowScaleInputChange);
    this.showRangeInput.addEventListener('change', this.handleShowRangeInputChange);
    this.showLabelsInput.addEventListener('change', this.handleShowLabelsInputChange);
    this.scaleDivisionsNumberInput.addEventListener('change', this.handleScaleDivisionsNumberInputChange);
    this.stepInput.addEventListener('change', this.handleStepInputChange);
  }

  @bind
  private handleValueInputChange(): void {
    const newValues: number[] = [
      +(this.valueFromInput.value),
      +(this.valueToInput.value),
    ];
    this.updateSlider({ values: newValues });
  }

  @bind
  private handleMinValueInputChange(): void {
    const newMinValue: number = +(this.minValueInput.value);

    this.updateSlider({ minValue: newMinValue });
  }

  @bind
  private handleMaxValueInputChange(): void {
    const newMaxValue: number = +(this.maxValueInput.value);

    this.updateSlider({ maxValue: newMaxValue });
  }

  @bind
  private handleDirectionInputChange(): void {
    const newIsVertical: boolean = this.directionInput.checked;

    this.updateSlider({ isVertical: newIsVertical });
  }

  @bind
  private handleShowScaleInputChange(): void {
    const newHasScale: boolean = this.showScaleInput.checked;
    this.updateSlider({ hasScale: newHasScale });
  }

  @bind
  private handleShowRangeInputChange(): void {
    const newHasRange: boolean = this.showRangeInput.checked;

    this.updateSlider({ hasRange: newHasRange });
  }

  @bind
  private handleShowLabelsInputChange(): void {
    const newHasLabels: boolean = this.showLabelsInput.checked;

    this.updateSlider({ hasLabels: newHasLabels });
  }

  @bind
  private handleScaleDivisionsNumberInputChange(): void {
    const newScaleDivisionsNumber: number = +this.scaleDivisionsNumberInput.value;
    this.updateSlider({ scaleDivisionsNumber: newScaleDivisionsNumber });
  }

  @bind
  private handleStepInputChange(): void {
    const newStep: number = +this.stepInput.value;
    this.updateSlider({ step: newStep });
  }

  private updateSlider(newOptions: userOptions): void {
    this.$demoSliderElem.rangeSlider('update', newOptions);
  }
}

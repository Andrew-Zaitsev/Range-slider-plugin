import './control-panel.scss';
import bind from 'bind-decorator';
import Facade from '../facade/facade';
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
    // console.log('---updatePanel---');

    const {
      minValue: newMinValue,
      maxValue: newMaxValue,
      values: newValues,
      isVertical: newIsVertical,
      hasScale: newHasScale,
      hasRange,
      hasLabels,
      scaleDivisionsNumber: newScaleDivisionsNamber,
      step,
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
    // если переданы values и они не равны существующим - установить новые
    if ((newValues !== undefined)
      && ((newValues[0] !== +this.valueFromInput.value)
        || ((newValues[1] !== +this.valueToInput.value)))) {
      this.setValues(newValues);
    }
    // если передан direction и он не равно существующиму - установить новый
    if ((newIsVertical !== undefined)
      && (newIsVertical !== this.directionInput.checked)) {
      this.setDirection(newIsVertical);
    }
    if ((newHasScale !== undefined)
      && (newHasScale !== this.showScaleInput.checked)) {
      this.setScaleVisibility(newHasScale);
    }
    if ((newScaleDivisionsNamber !== undefined)
      && (newScaleDivisionsNamber !== +this.scaleDivisionsNumberInput.value)) {
      this.setScaleDivisionsNumber(newScaleDivisionsNamber);
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
    // реализовать подписку на апдейт модели через апи слайдера
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

  private setScaleDivisionsNumber(value: number): void {
    this.scaleDivisionsNumberInput.value = String(value);
  }

  private bindEvents(): void {
    this.valueFromInput.addEventListener('change', this.handleValueInputChange);
    this.valueToInput.addEventListener('change', this.handleValueInputChange);
    this.minValueInput.addEventListener('change', this.handleMinValueInputChange);
    this.maxValueInput.addEventListener('change', this.handleMaxValueInputChange);
    this.directionInput.addEventListener('change', this.handleDirectionInputChange);
    this.showScaleInput.addEventListener('change', this.handleShowScaleInputChange);
    this.scaleDivisionsNumberInput.addEventListener('change', this.handleScaleDivisionsNumberInputChange);
  }

  @bind
  private handleValueInputChange(): void {
    const newValues: number[] = [
      +(this.valueFromInput.value),
      +(this.valueToInput.value),
    ];
    // получили новые values
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
  private handleScaleDivisionsNumberInputChange(): void {
    const newScaleDivisionsNumber: number = +this.scaleDivisionsNumberInput.value;
    this.updateSlider({ scaleDivisionsNumber: newScaleDivisionsNumber });
  }

  private updateSlider(newOptions: userOptions): void {
    console.log('ControlPanel.updateSlider', newOptions);
    this.$demoSliderElem.rangeSlider('update', newOptions);
  }
}

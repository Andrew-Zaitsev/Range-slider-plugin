import './control-panel.scss';
import bind from 'bind-decorator';
import Facade from '../facade/facade';
import { userOptions } from '../facade/model/optionsTypes';
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

  constructor(
    private parentElem: HTMLElement,
    private facade: Facade,
  ) {
    this.init();
  }

  @bind
  public updateControlPanel(newOptions: userOptions):void {
    const {
      minValue,
      maxValue,
      values: newValues,
      isVertical,
      hasScale,
      hasRange,
      hasLabels,
      scaleDivisionsNumber,
      step,
    } = newOptions;

    // console.log('*updatePanel*');
    if (newValues) this.setValues(newValues);
  }

  private init(): void {
    this.minValueInput = this.createField('min value');
    this.maxValueInput = this.createField('max value');
    this.valueFromInput = this.createField('value From');
    this.valueToInput = this.createField('value To');
    this.directionInput = this.createField('direction');
    this.showRangeInput = this.createField('show range', 'checkbox');
    this.showScaleInput = this.createField('show scale', 'checkbox');
    this.showLabelsInput = this.createField('show labels', 'checkbox');
    this.scaleDivisionsNumberInput = this.createField('scale divisions number');
    this.stepInput = this.createField('step value');

    this.subscribeToSlider(this.updateControlPanel);
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

    fieldElem.append(titleElem, inputElem);
    this.parentElem.append(fieldElem);
    // console.log(this);
    return inputElem;
  }

  private subscribeToSlider(fn: ObserverCallback):void {
    this.facade.subscribeToOptionsUpdate(fn);
  }

  private setValues(values: number[]): void {
    const [valueFrom, valueTo] = values;
    this.valueFromInput.value = String(valueFrom);
    this.valueToInput.value = String(valueTo);
  }
}

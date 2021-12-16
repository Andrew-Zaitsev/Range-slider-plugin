import './control-panel.scss';
import Facade from '../facade/facade';

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
  }

  private createField(titleElemText: string, inputElemType = 'number'): HTMLInputElement {
    const fieldElem = document.createElement('div');
    fieldElem.classList.add('control-panel__field');

    const titleElem = document.createElement('span');
    titleElem.classList.add('control-panel__title');
    titleElem.textContent = titleElemText;

    const inputElem: HTMLInputElement = document.createElement('input');
    inputElem.classList.add('control-panel__input');
    // if (inputElemType === 'checkbox') inputElem.classList.add('control-panel__input_type-checkbox');
    inputElem.setAttribute('type', inputElemType);

    fieldElem.append(titleElem, inputElem);
    this.parentElem.append(fieldElem);
    // console.log(this);
    return inputElem;
  }
}

//     minValue: 10,
//     maxValue: 70,
//     values: [15, 20],
//     // добавить проверку на единичное значение при hasrange: false и на нахождение values в пределах между мин-макс
//     isVertical: false,
//     hasScale: false,
//     hasRange: true,
//     hasLabels: false,
//     scaleDivisionsNumber: 4,
//     step: 5,

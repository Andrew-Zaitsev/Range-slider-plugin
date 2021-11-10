import { defaultOptions } from '../../model/optionsTypes';
import Scale from './scale';

export default class Handle {
  private handleElem: HTMLElement;

  private parent: HTMLElement;

  private scale: Scale;

  constructor(parent: HTMLElement) {
    this.init(parent);
  }

  private init(parent: HTMLElement): void {
    this.parent = parent;

    this.handleElem = document.createElement('div');
    this.handleElem.classList.add('slider__handle');
  }

  public getElem(): HTMLElement {
    return this.handleElem;
  }

  public setHandle(scale): void {
    this.scale = scale;
    this.parent.append(this.handleElem);
  }

  public setPosition(options: defaultOptions, i: number): void {
    const {
      minValue,
      maxValue,
      values,
      hasRange,
      // isVertical,
      // hasScale,
      // hasLabels,
      // step
    } = options;

    // расчет координаты Х ручки
    const scaleRect: DOMRect = this.scale.getScaleElem().getBoundingClientRect();
    const scaleMinXCoord: number = scaleRect.left;
    const scaleWidth: number = this.scale.getScaleElem().getBoundingClientRect().width; // ширина шкалы
    const scaleRange: number = maxValue - minValue; // диапазон значений шкалы
    const minValueHandleValueDiff: number = values[i] - minValue; // значение от минимальной точки шкалы до ползунка
    const handleScaleRate: number = (minValueHandleValueDiff / scaleRange);
    const handleXCoord: number = scaleMinXCoord + scaleWidth * handleScaleRate;

    // расчет свойства left ручки
    const sliderRect: DOMRect = this.parent.getBoundingClientRect();
    const sliderMinXCoord: number = sliderRect.left;
    const sliderWidth: number = sliderRect.width;
    const handleLeftProperty: number = ((handleXCoord - sliderMinXCoord) / sliderWidth) * 100;
    // console.log(`${minValue} ______ ${maxValue} \n`, 'значение: ', values[i], '\n доля в шкале', handleScaleRate);
    // console.log(handleXCoord, 'left: ', handleLeftProperty);

    // установка сползунка в позицию
    this.handleElem.style.left = `${handleLeftProperty}%`;
  }
}

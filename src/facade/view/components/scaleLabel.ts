import { defaultOptions } from '../../model/optionsTypes';

export default class ScaleLabel {
  private parentElem!: HTMLElement;

  private scaleLabelElem!: HTMLElement;

  private scalePinElem!: HTMLElement;

  private scaleTextElem!: HTMLElement;

  constructor(parent: HTMLElement) {
    this.init(parent);
  }

  public getElem(): HTMLElement {
    return this.scaleLabelElem;
  }

  public getTextElem(): HTMLElement {
    return this.scaleTextElem;
  }

  public setPosition(options: defaultOptions, value: number): void {
    const {
      minValue,
      maxValue,
      isVertical,
    } = options;
    const scaleRange: number = maxValue - minValue; // диапазон значений шкалы
    const minValueLabelValueDiff: number = value - minValue; // значение от минимальной точки шкалы до метки
    const thumbScaleRate: number = (minValueLabelValueDiff / scaleRange);

    if (isVertical) {
      this.scaleLabelElem.style.top = `${100 * (1 - thumbScaleRate)}%`;
      this.scaleLabelElem.style.left = 'auto';
    } else {
      this.scaleLabelElem.style.left = `${100 * thumbScaleRate}%`;
      this.scaleLabelElem.style.top = 'auto';
    }
  }

  public setLabelText(text: string) {
    this.getTextElem().textContent = text;
  }

  private init(parent: HTMLElement): void {
    this.parentElem = parent;

    this.scaleLabelElem = document.createElement('div');
    this.scaleLabelElem.classList.add('slider__scale-label');

    this.scalePinElem = document.createElement('div');
    this.scalePinElem.classList.add('slider__scale-pin');

    this.scaleTextElem = document.createElement('div');
    this.scaleTextElem.classList.add('slider__scale-text');

    this.scaleLabelElem.append(this.scaleTextElem, this.scalePinElem);
  }
}

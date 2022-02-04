import { defaultOptions } from '../../model/optionsTypes';
import Scale from './scale';

export default class ScaleLabel {
  private parentElem!: HTMLElement;

  private scale!: Scale;

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

  /*
  public setScaleLabel(scale: Scale): void {
    this.scale = scale;
    this.parentElem.append(this.scaleLabelElem);
  }
  */

  public setPosition(options: defaultOptions, value: number): void {
    const {
      minValue,
      maxValue,
      isVertical,
    } = options;
    const scaleRange: number = maxValue - minValue; // диапазон значений шкалы
    const minValueLabelValueDiff: number = value - minValue; // значение от минимальной точки шкалы до ползунка
    const thumbScaleRate: number = (minValueLabelValueDiff / scaleRange);
    // const scaleCssLength = `(100% - (${this.scaleIndent}px * 2))`;
    if (isVertical) {
      this.scaleLabelElem.style.top = `${100 * (1 - thumbScaleRate)}%`;
      this.scaleLabelElem.style.left = 'auto';
    } else {
      console.log(`${100 * thumbScaleRate}%`);
      this.scaleLabelElem.style.left = `${100 * thumbScaleRate}%`;
      this.scaleLabelElem.style.top = 'auto';
    }

    /*
    const {
      minValue,
      maxValue,
      values,
      hasRange,
    } = options;

    */
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

import { defaultOptions } from '../../model/optionsTypes';

export default class Thumb {
  private thumbElem!: HTMLElement;

  constructor(
    private parent: HTMLElement,
    private scaleIndent: number,
  ) {
    this.init();
  }

  private init(): void {
    this.thumbElem = document.createElement('div');
    this.thumbElem.classList.add('slider__handle');
  }

  public getElem(): HTMLElement {
    return this.thumbElem;
  }

  public setHandle(): void {
    this.parent.append(this.thumbElem);
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

    const scaleRange: number = maxValue - minValue; // диапазон значений шкалы
    const minValueThumbValueDiff: number = values[i] - minValue; // значение от минимальной точки шкалы до ползунка
    const thumbScaleRate: number = (minValueThumbValueDiff / scaleRange);

    this.thumbElem.style.left = `calc((100% - (${this.scaleIndent}px * 2)) * ${thumbScaleRate} + ${this.scaleIndent}px)`;
  }
}
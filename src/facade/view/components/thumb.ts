import { defaultOptions } from '../../model/optionsTypes';

export default class Thumb {
  private thumbElem!: HTMLElement;

  private scaleIndent!: number;

  constructor(private parent: HTMLElement) {
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

  public setScaleIndent(scaleIndent: number): void {
    this.scaleIndent = scaleIndent;
  }

  public setPosition(options: defaultOptions, i: number): void {
    const {
      minValue,
      maxValue,
      values,
      hasRange,
    } = options;

    const scaleRange: number = maxValue - minValue; // диапазон значений шкалы
    const minValueThumbValueDiff: number = values[i] - minValue; // значение от минимальной точки шкалы до ползунка
    const thumbScaleRate: number = (minValueThumbValueDiff / scaleRange);

    this.thumbElem.style.left = `calc((100% - (${this.scaleIndent}px * 2)) * ${thumbScaleRate} + ${this.scaleIndent}px)`;
  }
}

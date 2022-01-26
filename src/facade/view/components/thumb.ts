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

  public setThumb(): void {
    this.parent.append(this.thumbElem);
  }

  public removeThumb(): void {
    this.getElem().remove();
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

    const scaleCssLength = `(100% - (${this.scaleIndent}px * 2))`;

    if (options.isVertical) {
      this.thumbElem.style.top = `calc(${scaleCssLength} * ${1 - thumbScaleRate} + ${this.scaleIndent}px)`;
      this.thumbElem.style.left = 'auto';
    } else {
      this.thumbElem.style.left = `calc(${scaleCssLength} * ${thumbScaleRate} + ${this.scaleIndent}px)`;
      this.thumbElem.style.top = 'auto';
    }
  }
}

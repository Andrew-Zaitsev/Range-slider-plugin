import { defaultOptions } from '../../model/optionsTypes';

export default class Handle {
  private handleElem!: HTMLElement;

  constructor(
    private parent: HTMLElement,
    private scaleIndent: number,
  ) {
    this.init();
  }

  private init(): void {
    this.handleElem = document.createElement('div');
    this.handleElem.classList.add('slider__handle');
  }

  public getElem(): HTMLElement {
    return this.handleElem;
  }

  public setHandle(): void {
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

    const scaleRange: number = maxValue - minValue; // диапазон значений шкалы
    const minValueHandleValueDiff: number = values[i] - minValue; // значение от минимальной точки шкалы до ползунка
    const handleScaleRate: number = (minValueHandleValueDiff / scaleRange);

    this.handleElem.style.left = `calc((100% - (${this.scaleIndent}px * 2)) * ${handleScaleRate} + ${this.scaleIndent}px)`;
  }
}

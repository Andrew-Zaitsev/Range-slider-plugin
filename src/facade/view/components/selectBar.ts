import { defaultOptions } from '../../model/optionsTypes';

export default class selectBar {
  private selectBarElem!: HTMLElement;

  private scaleIndent!: number;

  constructor(private parent: HTMLElement) {
    this.init();
  }

  public set():void {
    this.parent.append(this.selectBarElem);
  }

  public setScaleIndent(scaleIndent: number): void {
    this.scaleIndent = scaleIndent;
  }

  public setPosition(options: defaultOptions):void {
    const { minValue, maxValue, values } = options;

    const scaleRange: number = maxValue - minValue; // диапазон значений шкалы
    const minValueMinHandleValueRange: number = values[0] - minValue; // значение от минимальной точки шкалы до ползунка
    const selectBarRange = values[1] - values[0];
    const minHandleScaleRate: number = (minValueMinHandleValueRange / scaleRange);
    const barScaleRate = selectBarRange / scaleRange;

    const scaleCssLength = `(100% - (${this.scaleIndent}px * 2))`;

    if (options.isVertical) {
      this.selectBarElem.style
        .top = `calc(${scaleCssLength} * ${1 - minHandleScaleRate} + ${this.scaleIndent}px
          - (${scaleCssLength}) * ${barScaleRate} )`;
      this.selectBarElem.style
        .height = `calc(${scaleCssLength} * ${barScaleRate})`;
      this.selectBarElem.style.left = '';
      this.selectBarElem.style.width = '';
    } else {
      this.selectBarElem.style
        .left = `calc(${scaleCssLength} * ${minHandleScaleRate} + ${this.scaleIndent}px)`;
      this.selectBarElem.style
        .width = `calc(${scaleCssLength} * ${barScaleRate})`;
      this.selectBarElem.style.top = '';
      this.selectBarElem.style.height = '';
    }
  }

  private init(): void {
    this.selectBarElem = document.createElement('div');
    this.selectBarElem.classList.add('slider__select-bar');
  }
}

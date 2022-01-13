import { defaultOptions } from '../../model/optionsTypes';

export default class selectBar {
  private selectBarElem!: HTMLElement;

  private scaleIndent!: number;

  constructor(
    private parent: HTMLElement,
    private options: defaultOptions,
  ) {
    this.init();
  }

  private init(): void {
    this.selectBarElem = document.createElement('div');
    this.selectBarElem.classList.add('slider__select-bar');
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

    if (options.isVertical) {
      console.log('* selectBar.setPosition: вертикальный селект-бар не рассчитывается *');
    } else {
      this.selectBarElem.style
        .left = `calc((100% - (${this.scaleIndent}px * 2)) * ${minHandleScaleRate} + ${this.scaleIndent}px)`;
      this.selectBarElem.style
        .width = `calc((100% - (${this.scaleIndent}px * 2)) * ${barScaleRate})`;
    }
  }
}

import bind from 'bind-decorator';
import { defaultOptions, userOptions } from '../model/optionsTypes';
import Main from './components/main';
import Scale from './components/scale';
import Thumb from './components/thumb';
import SelectBar from './components/selectBar';
import Observer from '../observer/observer';

export default class View {
  private main!: Main;

  private scale!: Scale;

  // private scaleIndent!: number;

  private thumbs: Thumb[] = [];

  private selectBar!: SelectBar;

  private sliderElem!: HTMLElement;

  private targetThumbIndex?: number;

  public observer!: Observer;

  constructor(
    private parent: HTMLElement,
    private options: defaultOptions,
  ) {
    this.init(parent, options);
  }

  public update(newOptions: userOptions): void {
    console.log('*update view*');
    // реализовать метод view.update
    // если передано только values, то только поменять положение ползунков. в противном случае перерисовать весь слайдер
    const {
      minValue,
      maxValue,
      values,
      isVertical,
      hasScale,
      hasRange,
      hasLabels,
      scaleDivisionsNumber,
      step,
    } = newOptions;

    this.updateOptions(newOptions);

    const isOnlyValuesGot: boolean = (Object.keys(newOptions).length === 1)
      && (Object.prototype.hasOwnProperty.call(newOptions, 'values'));

    if (isOnlyValuesGot) {
      if (values !== undefined) {
        this.updateThumbsPosition(this.options);
        this.updateSelectBarPosition();
      }
    } else {
      // обновить весь слайдер -   значение ярлыков ползунков, положение селектбара
      console.log('отрисовать слайдер полностью');
      this.updateScale();
      this.setOrientation();
      this.setScaleIndent();
      this.updateThumbsPosition(this.options);
      this.updateSelectBarPosition();
    }
  }

  public updateOptions(newOptions: userOptions): void {
    this.options = {
      ...this.options,
      ...newOptions,
    };
  }

  private init(parent: HTMLElement, options: defaultOptions) {
    this.parent = parent;
    this.options = options;
    this.observer = new Observer();
    // console.log(options);
    this.main = new Main();
    this.sliderElem = this.main.getElem();
    this.parent.append(this.main.getElem());

    this.setScale(this.sliderElem, this.options);
    this.setThumbs(options);
    this.setSelectBar();
    this.setOrientation();
    this.setScaleIndent();

    // this.scaleIndent = this.calculateScaleIndent();

    this.updateThumbsPosition(options);
    this.updateSelectBarPosition();

    // подумать над валидацией переданных значений

    this.bindListeners();
  }

  private setScale(slider: HTMLElement, options: defaultOptions): void { // значения в параметрах уже доступны через this, поредавать не нужно наверное?
    this.scale = new Scale(slider, options);
    this.scale.set();
  }

  private updateScale() {
    this.scale.getScaleElem().remove();
    this.setScale(this.sliderElem, this.options);
  }

  private calculateScaleIndent(): number {
    let scaleIndent: number;
    const scaleRect: DOMRect = this.scale.getScaleElem().getBoundingClientRect();
    const sliderRect: DOMRect = this.sliderElem.getBoundingClientRect();

    if (this.options.isVertical) {
      const scaleMinYCoord: number = scaleRect.top;
      const sliderMinYCoord: number = sliderRect.top;
      scaleIndent = scaleMinYCoord - sliderMinYCoord;
    } else {
      const scaleMinXCoord: number = scaleRect.left;
      const sliderMinXCoord: number = sliderRect.left;
      scaleIndent = scaleMinXCoord - sliderMinXCoord;
    }

    return scaleIndent;
  }

  private setThumbs(options: defaultOptions) {
    if (options.hasRange) {
      options.values.forEach((value: number, i: number) => {
        this.thumbs.push(new Thumb(this.sliderElem));
      });
      this.thumbs[0].getElem().classList.add('slider__handle_min');
      this.thumbs[1].getElem().classList.add('slider__handle_max');
    } else {
      this.thumbs.push(new Thumb(this.sliderElem));
    }

    this.thumbs.forEach((thumb: Thumb) => {
      thumb.setHandle(); // изменить название метода на setThumb
    });
  }

  private setOrientation() {
    // console.log('view.setOrientation \n', this.options.isVertical, this.main.getElem());
    if (this.options.isVertical) {
      this.main.getElem().classList.add('slider_vertical');
      // console.log(this.main.getElem().classList);
    } else {
      this.main.getElem().classList.remove('slider_vertical');
    }
  }

  private updateThumbsPosition(options: defaultOptions): void {
    this.thumbs.forEach((thumb: Thumb, i: number) => {
      thumb.setPosition(options, i);
    });
  }

  private setSelectBar(): void {
    this.selectBar = new SelectBar(this.sliderElem, this.options);
    this.selectBar.set();
  }

  private setScaleIndent(): void {
    const scaleIndent: number = this.calculateScaleIndent();

    this.thumbs.forEach((thumb: Thumb) => thumb.setScaleIndent(scaleIndent));
    this.selectBar.setScaleIndent(scaleIndent);
  }

  private updateSelectBarPosition(): void {
    this.selectBar.setPosition(this.options);
  }

  private bindListeners() {
    this.thumbs.forEach((thumb: Thumb) => {
      thumb.getElem().addEventListener('pointerdown', this.handlePointerDown);
    });
  }

  @bind // this = View
  private handlePointerDown(e: PointerEvent): void {
    e.preventDefault();
    const target: HTMLElement = e.target as HTMLElement;
    target.setPointerCapture(e.pointerId);
    this.targetThumbIndex = (target.classList.contains('slider__handle_max')) ? 1 : 0;

    (e.target as HTMLElement).addEventListener('pointerup', this.handlePointerUp);// .bind(this));
    (e.target as HTMLElement).addEventListener('pointermove', this.handlePointerMove);
    console.log('down');
  }

  @bind // this = View
  private handlePointerUp(e: PointerEvent): void {
    (e.target as HTMLElement).removeEventListener('pointerup', this.handlePointerUp);
    (e.target as HTMLElement).removeEventListener('pointermove', this.handlePointerMove);
    this.targetThumbIndex = undefined;
    console.log('up');
  }

  @bind // this = View
  private handlePointerMove(e: PointerEvent): void {
    console.log('start - move');
    const value: number = this.calculateValue(e);
    let values: [number, number];
    if (this.targetThumbIndex === 0) {
      values = [value, this.options.values[1]];
    } else {
      values = [this.options.values[0], value];
    }
    this.observer.emit({ values });
  }

  private calculateValue(event: PointerEvent): number {
    let value: number;
    const { minValue, maxValue } = this.options;
    const scaleDomRect = this.scale.getScaleElem().getBoundingClientRect();
    const scaleValuesRange = maxValue - minValue;

    if (this.options.isVertical) {
      const scaleCoordsRange = scaleDomRect.height;
      const pointerMinScaleCoordsRange = scaleDomRect.bottom - event.clientY;
      value = Math.round(scaleValuesRange * (pointerMinScaleCoordsRange / scaleCoordsRange) + minValue);
    } else {
      const scaleCoordsRange = scaleDomRect.width;
      const pointerMinScaleCoordsRange = event.clientX - scaleDomRect.left;
      value = Math.round(scaleValuesRange * (pointerMinScaleCoordsRange / scaleCoordsRange) + minValue);
    }

    return value;
  }
}

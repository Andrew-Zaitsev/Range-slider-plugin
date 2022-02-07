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

  private targetThumbIndex = 2;

  public observer!: Observer;

  constructor(
    private parent: HTMLElement,
    private options: defaultOptions,
  ) {
    this.init(parent, options);
  }

  public update(newOptions: userOptions): void {
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
        this.updateThumbsPosition();
        this.updateThumbsLabels();
        this.updateSelectBarPosition();
      }
    } else {
      // обновить весь слайдер -   значение ярлыков ползунков, положение селектбара
      console.log('обновить весь слайдер');

      this.updateScale();
      this.setOrientation();
      this.setScaleIndent();
      this.setRange();
      this.updateThumbsPosition();
      this.updateThumbsLabels();
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
    this.main = new Main();
    this.sliderElem = this.main.getElem();
    this.parent.append(this.main.getElem());

    this.setScale(this.sliderElem, this.options);
    this.setThumbs();
    this.setSelectBar();
    this.setOrientation();
    this.setScaleIndent();

    this.updateThumbsPosition();
    this.updateThumbsLabels();
    this.updateSelectBarPosition();

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

  private setThumbs(): void {
    const { values, hasLabels, hasRange } = this.options;
    values.forEach((value: number, i: number) => {
      this.thumbs.push(new Thumb(this.sliderElem));
    });

    this.thumbs[0].getElem().classList.add('slider__handle_min');
    this.thumbs[1].getElem().classList.add('slider__handle_max');

    this.thumbs[1].setThumb();
    if (hasRange) this.thumbs[0].setThumb();
  }

  private setRange(): void {
    const { hasRange } = this.options;

    if (hasRange) {
      this.thumbs[0].setThumb();
    } else {
      this.thumbs[0].removeThumb();
    }
  }

  private setOrientation() {
    if (this.options.isVertical) {
      this.main.getElem().classList.add('slider_vertical');
    } else {
      this.main.getElem().classList.remove('slider_vertical');
    }
  }

  private updateThumbsPosition(): void {
    this.thumbs.forEach((thumb: Thumb, i: number) => {
      thumb.setPosition(this.options, i);
    });
  }

  private updateThumbsLabels(): void {
    this.thumbs.forEach((thumb, i) => thumb.updateLabel(this.options, i));
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
    const target: HTMLElement = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
    this.targetThumbIndex = (target.classList.contains('slider__handle_max')) ? 1 : 0;

    // (e.target as HTMLElement).addEventListener('pointerup', this.handlePointerUp);// .bind(this));
    // (e.target as HTMLElement).addEventListener('pointermove', this.handlePointerMove);
    (target as HTMLElement).addEventListener('pointerup', this.handlePointerUp);// .bind(this));
    (target as HTMLElement).addEventListener('pointermove', this.handlePointerMove);
    console.log('down', target);
  }

  @bind // this = View
  private handlePointerUp(e: PointerEvent): void {
    (e.target as HTMLElement).removeEventListener('pointerup', this.handlePointerUp);
    (e.target as HTMLElement).removeEventListener('pointermove', this.handlePointerMove);
    this.targetThumbIndex = 2;// undefined;
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
    const {
      minValue,
      maxValue,
      values,
      isVertical,
      step,
    } = this.options;
    const currentValue: number = values[this.targetThumbIndex];
    const scaleDomRect = this.scale.getScaleElem().getBoundingClientRect();
    const scaleValuesRange = maxValue - minValue;
    let scaleCoordsRange: number;
    let pointerMinScaleCoordsRange: number;

    if (isVertical) {
      scaleCoordsRange = scaleDomRect.height;
      pointerMinScaleCoordsRange = scaleDomRect.bottom - event.clientY;
    } else {
      scaleCoordsRange = scaleDomRect.width;
      pointerMinScaleCoordsRange = event.clientX - scaleDomRect.left;
    }

    const pointerValue = (scaleValuesRange * (pointerMinScaleCoordsRange / scaleCoordsRange) + minValue);
    const delta = Math.round((pointerValue - currentValue) / step) * step;
    const calculatedValue = currentValue + delta;

    return calculatedValue;
  }
}

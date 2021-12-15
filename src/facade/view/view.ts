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

  private scaleIndent!: number;

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

  public update(updatedOptions: userOptions): void {
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
    } = updatedOptions;

    if (values !== undefined) {
      this.updateThumbsPosition(this.options);
      this.updateSelectBarPosition();
    }
    // console.log(`***view.update**${updatedOptions.values}`);
    console.log('***view.update**', this.options.values);
    // реализовать метод view.update
  }

  private init(parent: HTMLElement, options: defaultOptions) {
    this.parent = parent;
    this.options = options;
    this.observer = new Observer();
    this.main = new Main();
    this.sliderElem = this.main.getElem();
    this.parent.append(this.main.getElem());

    this.setScale(this.sliderElem, this.options);

    this.scaleIndent = this.calculateScaleIndent();

    this.setThumbs(options);
    this.updateThumbsPosition(options);
    this.setSelectBar();
    this.updateSelectBarPosition();

    // подумать над валидацией переданных значений

    this.bindListeners();
  }

  private setScale(slider: HTMLElement, options: defaultOptions): void {
    this.scale = new Scale(slider, options);
    this.scale.set();
  }

  private calculateScaleIndent(): number {
    const scaleRect: DOMRect = this.scale.getScaleElem().getBoundingClientRect();
    const scaleMinXCoord: number = scaleRect.left;
    const sliderRect: DOMRect = this.sliderElem.getBoundingClientRect();
    const sliderMinXCoord: number = sliderRect.left;
    const scaleIndent: number = scaleMinXCoord - sliderMinXCoord;

    return scaleIndent;
  }

  private setThumbs(options: defaultOptions) {
    if (options.hasRange) {
      options.values.forEach((value: number, i: number) => {
        this.thumbs.push(new Thumb(this.sliderElem, this.scaleIndent));
      });
      this.thumbs[0].getElem().classList.add('slider__handle_min');
      this.thumbs[1].getElem().classList.add('slider__handle_max');
    } else {
      this.thumbs.push(new Thumb(this.sliderElem, this.scaleIndent));
    }

    this.thumbs.forEach((thumb: Thumb) => {
      thumb.setHandle();
    });
  }

  private updateThumbsPosition(options: defaultOptions): void {
    this.thumbs.forEach((thumb: Thumb, i: number) => {
      thumb.setPosition(options, i);
    });
  }

  private setSelectBar(): void {
    this.selectBar = new SelectBar(this.sliderElem, this.options, this.scaleIndent);
    this.selectBar.set();
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
    console.log('move');
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
    const { minValue, maxValue } = this.options;
    const scaleDomRect = this.scale.getScaleElem().getBoundingClientRect();
    const scaleValuesRange = maxValue - minValue;
    const scaleCoordsRange = scaleDomRect.width;
    const pointerMinScaleCoordsRange = event.clientX - scaleDomRect.left;
    const value: number = Math.round(scaleValuesRange * (pointerMinScaleCoordsRange / scaleCoordsRange) + minValue);

    return value;
  }
}

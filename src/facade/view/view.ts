import { defaultOptions, userOptions } from '../model/optionsTypes';
import Main from './components/main';
import Scale from './components/scale';
import Handle from './components/handle';
import SelectBar from './components/selectBar';
import Observer from '../observer/observer';

export default class View {
  private parent: HTMLElement;

  private options: defaultOptions;

  private main: Main;

  private scale: Scale;

  private scaleIndent: number;

  private handles: Handle[] = [];

  private selectBar: SelectBar;

  private sliderElem: HTMLElement;

  public observer: Observer;

  constructor(parent, options: userOptions) {
    this.init(parent, options);
  }

  private init(parent, options) {
    this.parent = parent;
    this.options = options;
    this.observer = new Observer();
    this.main = new Main();
    this.sliderElem = this.main.getElem();
    this.parent.append(this.main.getElem());

    this.setScale(this.sliderElem, this.options);

    // console.log(getComputedStyle(this.scale.getScaleElem()).left); /// получили левый отступ от родителя!
    // console.log(this.calculateScaleIndent());
    this.scaleIndent = this.calculateScaleIndent();

    this.setHandles(options);
    this.updateHandlesPosition(options);
    this.setSelectBar();
    this.updateSelectBarPosition();

    // this.selectBar = new SelectBar(this.sliderElem, options);
    // this.selectBar.set();
    // подумать над валидацией переданных значений
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

  private setHandles(options: defaultOptions) {
    if (options.hasRange) {
      options.values.forEach((value: number, i: number) => {
        this.handles.push(new Handle(this.sliderElem, this.scaleIndent));
      });
      this.handles[0].getElem().classList.add('slider__handle_min');
      this.handles[1].getElem().classList.add('slider__handle_max');
    } else {
      this.handles.push(new Handle(this.sliderElem, this.scaleIndent));
    }

    this.handles.forEach((handle: Handle, i: number) => {
      handle.setHandle();
    });
  }

  private updateHandlesPosition(options): void {
    this.handles.forEach((handle: Handle, i: number) => {
      handle.setPosition(options, i);
    });
  }

  private setSelectBar() {
    this.selectBar = new SelectBar(this.sliderElem, this.options, this.scaleIndent);
    this.selectBar.set();
  }

  private updateSelectBarPosition() {
    this.selectBar.setPosition(this.handles, this.options);
  }
  // console.log(this.sliderData);
}

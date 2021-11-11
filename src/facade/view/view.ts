import { defaultOptions, userOptions } from '../model/optionsTypes';
import Main from './components/main';
import Scale from './components/scale';
import Handle from './components/handle';
import SelectBar from './components/selectBar';

export default class View {
  private parent: HTMLElement;

  private options: defaultOptions;

  private main: Main;

  private scale: Scale;

  private handles: Handle[] = [];

  private selectBar: SelectBar;

  private sliderElem: HTMLElement;

  constructor(parent, options: userOptions) {
    this.init(parent, options);
  }

  private init(parent, options) {
    this.parent = parent;
    this.options = options;
    this.main = new Main();
    this.sliderElem = this.main.getElem();
    this.parent.append(this.main.getElem());

    this.setScale(this.sliderElem);
    this.setHandles(options);
    this.updateHandlesPosition(options);
    this.setSelectBar();
    this.updateSelectBarPosition();

    // this.selectBar = new SelectBar(this.sliderElem, options);
    // this.selectBar.set();
    // подумать над валидацией переданных значений
  }

  private setHandles(options: defaultOptions) {
    if (options.hasRange) {
      options.values.forEach((value: number, i: number) => {
        this.handles.push(new Handle(this.sliderElem));
      });
      this.handles[0].getElem().classList.add('slider__handle_min');
      this.handles[1].getElem().classList.add('slider__handle_max');
    } else {
      this.handles.push(new Handle(this.sliderElem));
    }

    this.handles.forEach((handle: Handle, i: number) => {
      handle.setHandle(this.scale);
    });
  }

  private updateHandlesPosition(options): void {
    this.handles.forEach((handle: Handle, i: number) => {
      handle.setPosition(options, i);
    });
  }

  private setScale(slider: HTMLElement): void {
    this.scale = new Scale(slider);
    this.scale.set();
  }

  private setSelectBar() {
    this.selectBar = new SelectBar(this.sliderElem, this.options);
    this.selectBar.set();
  }

  private updateSelectBarPosition() {
    this.selectBar.setPosition(this.handles, this.options);
  }
  // console.log(this.sliderData);
}

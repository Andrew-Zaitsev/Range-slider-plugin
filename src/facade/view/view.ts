import { defaultOptions, userOptions } from '../model/optionsTypes';
import Main from './components/main';
import Scale from './components/scale';
import Handle from './components/handle';
import SelectBar from './components/selectBar';

export default class View {
  private parent: HTMLElement;

  private options: userOptions;

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
    this.scale = new Scale(this.sliderElem);
    this.scale.set();
    this.createHandles(options);
    this.handles.forEach((handle: Handle, i: number) => {
      handle.setHandle(this.scale);
      handle.setPosition(options, i);
    });

    this.selectBar = new SelectBar(this.sliderElem, options);
    // подумать над валидацией переданных значений

    this.selectBar.set();
  }

  private createHandles(options: defaultOptions) {
    if (options.hasRange) {
      options.values.forEach((value: number, i: number) => {
        this.handles.push(new Handle(this.sliderElem));
      });
      this.handles[0].getElem().classList.add('slider__handle_min');
      this.handles[1].getElem().classList.add('slider__handle_max');
    } else {
      this.handles.push(new Handle(this.sliderElem));
    }
  }
  // console.log(this.sliderData);
}

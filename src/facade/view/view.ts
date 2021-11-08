import { userOptions } from '../model/optionsTypes';
import Main from './components/main';
import Scale from './components/scale';
import Handle from './components/handle';
// import Presenter from '../presenter/presenter';

export default class View {
  // private presenter: Presenter;
  private parent: HTMLElement;

  private options: userOptions;

  private main: Main;

  private scale: Scale;

  private handles: Handle;

  private sliderElem: HTMLElement;

  constructor(parent, options: userOptions) {
    this.init(parent, options);
    // this.render();
  }

  private init(parent, options) {
    this.parent = parent;
    this.options = options;
    this.main = new Main();
    this.sliderElem = this.main.getElem();
    this.scale = new Scale(this.sliderElem);
    this.handles = new Handle(this.sliderElem, options.values);
    // подумать над валидацией переданных значений

    this.scale.set();
    this.handles.set();

    this.parent.append(this.main.getElem());
  }

  // private render() {
  // }

  // console.log(this.sliderData);
}

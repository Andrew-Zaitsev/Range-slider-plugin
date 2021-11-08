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

  private handles: Handle[];

  constructor(parent, options: userOptions) {
    this.init(parent, options);
    // this.render();
  }

  private init(parent, options) {
    this.parent = parent;
    this.options = options;
    this.main = new Main();
    this.scale = new Scale(this.main.getElem());
    if (this.options.hasRange) {
      // подумать над валидацией переданных значений
    } else {

    }
    // this.handles[0] = new Handle();
    this.scale.set();
    // this.labelMin
    // console.log(this.main.getElem());
    this.parent.append(this.main.getElem());
  }

  // private render() {
  // }

  // console.log(this.sliderData);
  // public registerWith(presenter: Presenter):void {
  //   this.presenter = presenter;
  //   console.log('presenter: \n', presenter);
  // }
}

import './presenter/presenter';
import './model/model';
import './view/view';
import { userOptions } from './model/optionsTypes';

export default class Facade {
  // public parentElem: <E extends keyof HTMLElement>;

  constructor(parentElem, options: userOptions) {
    this.init(parentElem, options);
  }

  private init(parent: HTMLElement, userData: userOptions): void {
    // console.log(parent);
    // const model: Model = new Model(options);
    // const view: View = new View();
    // const presenter: Presenter = new Presenter(model, view);
  }
}

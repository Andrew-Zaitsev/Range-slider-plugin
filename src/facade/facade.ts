// import './model/model';
// import './view/view';
import { userOptions } from './model/optionsTypes';
import Model from './model/model';
import View from './view/view';
import Presenter from './presenter/presenter';

export default class Facade {
  // public parentElem: <E extends keyof HTMLElement>;
  private model: Model;

  private view: View;

  private presenter: Presenter;

  constructor(parentElem, options: userOptions) {
    this.init(parentElem, options);
  }

  private init(parent: HTMLElement, userData: userOptions): void {
    // console.log(parent);
    this.model = new Model(userData);
    this.view = new View();
    this.presenter = new Presenter(this.model, this.view);
    // console.log(this.model);
    // console.log(this.view);
    // console.log(this.presenter);
    // const view: View = new View();
    // const presenter: Presenter = new Presenter(model, view);
  }
}

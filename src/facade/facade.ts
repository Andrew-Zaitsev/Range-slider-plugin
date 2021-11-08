import { userOptions } from './model/optionsTypes';
import Model from './model/model';
import Presenter from './presenter/presenter';

export default class Facade {
  private model: Model;

  private presenter: Presenter;

  constructor(parentElem, options: userOptions) {
    this.init(parentElem, options);
  }

  private init(parent: HTMLElement, userData: userOptions): void {
    this.model = new Model(userData);
    this.presenter = new Presenter(parent, this.model);
  }
}
// console.log(parent);

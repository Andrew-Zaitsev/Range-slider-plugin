import { userOptions } from './model/optionsTypes';
import Model from './model/model';
import Presenter from './presenter/presenter';
import type { ObserverCallback } from './observer/observer';

export default class Facade {
  private model!: Model;

  private presenter!: Presenter;

  constructor(parentElem: HTMLElement, options: userOptions) {
    this.init(parentElem, options);
  }

  public subscribeToModel(fn: ObserverCallback): void {
    this.presenter.subscribeToModel(fn);
  }

  private init(parent: HTMLElement, userData: userOptions): void {
    this.model = new Model(userData);
    this.presenter = new Presenter(parent, this.model);
  }
}
// console.log(parent);

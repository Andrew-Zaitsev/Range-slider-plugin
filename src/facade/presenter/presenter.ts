import bind from 'bind-decorator';
import Model from '../model/model';
import { userOptions } from '../model/optionsTypes';
import View from '../view/view';

export default class Presenter {
  // private parent: HTMLElement;

  private model!: Model;

  private view!: View;

  constructor(parent: HTMLElement, sliderModel: Model) {
    this.init(parent, sliderModel);
  }

  private init(parent: HTMLElement, model: Model) {
    this.model = model;
    this.view = new View(parent, model.getData());

    this.subscribeToView(this.updateModel);
    this.subscribeToModel(this.updateView);
  }

  private subscribeToView(fn: (options: userOptions) => void) {
    this.view.observer.subscribe(fn);
  }

  private subscribeToModel(fn: (options: userOptions) => void) {
    this.model.observer.subscribe(fn);
  }

  @bind
  private updateModel(data: userOptions) {
    this.model.update(data);
  }

  @bind
  private updateView(data: userOptions) {
    this.view.update(data);
  }
}

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

    this.subscribeModelToView();
  }

  private subscribeModelToView() {
    // console.log(this.updateModel);
    this.view.observer.subscribe(this.updateModel);
  }

  @bind
  private updateModel(data: userOptions) {
    // console.log('updateModel', this);
    this.model.update(data);
  }
}

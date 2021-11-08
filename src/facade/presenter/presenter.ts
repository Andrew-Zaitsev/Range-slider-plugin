import Model from '../model/model';
import View from '../view/view';

export default class Presenter {
  // private parent: HTMLElement;

  private model: Model;

  private view: View;

  constructor(parent: HTMLElement, sliderModel: Model) {
    this.init(parent, sliderModel);
  }

  private init(parent, model: Model) {
    this.model = model;
    this.view = new View(parent, model.getData());
  }
}

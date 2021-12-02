import Model from '../model/model';
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
    this.view.observer.subscribe(() => console.log('pointermove model callback'));
  }
}

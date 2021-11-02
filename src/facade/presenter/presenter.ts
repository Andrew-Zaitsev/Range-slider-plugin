import Model from '../model/model';
import View from '../view/view';

export default class Presenter {
  private model: Model;

  private view: View;

  constructor(sliderModel: Model) { // , sliderView: View) {
    this.init(sliderModel); // , sliderView);
  }

  private init(model: Model) { // , view: View) {
    this.model = model;
    this.view = new View(model.getData());
    // this.view = view;
    // this.view.registerWith(this);
  }
}

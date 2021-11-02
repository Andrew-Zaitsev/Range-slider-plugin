import Model from '../model/model';
import View from '../view/view';

export default class Presenter {
  private model: Model;

  private view: View;

  constructor(sliderModel: Model, sliderView: View) {
    this.model = sliderModel;
    this.view = sliderView;
  }
}

import { userOptions } from '../model/optionsTypes';
import Presenter from '../presenter/presenter';

export default class View {
  // private presenter: Presenter;

  constructor(private sliderData: userOptions) {
    this.init();
  }

  private init() {

    // console.log(this.sliderData);
  }

  // public registerWith(presenter: Presenter):void {
  //   this.presenter = presenter;
  //   console.log('presenter: \n', presenter);
  // }
}

export default class Main {
  private sliderElem: HTMLElement;

  constructor() {
    this.init();
  }

  private init() {
    this.sliderElem = document.createElement('div');
    this.sliderElem.classList.add('slider');
  }

  public getElem() {
    return this.sliderElem;
  }
}

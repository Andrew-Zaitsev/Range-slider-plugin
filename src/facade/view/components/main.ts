export default class Main {
  private sliderElem!: HTMLElement;

  constructor() {
    this.init();
  }

  public getElem(): HTMLElement {
    return this.sliderElem;
  }

  public makeUnselectable(): void {
    this.sliderElem.classList.add('slider_unselectable');
  }

  public makeSelectable(): void {
    this.sliderElem.classList.remove('slider_unselectable');
  }

  private init(): void {
    this.sliderElem = document.createElement('div');
    this.sliderElem.classList.add('slider');
  }
}

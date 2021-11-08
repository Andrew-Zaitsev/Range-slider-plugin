export default class Handle {
  private handleElem: HTMLElement;

  constructor() {
    this.init();
  }

  private init() {
    this.handleElem = document.createElement('div');
    this.handleElem.classList.add('slider');
  }

  public getElem() {
    return this.handleElem;
  }
}

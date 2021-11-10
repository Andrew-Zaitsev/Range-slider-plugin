import { defaultOptions } from '../../model/optionsTypes';

export default class selectBar {
  private selectBarElem: HTMLElement;

  private parent: HTMLElement;

  constructor(parent: HTMLElement, options: defaultOptions) {
    this.init(parent, options);
  }

  private init(parent: HTMLElement, options: defaultOptions): void {
    this.parent = parent;

    this.selectBarElem = document.createElement('div');
    this.selectBarElem.classList.add('slider__select-bar');
    // console.log(handleElem);
  }

  public set() {
    this.parent.append(this.selectBarElem);
  }
}

export default class Scale {
  private scaleElem: HTMLElement;

  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    this.init(parent);
  }

  private init(parent):void {
    this.parent = parent;
    this.scaleElem = document.createElement('div');
    this.scaleElem.classList.add('slider__scale');
  }

  public set():void {
    this.parent.append(this.scaleElem);
  }
}

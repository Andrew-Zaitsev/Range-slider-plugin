import Scale from './scale';

export default class ScaleLabel {
  private parentElem!: HTMLElement;

  private scale!: Scale;

  private scaleLabelElem!: HTMLElement;

  private scalePinElem!: HTMLElement;

  private scaleTextElem!: HTMLElement;

  constructor(parent: HTMLElement) {
    this.init(parent);
  }

  public getElem(): HTMLElement {
    return this.scaleLabelElem;
  }

  public getTextElem(): HTMLElement {
    return this.scaleTextElem;
  }

  public setScaleLabel(scale: Scale): void {
    this.scale = scale;
    this.parentElem.append(this.scaleLabelElem);
  }

  public setLabelText(text: string) {
    this.getTextElem().textContent = text;
  }

  private init(parent: HTMLElement): void {
    this.parentElem = parent;

    this.scaleLabelElem = document.createElement('div');
    this.scaleLabelElem.classList.add('slider__scale-label');

    this.scalePinElem = document.createElement('div');
    this.scalePinElem.classList.add('slider__scale-pin');

    this.scaleTextElem = document.createElement('div');
    this.scaleTextElem.classList.add('slider__scale-text');

    this.scaleLabelElem.append(this.scaleTextElem, this.scalePinElem);
  }
}

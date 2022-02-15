export default class ThumbLabel {
  private thumbLabelElem!: HTMLElement;

  constructor(private parent: HTMLElement) {
    this.init();
  }

  public getElem(): HTMLElement {
    return this.thumbLabelElem;
  }

  public setThumb(): void {
    this.parent.prepend(this.thumbLabelElem);
  }

  public setLabelText(text: string): void {
    this.getElem().textContent = text;
  }

  private init(): void {
    this.thumbLabelElem = document.createElement('div');
    this.thumbLabelElem.classList.add('slider__thumb-label');
  }
}

export default class Handle {
  private handleElems: HTMLElement[] = [];

  private parent: HTMLElement;

  constructor(parent: HTMLElement, values: number[]) {
    this.init(parent, values);
  }

  private init(parent: HTMLElement, values: number[]): void {
    this.parent = parent;

    values.forEach((value: number) => {
      const handleElem: HTMLElement = document.createElement('div');
      handleElem.classList.add('slider__handle');
      this.handleElems.push(handleElem);
      // console.log(handleElem);
    });

    if (this.handleElems.length === 2) {
      this.handleElems[0].classList.add('slider__handle_min');
      this.handleElems[1].classList.add('slider__handle_max');
    }
  }

  public set(): void {
    this.parent.append(...this.handleElems);
  }
}

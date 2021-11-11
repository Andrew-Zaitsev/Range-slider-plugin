import { defaultOptions, userOptions } from '../../model/optionsTypes';
import Handle from './handle';

export default class selectBar {
  private selectBarElem: HTMLElement;

  private parent: HTMLElement;

  private handles: Handle[] = [];

  constructor(parent: HTMLElement, options: defaultOptions) {
    this.init(parent, options);
  }

  private init(parent: HTMLElement, options: defaultOptions): void {
    this.parent = parent;

    this.selectBarElem = document.createElement('div');
    this.selectBarElem.classList.add('slider__select-bar');
  }

  public set():void {
    this.parent.append(this.selectBarElem);
  }

  public setPosition(handles: Handle[], options: userOptions):void {
    this.handles = handles;
    if (options.isVertical) {
      console.log('* вертикальный селект-бар не рассчитывается *');
    } else {
      const selectBarLeftProperty = this.calculateLeftOffset();
      this.selectBarElem.style.left = `${selectBarLeftProperty}px`;
    }
  }

  private calculateLeftOffset(): number {
    const minHandleElemRect: DOMRect = this.handles[0].getElem().getBoundingClientRect();
    const sliderRect: DOMRect = this.parent.getBoundingClientRect();
    const minXCoord: number = minHandleElemRect.left + minHandleElemRect.width / 2;
    const leftOffset: number = minXCoord - sliderRect.left;

    return leftOffset;
  }
}

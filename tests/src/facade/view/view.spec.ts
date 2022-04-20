import { defaultOptions } from '../../../../src/facade/model/optionsTypes';
import View from '../../../../src/facade/view/view';

describe('test class View', () => {
  const options: defaultOptions = {
    minValue: 0,
    maxValue: 100,
    values: [20, 80],
    isVertical: false,
    hasScale: true,
    hasRange: true,
    hasLabels: true,
    scaleDivisionsNumber: 4,
    step: 1,
  };
  let parent: HTMLElement;
  let view: View;
  let sliderElem: HTMLElement | null;
  let thumbMinElem: HTMLElement | null;
  let scaleElem: HTMLElement | null;
  let selectBarElem: HTMLElement | null;

  function createView(): void {
    parent = document.querySelector('.parent') || document.createElement('div');
    view = new View(parent, options);
    sliderElem = parent.querySelector('.slider');
    thumbMinElem = parent.querySelector('.slider__thumb.slider__thumb_min');
    scaleElem = parent.querySelector('.slider__scale');
    selectBarElem = parent.querySelector('.slider__select-bar');
  }

  const pointerDownEvent = new PointerEvent('pointerdown', { bubbles: true });
  const pointerMoveEvent = new PointerEvent('pointerdown', { bubbles: true });
  const pointerUpEvent = new PointerEvent('pointerup', { bubbles: true });

  it('View should be a function', () => {
    expect(View instanceof Function).toBe(true);
  });

  describe('test View constructor', () => {
    setFixtures('<div class="parent"></div>');
    createView();

    it('constructor should add required HTML elements to parent element', () => {
      expect(sliderElem && thumbMinElem && scaleElem && selectBarElem).not.toBe(null);
    });

    describe('constructor should create correct DOM structure for slider', () => {
      const hasSliderElem = Boolean(parent.children.item(0)?.matches('.slider'));
      const hasMinThumbElem = Boolean(parent.children.item(0)?.children.item(0)?.matches('.slider__thumb.slider__thumb_min'));
      const hasMaxThumbElem = Boolean(parent.children.item(0)?.children.item(1)?.matches('.slider__thumb.slider__thumb_max'));
      const hasScaleElem = Boolean(parent.children.item(0)?.children.item(2)?.matches('.slider__scale'));
      const hasSelectBarElem = Boolean(parent.children.item(0)?.children.item(3)?.matches('.slider__select-bar'));

      it('test test slider element existance', () => { expect(hasSliderElem).toBe(true); });
      it('test test slider__thumb_min element existance', () => { expect(hasMinThumbElem).toBe(true); });
      it('test test slider__thumb_max element existance', () => { expect(hasMaxThumbElem).toBe(true); });
      it('test test slider__scale element existance', () => { expect(hasScaleElem).toBe(true); });
      it('test test slider__select-bar element existance', () => { expect(hasSelectBarElem).toBe(true); });
    });

    describe('constructor should correctly bind listeners', () => {
      beforeAll(() => {
        spyOn(view.observer, 'emit');
      });

      it(
        'test pointerdown listener in case of dispatcing "pointerdown" event on scale and selectBar elements ',
        () => {
          scaleElem?.dispatchEvent(pointerDownEvent);
          selectBarElem?.dispatchEvent(pointerDownEvent);
          selectBarElem?.dispatchEvent(pointerUpEvent);

          expect(view.observer.emit).toHaveBeenCalledTimes(2);
        },
      );

      // Uncaught NotFoundError: Failed to execute 'setPointerCapture' on 'Element':
      // No active pointer with the given id is found. thrown
      xit(
        'test pointerdown and pointermove listeners in case of dispatcing "pointerdown" event thumb element ',
        () => {
          thumbMinElem?.dispatchEvent(pointerDownEvent);
          thumbMinElem?.dispatchEvent(pointerMoveEvent);
          thumbMinElem?.dispatchEvent(pointerDownEvent);

          expect(view.observer.emit).toHaveBeenCalledTimes(2);
        },
      );
    });
  });

  describe('test public methods', () => {
    xdescribe('test update method', () => {
      it('test orientation changing', () => { expect(false).toBe(true); });
      it('test values/thumb-labels text changing', () => { expect(false).toBe(true); });
      it('test min max scale-label text changing', () => { expect(false).toBe(true); });
      it('test changing range, scale, labels existance', () => { expect(false).toBe(true); });
      it('test step value changing)', () => { expect(false).toBe(true); });
    });

    describe('test disableView method', () => {
      setFixtures('<div class="parent"></div>');

      beforeAll(() => {
        createView();
        spyOn(view.observer, 'emit');
        view.disableView();
      });

      it('should unbind listeners', () => {
        scaleElem?.dispatchEvent(pointerDownEvent);

        expect(view.observer.emit).toHaveBeenCalledTimes(0);
      });

      it('should add slider_unselectable class to slider element', () => {
        expect(sliderElem).toHaveClass('slider_unselectable');
      });
    });

    describe('test enableView method', () => {
      setFixtures('<div class="parent"></div>');

      beforeAll(() => {
        createView();
        spyOn(view.observer, 'emit');
        view.disableView(); // already tested
        view.enableView();
      });

      it('should bind listeners', () => {
        scaleElem?.dispatchEvent(pointerDownEvent);
        selectBarElem?.dispatchEvent(pointerDownEvent);

        expect(view.observer.emit).toHaveBeenCalledTimes(2);
      });

      it('should remove slider_unselectable class to slider element', () => {
        expect(sliderElem).not.toHaveClass('slider_unselectable');
      });
    });

    describe('test deleteView method method', () => {
      setFixtures('<div class="parent"></div>');
      createView();

      it('parent should get rid of slider element', () => {
        view.deleteView();

        expect(parent.contains(sliderElem)).toBeFalse();
      });
    });
  });
});

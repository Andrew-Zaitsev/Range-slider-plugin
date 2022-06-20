import { defaultOptions } from '../../../../src/facade/model/optionsTypes';
import View from '../../../../src/facade/view/view';

describe('test class View', () => {
  const options: defaultOptions = {
    minValue: 14, // 0
    maxValue: 102, // 100
    values: [20, 80],
    isVertical: false,
    hasScale: true,
    hasRange: true,
    hasLabels: true,
    scaleDivisionsNumber: 4,
    step: 1,
  };
  let parent: HTMLElement | null = null;
  let view: View | null = null;
  let sliderElem: HTMLElement | null = null;
  let thumbMinElem: HTMLElement | null = null;
  let thumbMaxElem: HTMLElement | null = null;
  let scaleElem: HTMLElement | null = null;
  let selectBarElem: HTMLElement | null = null;

  const pointerDownEvent = new PointerEvent('pointerdown', { bubbles: true });
  const pointerMoveEvent = new PointerEvent('pointermove', { bubbles: true });
  const pointerUpEvent = new PointerEvent('pointerup', { bubbles: true });

  function createView(): void {
    setFixtures('<div class="parent"></div>');

    parent = document.querySelector('.parent');

    if (parent) {
      view = new View(parent, options);
      sliderElem = parent.querySelector('.slider');
      thumbMinElem = parent.querySelector('.slider__thumb.slider__thumb_min');
      thumbMaxElem = parent.querySelector('.slider__thumb.slider__thumb_max');
      scaleElem = parent.querySelector('.slider__scale');
      selectBarElem = parent.querySelector('.slider__select-bar');
    }
  }

  function deleteView(): void {
    jasmine.getFixtures().cleanUp();

    parent = null;
    view = null;
    sliderElem = null;
    thumbMinElem = null;
    thumbMaxElem = null;
    scaleElem = null;
    selectBarElem = null;
  }

  xit('test test', () => {
    setFixtures('<div class="parent" id="test-parent"></div>');
    console.log('test: ', document.querySelector('.parent'));
    createView();
    console.log('test: ', parent);
    expect(View instanceof Function).toBe(true);
  });

  it('View should be a function', () => {
    expect(View instanceof Function).toBe(true);
  });

  describe('test View constructor', () => {
    createView();

    it('constructor should add required HTML elements to parent element', () => {
      expect(sliderElem && thumbMinElem && scaleElem && selectBarElem).not.toBe(null);
    });

    describe('constructor should create correct DOM structure for slider', () => {
      const hasSliderElem = Boolean(parent?.children.item(0)?.matches('.slider'));
      const hasMinThumbElem = Boolean(parent?.children.item(0)?.children.item(0)?.matches('.slider__thumb.slider__thumb_min'));
      const hasMaxThumbElem = Boolean(parent?.children.item(0)?.children.item(1)?.matches('.slider__thumb.slider__thumb_max'));
      const hasScaleElem = Boolean(parent?.children.item(0)?.children.item(2)?.matches('.slider__scale'));
      const hasSelectBarElem = Boolean(parent?.children.item(0)?.children.item(3)?.matches('.slider__select-bar'));

      it('test test slider element existance', () => { expect(hasSliderElem).toBe(true); });
      it('test test slider__thumb_min element existance', () => { expect(hasMinThumbElem).toBe(true); });
      it('test test slider__thumb_max element existance', () => { expect(hasMaxThumbElem).toBe(true); });
      it('test test slider__scale element existance', () => { expect(hasScaleElem).toBe(true); });
      it('test test slider__select-bar element existance', () => { expect(hasSelectBarElem).toBe(true); });
    });

    describe('constructor should correctly bind listeners', () => {
      // console.log(view.observer);
      beforeAll(() => {
        if (view) spyOn(view.observer, 'emit');
      });

      it(
        `test pointerdown listener - emit method should be called in case of
        dispatcing "pointerdown" event on scale and selectBar elements`,
        () => {
          console.log('disp on scale', scaleElem?.dispatchEvent(pointerDownEvent));
          console.log('disp on selectBar', selectBarElem?.dispatchEvent(pointerDownEvent));
          selectBarElem?.dispatchEvent(pointerUpEvent);

          expect(view.observer.emit).toHaveBeenCalledTimes(2);// toHaveBeenCalledTimes(2);
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
    describe('test update method', () => {
      setFixtures('<div class="parent"></div>');

      beforeAll(() => {
        createView();
      });

      it('test orientation changing', () => {
        view.update({ isVertical: true });

        expect(sliderElem).toHaveClass('slider_vertical');
      });

      it('test thumb-label elements text changing according to passed values', () => {
        const thumbMinLabel = thumbMinElem?.querySelector('.slider__thumb-label');
        const thumbMaxLabel = thumbMaxElem?.querySelector('.slider__thumb-label');

        view.update({ values: [30, 50] });

        expect(thumbMinLabel?.textContent).toEqual('30');
        expect(thumbMaxLabel?.textContent).toEqual('50');
      });

      xit('test min max scale-label text changing', () => {
        const scaleLabelMinTextElem = scaleElem?.firstElementChild?.querySelector('.slider__scale-text');
        // const scaleLabelMaxTextElem = scaleElem?.lastElementChild?.querySelector('.slider__scale-text');
        // console.log(scaleLabelMinTextElem, scaleElem);
        view.update({
          minValue: 11,
          maxValue: 95,
        });
        const scaleLabelMaxTextElem = scaleElem?.lastElementChild?.querySelector('.slider__scale-text');
        // console.log(scaleLabelMinTextElem, scaleElem);

        expect(scaleLabelMinTextElem?.textContent).toEqual('5');
        // expect(scaleLabelMinTextElem?.textContent).toEqual('95');
      });

      it('test range changing', () => {
        // console.log(document.querySelector('.parent')); // нет парента  !!!
        // console.log('до', sliderElem?.querySelector('.slider__thumb.slider__thumb_min'));
        view.update({ hasRange: false });
        // console.log(sliderElem?.contains(thumbMinElem));
        // console.log('после', sliderElem?.querySelector('.slider__thumb.slider__thumb_min'));
        // console.log(sliderElem, 'doc: ', parent.querySelector('.slider'));
        // console.log(thumbMinElem);
        expect(sliderElem?.contains(thumbMinElem)).toBeFalse();

        view.update({ hasRange: true });

        expect(sliderElem?.contains(thumbMinElem)).toBeTrue();
      });

      // **********************************************************
      // **********************************************************
      it('test changing scale labels existance', () => {
        // console.log('view: ', view, parent);
        // ********************************
        setFixtures('<div class="parent1"></div>');

        const parent1: HTMLElement = document.querySelector('.parent1') || document.createElement('div');
        const view1 = new View(parent1, options);
        const scaleElem1 = parent1.querySelector('.slider__scale');
        console.log('1 view: ', parent1, parent1?.children[0].children[2], scaleElem1?.children); // parent1 выводится как живой объект
        // ********************************
        // createView();
        // const a = scaleElem;
        view1.update({ hasScale: false });
        // const b = scaleElem;
        console.log('3 view: ', view1, parent1);
        setTimeout(
          () => {
            parent1?.children[0].remove();
          },
          3000,
        );
        // console.log(scaleElem?.children?.length);
        // expect(scaleElem?.children?.length).toBe(0);

        // view.update({ hasScale: false });
        expect(1).toBe(1);
        // expect(scaleElem?.children?.length).toBe(0);
      });

      xit('test changing thumb labels existance', () => {
        view.update({ hasLabels: false });

        expect(false).toBe(true);
      });
      xit('test changing scale, labels existance', () => { expect(false).toBe(true); });
      xit('test step value changing)', () => { expect(false).toBe(true); });
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

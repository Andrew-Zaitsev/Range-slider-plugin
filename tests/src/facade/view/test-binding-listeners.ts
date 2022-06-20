import { defaultOptions } from '../../../../src/facade/model/optionsTypes';
import View from '../../../../src/facade/view/view';

describe('constructor should correctly bind listeners', () => {
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
  let scaleElem: HTMLElement | null = null;
  let selectBarElem: HTMLElement | null = null;

  const pointerDownEvent = new PointerEvent('pointerdown', { bubbles: true });
  const pointerUpEvent = new PointerEvent('pointerup', { bubbles: true });

  function createView(): void {
    setFixtures('<div class="parent"></div>');

    parent = document.querySelector('.parent'); // || document.createElement('div');

    if (parent) {
      view = new View(parent, options);
      scaleElem = parent.querySelector('.slider__scale');
      selectBarElem = parent.querySelector('.slider__select-bar');
    }
  }

  function deleteView(): void {
    jasmine.getFixtures().cleanUp();

    parent = null;
    view = null;
    scaleElem = null;
    selectBarElem = null;
  }

  // deleting fixtures
  // jasmine.getFixtures().cleanUp();

  createView();

  if (parent) {
    beforeAll(() => {
      if (view) spyOn(view.observer, 'emit');
    });

    it(
      `test pointerdown listener - emit method should be called in case of
    dispatcing "pointerdown" event on scale and selectBar elements`,
      () => {
        scaleElem?.dispatchEvent(pointerDownEvent);
        selectBarElem?.dispatchEvent(pointerDownEvent);
        selectBarElem?.dispatchEvent(pointerUpEvent);

        expect(view?.observer.emit).toHaveBeenCalledTimes(2);// toHaveBeenCalledTimes(2);

        deleteView();
      },
    );
  }

  // console.log(scaleElem);
});

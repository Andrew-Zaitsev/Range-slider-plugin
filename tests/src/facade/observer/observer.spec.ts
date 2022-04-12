import { userOptions } from '../../../../src/facade/model/optionsTypes';
import Observer, { ObserverCallback } from '../../../../src/facade/observer/observer';

describe('test class Observer', () => {
  it('class Observer should be a function', () => {
    expect(Observer instanceof Function).toBe(true);
  });

  describe('test public methods', () => {
    let signallerFirst: userOptions;// идентификатор срабатывания коллбэков
    let signallerSecond: userOptions;// идентификатор срабатывания коллбэков
    const firstObserverCallback: ObserverCallback = (data) => { signallerFirst = { ...data }; }; // undefined;
    const secondObserverCallback: ObserverCallback = (data) => { signallerSecond = { ...data }; };
    let observer: Observer;
    let callbacksArray: ObserverCallback[];

    beforeEach(() => {
      observer = new Observer();
    });

    it('test getCallbacks method', () => {
      callbacksArray = [];

      expect(observer.getCallbacks()).toBeDefined();
      expect(observer.getCallbacks().length).toBe(0);
      expect(observer.getCallbacks()).toEqual(callbacksArray);
    });

    it('test subscribe method ', () => {
      observer.subscribe(firstObserverCallback);
      callbacksArray = observer.getCallbacks();

      expect(callbacksArray.length).toBe(1);
      expect(callbacksArray[0]).toBe(firstObserverCallback);
    });

    it('test unsubscribe method', () => {
      observer.subscribe(firstObserverCallback);
      callbacksArray = observer.getCallbacks();

      if (callbacksArray.includes(firstObserverCallback)) {
        observer.unsubscribe(firstObserverCallback);
        callbacksArray = observer.getCallbacks();

        expect(callbacksArray).not.toContain(firstObserverCallback);
      } else {
        fail('subscription failed, check subscribe and getCallbacks methods of class Observer');
      }
    });

    describe('test emit method', () => {
      observer = new Observer();
      const objectWithCallbacks = {
        firstMethod: firstObserverCallback,
        secondMethod: secondObserverCallback,
      };
      const objectToEmit: userOptions = { isVertical: true };

      observer.subscribe(objectWithCallbacks.firstMethod);
      observer.subscribe(objectWithCallbacks.secondMethod);
      observer.emit(objectToEmit);

      it(
        `all observer callbacks should be called,
        means that the argument of emit method should be received by all of the observer callbacks`,
        () => {
          expect(signallerSecond).toEqual(objectToEmit);
          expect(signallerFirst).toEqual(objectToEmit);
        },
      );
    });
  });
});

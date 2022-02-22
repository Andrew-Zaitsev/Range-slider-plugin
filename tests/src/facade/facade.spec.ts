import '../../../src/index'
import Facade from '../../../src/facade/facade'
import Model from '../../../src/facade/model/model';
// import { defaultOptions, userOptions } from '../../../src/facade/model/optionsTypes';
// import { ObserverCallback } from '../../../src/facade/observer/observer';


describe('test class Facade', () => {
  const parentElem: HTMLElement = document.createElement('div')
  const facade = new Facade(parentElem, {});

  it('Facade should be a function', () => {
    expect(Facade instanceof Function).toBe(true);
  });
  
  describe('test getOptions()', () => {
    it('returned value should be defined', () => {
      expect(facade.getOptions()).toBeDefined();
    });
    it('should return model options', () => {
      expect(facade.getOptions()).toEqual(Model.defaultOptions);
    });
  })
  
});
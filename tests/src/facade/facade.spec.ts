//first.test.js

import '../../../src/index'
import Facade from '../../../src/facade/facade'
import { userOptions } from '../../../src/facade/model/optionsTypes';


describe('test class Facade', () => {
  it('instance if Facade shoud be created', () => {
    beforeAll
      const parentElem: HTMLElement = document.createElement('div')
      const options: userOptions = {
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
      
    // const sliderElem = document.createElement('span')
    const facade = new Facade(parentElem, options);
    console.log(Facade, 'hello', '\n', facade)
    expect(Math.max(1, 5, 10)).toBe(10)
  });
  
});
import { defaultOptions, userOptions } from '../../../../src/facade/model/optionsTypes';
import Model from '../../../../src/facade/model/model';

describe('test class Model', () => {
  // const parentElem: HTMLElement = document.createElement('div')

  const options: userOptions = {};
  const model = new Model(options);

  it('Model should be a function', () => {
    expect(Model instanceof Function).toBe(true);
  });

  describe('test getOptions method', () => {
    const modelOptions: defaultOptions = model.getOptions();

    it('should return an object', () => {
      expect(modelOptions instanceof Object).toBe(true);
    });
    it('should return model options', () => {
      expect(modelOptions).toEqual(Model.defaultOptions);
    });
  });

  describe('test update method', () => {
    it('update method should be defined', () => {
      expect(model.update).toBeDefined();
    });
    const modelOptions: defaultOptions = model.getOptions();
    const newOptions: userOptions = { isVertical: true };
    model.update(newOptions);
    const updatedOptions = model.getOptions();
    const correctOptions: defaultOptions = {
      minValue: 0,
      maxValue: 100,
      values: [20, 80],
      isVertical: true,
      hasScale: true,
      hasRange: true,
      hasLabels: true,
      scaleDivisionsNumber: 4,
      step: 1,
    };
    it('model options should be changed', () => {
      expect(modelOptions).not.toEqual(updatedOptions);
    });
    it('should correctly update model options', () => {
      expect(updatedOptions.isVertical).toBe(true);
      expect(updatedOptions).toEqual(correctOptions);
    });
    it('should emit updates', () => {
      spyOn(model.observer, 'emit');
      model.update({ values: [10, 90] });
      expect(model.observer.emit).toHaveBeenCalled();
      expect(model.observer.emit).toHaveBeenCalledOnceWith({ values: [10, 90] });
    });
  });
});

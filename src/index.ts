import './jquery.interface.ts';
import type { userOptions } from './model/optionsTypes';
import Model from './model/model';
import View from './view/view';
import Presenter from './presenter/presenter';

(function ($) {
  jQuery.fn.rangeSlider = function (requirements: any) {
    // console.log('hi', requirements);

    const methods = {
      init(options: userOptions|undefined): JQuery {
        const model: Model = new Model(options);
        const view: View = new View();
        const presenter: Presenter = new Presenter(model, view);

        console.log('from init \n ***************');
        console.log('options: \n', options);
        console.log('this \n', this);
        console.log('****************');

        return this;
      },
      show() {
        // ПОДХОД
      },
      hide() {
        // ПРАВИЛЬНЫЙ
      },
      update() {
        // !!!
      },
      delete() {
        // !!!
      },
    };
    // this = $(elem)
    switch (true) {
      case ((methods[requirements]) && (typeof requirements === 'string')):
        return methods[requirements].call(this);
      case (typeof requirements === 'object'):
        return methods.init.call(this[0], requirements);
      default:
        throw new Error('Не правильные аргументы вызова метода "rangeSlider"');
    }
  };
}(jQuery));

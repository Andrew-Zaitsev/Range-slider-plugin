import './scss/slider.scss';

import './jquery.interface.ts';
import type { userOptions } from './facade/model/optionsTypes';
import Facade from './facade/facade';

(function ($) {
  jQuery.fn.rangeSlider = function (pluginOptions: any): JQuery {
    const pluginAPI: any = {
      init(options: userOptions|undefined): JQuery {
        return this.each((index: number, elem: HTMLElement) => $(elem).data('facade', new Facade(elem, options as userOptions)));
      },
      show() {
        //
      },
      hide() {
        //
      },
      update() {
        //
      },
      delete() {
        //
      },
    };
    // this = $(elem), this[0] = elem
    switch (true) {
      case ((typeof pluginOptions === 'string') && (pluginAPI[pluginOptions])): return pluginAPI[pluginOptions].call(this);
      case (typeof pluginOptions === 'object'): return pluginAPI.init.call(this, pluginOptions);
      default: throw new Error('Не правильные аргументы вызова метода "rangeSlider"');
    }
  };
}(jQuery));

// console.log('from init \n ______________ \n', 'options: \n', options, 'this \n', this, '\n ______________');

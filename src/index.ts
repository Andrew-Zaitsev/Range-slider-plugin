import './scss/slider.scss';
import './jquery.interface.ts';
import type { userOptions } from './facade/model/optionsTypes';
import Facade from './facade/facade';
import { ObserverCallback } from './facade/observer/observer';

(function ($) {
  jQuery.fn.rangeSlider = function (pluginParams, ...rest): JQuery<HTMLElement> {
    const pluginAPI: any = {
      init(initOptions: userOptions|undefined): JQuery<HTMLElement> {
        return this
          .each((index: number, elem: HTMLElement) => $(elem).data('facade', new Facade(elem, initOptions as userOptions)));
      },
      show() {
        //
      },
      hide() {
        //
      },
      update(updateOptions: userOptions): JQuery<HTMLElement> {
        return this
          .each((index: number, elem: HTMLElement) => $(elem).data('facade').presenter.updateModel(updateOptions));
      },
      subscribeToSliderUpdates(fn: ObserverCallback): JQuery<HTMLElement> {
        return this
          .each((index: number, elem: HTMLElement) => $(elem).data('facade').presenter.subscribeToModel(fn));
      },
      delete() {
        //
      },
      // ПОДУМАТЬ О ЗАМЕНЕ ПОДПИСКИ ПАНЕЛИ НА МОДЕЛЬ  - ЧЕРЕЗ pluginAPI  слайдера(нет еще метода) например subscribeTo в АПИ
      // и апдейтить слайдер через АПИ слайдера(метод есть)
    };
    // this = $(elem), this[0] = elem
    switch (true) {
      case (Boolean((typeof pluginParams === 'string') && (pluginAPI[pluginParams])))://
        return pluginAPI[pluginParams].apply(this, Array.prototype.slice.call(rest));
      case (typeof pluginParams === 'object'):
        return pluginAPI.init.call(this, pluginParams); // вызов init слайдера
      default: throw new Error('Неверные аргументы вызова метода "rangeSlider"');
    }
  };
}(jQuery));

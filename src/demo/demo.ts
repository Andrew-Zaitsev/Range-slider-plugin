import './demo.scss';
import type { userOptions } from '../facade/model/optionsTypes';
import ControlPanel from '../control-panel/control-panel';

const demoSliderConfigs: userOptions[] = [
  {
    minValue: 10,
    maxValue: 20,
    values: [15.5, 17],
    isVertical: false,
    scaleDivisionsNumber: 6,
    step: 1,
  },
  {
    minValue: 0,
    maxValue: 100,
    hasScale: false,
    hasLabels: false,
  },
  {
    minValue: 500,
    maxValue: -50,
    values: [450, 4],
    isVertical: false,
    hasScale: true,
    hasRange: false,
    step: 12,
  },
];

class DemoSliderInit {
  private demo: HTMLElement = <HTMLElement>document.querySelector('.demo');

  private demoSliderSection: HTMLElement = document.createElement('section');

  private demoSliderWrapper: HTMLElement = document.createElement('div');

  private demoSliderWrapperForControlPanel: HTMLElement = document.createElement('div');

  private demoSliderControlPanel: HTMLElement = document.createElement('div');

  private demoSlider: HTMLElement = document.createElement('div');

  constructor(demoSliderOptions: userOptions) {
    this.init(demoSliderOptions);
  }

  private init(options: userOptions) {
    this.demoSliderSection.classList.add('demo__slider-section');
    this.demoSliderWrapper.classList.add('demo__slider-wrapper');
    this.demoSliderWrapperForControlPanel.classList.add('demo__slider-wrapper', 'demo__slider-wrapper_for-control-panel');
    this.demoSliderControlPanel.classList.add('demo__slider-control-panel');// slider-controls
    this.demoSlider.classList.add('demo__slider', 'js-demo__slider');

    this.demoSliderWrapper.append(this.demoSlider);
    this.demoSliderWrapperForControlPanel.append(this.demoSliderControlPanel);
    this.demoSliderSection.append(this.demoSliderWrapper);
    this.demoSliderSection.append(this.demoSliderWrapperForControlPanel);
    this.demo.append(this.demoSliderSection);

    $(this.demoSlider).rangeSlider(options);
    const controlPanel = new ControlPanel(this.demoSliderControlPanel, this.demoSlider);
  }
}
demoSliderConfigs.forEach((config: userOptions) => new DemoSliderInit(config));

// пример изменения слайдера через API

/*
setTimeout(() => {
  console.log('-------------------------------- \n changed using API');

  $('.js-demo__slider:eq(0)').rangeSlider('disable');
  setTimeout(() => {
    // $('.js-demo__slider:eq(0)').rangeSlider('delete');
  }, 2000);

  console.log('--------------------------------');
}, 4000);
*/

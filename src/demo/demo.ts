import './demo.scss';
import type { userOptions } from '../facade/model/optionsTypes';

const demoSliderConfigs: userOptions[] = [
  {
    minValue: 10,
    maxValue: 50,
    hasLabels: false,
    scaleDivisionsNumber: 5,
    step: 5,
  },
  {
    minValue: 0,
    maxValue: 100,
    hasScale: true,
    hasLabels: false,
  },
  {
    minValue: 500,
    maxValue: -50,
    values: [500],
    isVertical: true,
    hasScale: false,
    hasRange: false,
    step: 12,
  },
];

class DemoSliderInit {
  private demoSliders: HTMLElement = <HTMLElement>document.querySelector('.demo');

  private demoSliderSection: HTMLElement = document.createElement('section');

  private demoSliderWrapper: HTMLElement = document.createElement('div');

  private demoSliderWrapperForControls: HTMLElement = document.createElement('div');

  private demoSliderControls: HTMLElement = document.createElement('div');

  private demoSlider: HTMLElement = document.createElement('div');

  constructor(demoSliderOptions: userOptions) {
    this.init(demoSliderOptions);
  }

  private init(options: userOptions) {
    this.demoSliderSection.classList.add('demo__slider-section');
    this.demoSliderWrapper.classList.add('demo__slider-wrapper');
    this.demoSliderWrapperForControls.classList.add('demo__slider-wrapper', 'demo__slider-wrapper_for-controls');
    this.demoSliderControls.classList.add('demo__slider-controls');
    this.demoSlider.classList.add('demo__slider', 'js-demo__slider');

    this.demoSliderWrapper.append(this.demoSlider);
    this.demoSliderWrapperForControls.append(this.demoSliderControls);
    this.demoSliderSection.append(this.demoSliderWrapper);
    this.demoSliderSection.append(this.demoSliderWrapperForControls);
    this.demoSliders.append(this.demoSliderSection);

    $(this.demoSlider).rangeSlider(options);
  }
}
demoSliderConfigs.forEach((config: userOptions) => new DemoSliderInit(config));

// console.log(a.data());

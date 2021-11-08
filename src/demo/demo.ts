import './demo.scss';
import type { userOptions } from '../facade/model/optionsTypes';

const demoSliderConfigs: userOptions[] = [
  {
    minValue: 10,
    maxValue: 50,
    hasLabels: false,
    step: 5,
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
    isVertical: true,
    hasScale: false,
    hasRange: false,
    step: 12,
  },
];

class DemoSliderInit {
  private demoSliderTitle: HTMLElement = document.querySelector('.demo__title');

  private demoSliderSection: HTMLElement;

  private demoSliderWrapper: HTMLElement;

  private demoSliderWrapperForControls: HTMLElement;

  private demoSliderControls: HTMLElement;

  private demoSlider: HTMLElement;

  constructor(demoSliderOptions: userOptions) {
    this.init(demoSliderOptions);
  }

  private init(options: userOptions) {
    this.demoSliderSection = document.createElement('section');
    this.demoSliderSection.classList.add('demo__slider-section');

    this.demoSliderWrapper = document.createElement('div');
    this.demoSliderWrapper.classList.add('demo__slider-wrapper');

    this.demoSliderWrapperForControls = document.createElement('div');
    this.demoSliderWrapperForControls.classList.add('demo__slider-wrapper', 'demo__slider-wrapper_for-controls');

    this.demoSliderControls = document.createElement('div');
    this.demoSliderControls.classList.add('demo__slider-controls');

    this.demoSlider = document.createElement('div');
    this.demoSlider.classList.add('demo__slider', 'js-demo__slider');

    this.demoSliderWrapper.append(this.demoSlider);
    this.demoSliderWrapperForControls.append(this.demoSliderControls);
    this.demoSliderSection.append(this.demoSliderWrapper);
    this.demoSliderSection.append(this.demoSliderWrapperForControls);
    this.demoSliderTitle.after(this.demoSliderSection);

    // console.log(this.demoSlider);
    $(this.demoSlider).rangeSlider(options);
    // console.log($(this.demoSlider).data());
  }
}

demoSliderConfigs.forEach((config: userOptions) => new DemoSliderInit(config));

// console.log(a.data());

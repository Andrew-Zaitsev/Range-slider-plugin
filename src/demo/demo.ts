import './demo.scss';
import type { userOptions } from '../model/optionsTypes';

const sliderOptions: userOptions[] = [
  {
    minValue: 10,
    maxValue: 50,
    hasRange: false,
    hasLabels: false,
    step: 5,
  },
  {
    minValue: 0,
    maxValue: 100,
    hasScale: false,
    hasRange: false,
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
// console.log('demo');
$('.demo__title').rangeSlider('init').css('color', 'red');

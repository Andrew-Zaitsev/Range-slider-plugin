# FSD range slider plugin

## See demo:

  <a href='https://andrew-zaitsev.github.io/Range-slider-plugin/'>Demo</a>


## Clone project
```
  $ git clone https://github.com/Andrew-Zaitsev/Range-slider-plugin.git
```

## Install project
```
  $ npm i
```

## Development mode
```
  $ npm run dev
```

## Build project
```
  $ npm run build
```

## Publish project
```
  $ npm run deploy
```

## Run tests:
```
  $ npm run test
```

## Initialize slider
```
  <div class='js-slider'></div>;
```
<p>default options usage</p>

```
  $('.js-slider').rangeSlider();
```
<p>custom options usage</p>

```

  $('.js-slider').rangeSlider({
      minValue: 10,
      maxValue: 20,
      values: [15, 17],
      isVertical: false,
      scaleDivisionsNumber: 6,
      step: 1,
  });

```

## Options table
<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Default value</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>minValue</td>
      <td>number</td>
      <td>0</td>
      <td>Minimum slider value</td>
    </tr>
    <tr>
      <td>maxValue</td>
      <td>number</td>
      <td>100</td>
      <td>Maximum slider value</td>
    </tr>
    <tr>
      <td>values</td>
      <td>number[]</td>
      <td>[20, 80]</td>
      <td>Initial slider values. This value defines initial thumbs posisions. An array can have one or two members</td>
    </tr>
    <tr>
      <td>isVertical</td>
      <td>boolean</td>
      <td>false</td>
      <td>Defines slider direction (vertical or horisontal)</td>
    </tr>
    <tr>
      <td>hasScale</td>
      <td>boolean</td>
      <td>true</td>
      <td>Defines the existence of a scale</td>
    </tr>
    <tr>
      <td>hasRange</td>
      <td>boolean</td>
      <td>true</td>
      <td>Shows / hides one thumb. At hidden condition it's value will be equal minValue</td>
    </tr>
    <tr>
      <td>hasLabels</td>
      <td>boolean</td>
      <td>true</td>
      <td>Shows / hides labels of thumbs</td>
    </tr>
    <tr>
      <td>scaleDivisionsNumber</td>
      <td>number</td>
      <td>4</td>
      <td>Number of interactive scale labels</td>
    </tr>
    <tr>
      <td>step</td>
      <td>number</td>
      <td>1</td>
      <td>Thumb movement step</td>
    </tr>
  </tbody>
</table>

## Plugin API

* update(updateOptions: userOptions)

  Allows to update slider with new options.

  Object type:

  ```

  userOptions = {
    minValue?: number;
    maxValue?: number;
    values?: number[];
    isVertical?: boolean;
    hasScale?: boolean;
    nambers?: number[];
    hasRange?: boolean;
    hasLabels?: boolean;
    scaleDivisionsNumber?: number,
    step?: number;
  };

  ```
  ```
  
  $('.js-slider').slider('update', {
    minValue: 10,
    maxValue: 20,
    values: [15, 17],
    isVertical: false,
    scaleDivisionsNumber: 6,
    step: 1,
  });

  ```

* subscribeToSliderUpdates(fn: ObserverCallback)

  Allows to transmit a callback function into a slider application. The function will be executed when slider values are changed.

  Function type: 
  ```

  ObserverCallback = (data: userOptions) => void;

  ```
  ```

  $('.js-slider').slider('subscribeToSliderUpdates', {myCallbackFunction});

  ```
* getOptions(): defaultOptions | defaultOptions[]

  Allows to get current options from the slider.

  Returned velue type (An array will be received in case sliders were initialised on a set of elements): 
  ```

  defaultOptions | defaultOptions[];

  defaultOptions = {
    minValue: number;
    maxValue: number;
    values: number[];
    isVertical: boolean;
    hasScale: boolean;
    hasRange: boolean;
    hasLabels: boolean;
    scaleDivisionsNumber: number;
    step: number;
  };

  ```
  ```

  $('.js-slider').slider('getOptions');

  ```
* disable(), enable(), delete()

  Allows to disable, enebla, delete slider.

  ```

  $('.js-slider').slider('disable');

  $('.js-slider').slider('enable');
  
  $('.js-slider').slider('delete');

  ```

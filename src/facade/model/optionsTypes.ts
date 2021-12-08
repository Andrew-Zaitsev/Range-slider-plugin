export type defaultOptions = {
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

export type userOptions = {
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

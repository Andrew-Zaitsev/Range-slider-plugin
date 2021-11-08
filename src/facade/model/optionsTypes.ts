export type defaultOptions = {
  minValue: number;
  maxValue: number;
  isVertical: boolean;
  hasScale: boolean;
  values: number[];
  hasRange: boolean;
  hasLabels: boolean;
  step: number;
};

export type userOptions = {
  minValue: number;
  maxValue: number;
  isVertical?: boolean;
  hasScale?: boolean;
  nambers?: number[];
  hasRange?: boolean;
  hasLabels?: boolean;
  step?: number;
};

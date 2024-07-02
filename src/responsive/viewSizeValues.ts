import ViewSize from './ViewSize';

export interface ViewSizeValue {
  minWidth: number;
  maxWidth: number;
}

/** All values are unique. */
export const viewSizeValues: Record<ViewSize, ViewSizeValue> = {
  [ViewSize.xxxxs]: { minWidth: 0, maxWidth: 319 },
  [ViewSize.xxxs]: { minWidth: 320, maxWidth: 479 },
  [ViewSize.xxs]: { minWidth: 480, maxWidth: 639 },
  [ViewSize.xs]: { minWidth: 640, maxWidth: 827 },
  [ViewSize.s]: { minWidth: 828, maxWidth: 1023 },
  [ViewSize.m]: { minWidth: 1024, maxWidth: 1365 },
  [ViewSize.l]: { minWidth: 1366, maxWidth: 1599 },
  [ViewSize.xl]: { minWidth: 1600, maxWidth: 1919 },
  [ViewSize.xxl]: { minWidth: 1920, maxWidth: 2559 },
  [ViewSize.xxxl]: { minWidth: 2560, maxWidth: 3839 },
  [ViewSize.xxxxl]: { minWidth: 3840, maxWidth: 7679 },
  [ViewSize.xxxxxl]: { minWidth: 7680, maxWidth: Number.MAX_SAFE_INTEGER },
};

/** Sorted values. See `viewSizeValues`. */
export const viewSizeValueList: readonly [ViewSize, ViewSizeValue][] = Object.entries(
  viewSizeValues
).sort(([, a], [, b]) => a.minWidth - b.minWidth) as readonly [ViewSize, ViewSizeValue][];

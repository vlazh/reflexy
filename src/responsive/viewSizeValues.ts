import ViewSize from './ViewSize';

export interface ViewSizeValue {
  minWidth: number;
  maxWidth: number;
}

/** All values are unique. */
const viewSizeValues: Record<ViewSize, ViewSizeValue> = {
  [ViewSize.xxs]: { minWidth: 0, maxWidth: 479 },
  [ViewSize.xs]: { minWidth: 480, maxWidth: 767 },
  [ViewSize.s]: { minWidth: 768, maxWidth: 991 },
  [ViewSize.m]: { minWidth: 992, maxWidth: 1279 },
  [ViewSize.l]: { minWidth: 1280, maxWidth: 1919 },
  [ViewSize.xl]: { minWidth: 1920, maxWidth: 2559 },
  [ViewSize.xxl]: { minWidth: 2560, maxWidth: Number.MAX_SAFE_INTEGER },
};

export default viewSizeValues;

/** Sorted values. See `viewSizeValues`. */
export const viewSizeValueList: readonly [ViewSize, ViewSizeValue][] = Object.entries(
  viewSizeValues
).sort(([, a], [, b]) => a.minWidth - b.minWidth) as readonly [ViewSize, ViewSizeValue][];

export function getViewSize(width: number): ViewSize {
  const [viewSize = ViewSize.xxl] =
    viewSizeValueList.find(([, value]) => width >= value.minWidth && width <= value.maxWidth) ?? [];
  return viewSize;
}

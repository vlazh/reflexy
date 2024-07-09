import '@js-toolkit/utils/types';

enum ViewSize {
  xxxxs = 1,
  xxxs = 2,
  xxs = 3,
  xs = 4,
  s = 5,
  m = 6,
  l = 7,
  xl = 8,
  xxl = 9,
  xxxl = 10,
  xxxxl = 11,
  xxxxxl = 12,
  // xxxxs = 'xxxxs',
  // xxxs = 'xxxs',
  // xxs = 'xxs',
  // xs = 'xs',
  // s = 's',
  // m = 'm',
  // l = 'l',
  // xl = 'xl',
  // xxl = 'xxl',
  // xxxl = 'xxxl',
  // xxxxl = 'xxxxl',
  // xxxxxl = 'xxxxxl',
}

// const ViewSizeNumber: Record<ViewSize, number> = {
//   [ViewSize.xxxxs]: 1,
//   [ViewSize.xxxs]: 2,
//   [ViewSize.xxs]: 3,
//   [ViewSize.xs]: 4,
//   [ViewSize.s]: 5,
//   [ViewSize.m]: 6,
//   [ViewSize.l]: 7,
//   [ViewSize.xl]: 8,
//   [ViewSize.xxl]: 9,
//   [ViewSize.xxxl]: 10,
//   [ViewSize.xxxxl]: 11,
//   [ViewSize.xxxxxl]: 12,
// };

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace ViewSize {
  export type Type = ExtractKeysOfType<typeof ViewSize, number>;
  export type Keys = keyof Type;

  export interface Values {
    readonly minWidth: number;
    readonly maxWidth: number;
  }

  /** All values are unique. */
  export const values: Readonly<Record<ViewSize, Values>> = {
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

  /** Sorted values. */
  export const valueList: readonly (readonly [ViewSize, Values])[] = Object.entries(values)
    .map(([key, value]) => [of(key), value] as const)
    .sort(([, a], [, b]) => a.minWidth - b.minWidth);

  export function of(viewSizeNumber: string): ViewSize {
    const num = +viewSizeNumber;
    const key = (Number.isFinite(num) ? ViewSize[num] : viewSizeNumber) as Keys;
    return ViewSize[key];
  }

  export function keyOf(viewSize: ViewSize): Keys {
    return ViewSize[viewSize] as Keys;
  }

  export function get(width: number): ViewSize {
    const viewSize =
      valueList.find(([, value]) => width >= value.minWidth && width <= value.maxWidth)?.[0] ??
      valueList.at(-1)![0];
    return viewSize;
  }

  export function lt(size: ViewSize, than: ViewSize): boolean {
    return size < than;
  }

  export function lte(size: ViewSize, than: ViewSize): boolean {
    return size <= than;
  }

  export function gt(size: ViewSize, than: ViewSize): boolean {
    return size > than;
  }

  export function gte(size: ViewSize, than: ViewSize): boolean {
    return size >= than;
  }
}

export default ViewSize;

enum ViewSize {
  xxxxs = 'xxxxs',
  xxxs = 'xxxs',
  xxs = 'xxs',
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl',
  xxl = 'xxl',
  xxxl = 'xxxl',
  xxxxl = 'xxxxl',
  xxxxxl = 'xxxxxl',
}

export default ViewSize;

export type ViewSizeNumber = number;

export const ViewSizeNumber: Record<ViewSize, ViewSizeNumber> = {
  [ViewSize.xxxxs]: 1,
  [ViewSize.xxxs]: 2,
  [ViewSize.xxs]: 3,
  [ViewSize.xs]: 4,
  [ViewSize.s]: 5,
  [ViewSize.m]: 6,
  [ViewSize.l]: 7,
  [ViewSize.xl]: 8,
  [ViewSize.xxl]: 9,
  [ViewSize.xxxl]: 10,
  [ViewSize.xxxxl]: 11,
  [ViewSize.xxxxxl]: 12,
};

// eslint-disable-next-line @typescript-eslint/no-namespace
namespace ViewSize {
  export function lt(size: ViewSize, than: ViewSize): boolean {
    return ViewSizeNumber[size] < ViewSizeNumber[than];
  }

  export function lte(size: ViewSize, than: ViewSize): boolean {
    return ViewSizeNumber[size] <= ViewSizeNumber[than];
  }

  export function gt(size: ViewSize, than: ViewSize): boolean {
    return ViewSizeNumber[size] > ViewSizeNumber[than];
  }

  export function gte(size: ViewSize, than: ViewSize): boolean {
    return ViewSizeNumber[size] >= ViewSizeNumber[than];
  }
}

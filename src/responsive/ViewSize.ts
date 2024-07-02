enum ViewSize {
  xxxs = 'xxxs',
  xxs = 'xxs',
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl',
  xxl = 'xxl',
}

export default ViewSize;

export type ViewSizeNumber = number;

export const ViewSizeNumber: Record<ViewSize, ViewSizeNumber> = {
  [ViewSize.xxxs]: 1,
  [ViewSize.xxs]: 2,
  [ViewSize.xs]: 3,
  [ViewSize.s]: 4,
  [ViewSize.m]: 5,
  [ViewSize.l]: 6,
  [ViewSize.xl]: 7,
  [ViewSize.xxl]: 8,
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

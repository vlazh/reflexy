enum ViewSize {
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
  [ViewSize.xxs]: 1,
  [ViewSize.xs]: 2,
  [ViewSize.s]: 3,
  [ViewSize.m]: 4,
  [ViewSize.l]: 5,
  [ViewSize.xl]: 6,
  [ViewSize.xxl]: 7,
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

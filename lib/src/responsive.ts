import { ViewSize, getCurrentViewSize } from './mediaQueries';

export interface ResponsiveProps<A extends object> {
  /** `true` - don't merge breakpoints props up to current size and use breakpoint props of current size only. */
  strictBreakpoints?: boolean;
  /** Props per breakpoint */
  breakpoints: { [P in ViewSize]?: A };
}

const sizesMap: Record<ViewSize, number> = {
  [ViewSize.xxs]: 1,
  [ViewSize.xs]: 2,
  [ViewSize.s]: 3,
  [ViewSize.m]: 4,
  [ViewSize.l]: 5,
  [ViewSize.xl]: 6,
  [ViewSize.xxl]: 7,
};

// merge props from lower size to current
function mergeProps<A extends object>(
  viewSize: ViewSize,
  breakpoints: ResponsiveProps<A>['breakpoints']
): A {
  const size = sizesMap[viewSize];
  const sizes = Object.entries(sizesMap);
  const result = {};

  for (let i = 0; i < size; i += 1) {
    Object.assign(result, breakpoints[sizes[i][0]]);
  }

  return result as A;
}

export function mergeResponsiveProps<A extends object, B extends object>({
  breakpoints,
  strictBreakpoints,
  ...rest
}: ResponsiveProps<A> & B): A & B | B {
  const currentViewSize = getCurrentViewSize();

  if (!currentViewSize) {
    return rest as B;
  }

  const merged = strictBreakpoints
    ? breakpoints[currentViewSize]
    : mergeProps(currentViewSize, breakpoints);

  return {
    ...(rest as B),
    ...merged,
  };
}

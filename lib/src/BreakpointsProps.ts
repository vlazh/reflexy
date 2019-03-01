import { Breakpoints, getCurrentBreakpoint } from './mediaQueries';

export interface BreakpointsProps<A extends object> {
  /** `false` - merge props in group for smaller sizes, otherwise use props for concreate breakpoint value. */
  strictBreakpoints?: boolean;
  /** Sets props per breakpoint */
  breakpoints: { [P in Breakpoints]?: A };
}

export function mergeBreakpointsProps<A extends object, B extends object>({
  breakpoints,
  strictBreakpoints,
  ...rest
}: BreakpointsProps<A> & B): A & B | B {
  const currentBreakpoint = getCurrentBreakpoint();

  if (!currentBreakpoint) {
    return rest as B;
  }

  const { group, value } = currentBreakpoint;
  const merged = strictBreakpoints
    ? breakpoints[value]
    : {
        ...breakpoints[`${group}-l`],
        ...breakpoints[`${group}-m`],
        ...breakpoints[`${group}-s`],
      };

  return {
    ...rest,
    ...breakpoints[group],
    ...merged,
  };
}

import { Breakpoints, getCurrentBreakpoint } from '../mediaQueries';

export interface BreakpointsProps<A> {
  /** Sets props per breakpoint */
  breakpoints: { [P in Breakpoints]?: A };
}

export default function mergeBreakpointsProps<A>({ breakpoints, ...rest }: BreakpointsProps<A>): A {
  const currentBreakpoint = getCurrentBreakpoint();
  if (breakpoints && currentBreakpoint) {
    return {
      ...rest,
      ...breakpoints[currentBreakpoint.group],
      ...breakpoints[currentBreakpoint.value],
    } as A;
  }
  return rest as A;
}

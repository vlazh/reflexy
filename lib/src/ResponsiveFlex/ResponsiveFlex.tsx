import React from 'react';
import { getCurrentBreakpoint as getCurrent, initMediaQueries, Breakpoints } from '../mediaQueries';
import Flex, { FlexProps, FlexAllProps } from '../Flex';

export interface ResponsiveFlexProps extends FlexProps {
  /** Sets flex props per breakpoint */
  breakpoints: { [P in Breakpoints]?: FlexProps };
}

export type ResponsiveFlexAllProps = ResponsiveFlexProps & FlexAllProps;

function mergeBreakpointsProps({ breakpoints, ...rest }: ResponsiveFlexProps): FlexProps {
  const currentBreakpoint = ResponsiveFlex.getCurrentBreakpoint();
  if (breakpoints && currentBreakpoint) {
    return {
      ...rest,
      ...breakpoints[currentBreakpoint.group],
      ...breakpoints[currentBreakpoint.value],
    };
  }
  return rest;
}

function ResponsiveFlex(props: ResponsiveFlexAllProps): ReturnType<typeof Flex> {
  // Lazy init media queries
  if (!ResponsiveFlex.getCurrentBreakpoint()) {
    ResponsiveFlex.initialize();
  }

  const mergedProps = mergeBreakpointsProps(props);
  return <Flex {...mergedProps} />;
}

ResponsiveFlex.initialize = initMediaQueries;
ResponsiveFlex.getCurrentBreakpoint = getCurrent;

export default ResponsiveFlex;

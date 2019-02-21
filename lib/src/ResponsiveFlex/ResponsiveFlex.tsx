import React from 'react';
import { getCurrentBreakpoint as getCurrent, initMediaQueries } from '../mediaQueries';
import Flex, { FlexAllProps } from '../Flex';
import mergeBreakpointsProps, { BreakpointsProps } from './mergeBreakpointsProps';

export type ResponsiveFlexAllProps = BreakpointsProps<FlexAllProps> & FlexAllProps;

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

import React from 'react';
import {
  initMediaQueries,
  isInitialized as isInited,
  getCurrentBreakpoint as getCurrent,
} from '../mediaQueries';
import { mergeBreakpointsProps, BreakpointsProps } from '../BreakpointsProps';
import Flex, { FlexAllProps } from '../Flex';

export type ResponsiveFlexAllProps = BreakpointsProps<FlexAllProps> & FlexAllProps;

function ResponsiveFlex(props: ResponsiveFlexAllProps): ReturnType<typeof Flex> {
  // Lazy init media queries
  if (!ResponsiveFlex.isInitialized()) {
    ResponsiveFlex.initialize();
  }

  const mergedProps = mergeBreakpointsProps(props);
  return <Flex {...mergedProps} />;
}

ResponsiveFlex.isInitialized = isInited;
ResponsiveFlex.initialize = initMediaQueries;
ResponsiveFlex.getCurrentBreakpoint = getCurrent;

export default ResponsiveFlex;

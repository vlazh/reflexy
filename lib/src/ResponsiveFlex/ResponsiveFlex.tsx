import React from 'react';
import {
  initMediaQueries,
  isInitialized as isInited,
  getCurrentBreakpoint as getCurrent,
} from '../mediaQueries';
import { mergeResponsiveProps, ResponsiveProps } from '../responsive';
import Flex, { FlexAllProps } from '../Flex';

export type ResponsiveFlexAllProps = ResponsiveProps<FlexAllProps> & FlexAllProps;

function ResponsiveFlex(props: ResponsiveFlexAllProps): ReturnType<typeof Flex> {
  // Lazy init media queries
  if (!ResponsiveFlex.isInitialized()) {
    ResponsiveFlex.initialize();
  }

  const mergedProps = mergeResponsiveProps(props);
  return <Flex {...mergedProps} />;
}

ResponsiveFlex.isInitialized = isInited;
ResponsiveFlex.initialize = initMediaQueries;
ResponsiveFlex.getCurrentBreakpoint = getCurrent;

export default ResponsiveFlex;

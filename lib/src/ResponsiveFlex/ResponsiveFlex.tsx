import React from 'react';
import {
  initMediaQueries,
  isInitialized as isInit,
  getCurrentViewSize as getCurrent,
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

ResponsiveFlex.isInitialized = isInit;
ResponsiveFlex.initialize = initMediaQueries;
ResponsiveFlex.getCurrentViewSize = getCurrent;

export default ResponsiveFlex;

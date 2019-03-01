import React from 'react';
import ResponsiveFlex from '../ResponsiveFlex';
import { mergeBreakpointsProps, BreakpointsProps } from '../BreakpointsProps';
import Space, { SpaceAllProps } from '../Space';

export type ResponsiveSpaceAllProps = BreakpointsProps<SpaceAllProps> & SpaceAllProps;

function ResponsiveSpace(props: ResponsiveSpaceAllProps): ReturnType<typeof Space> {
  // Lazy init media queries
  if (!ResponsiveFlex.isInitialized()) {
    ResponsiveFlex.initialize();
  }

  const mergedProps = mergeBreakpointsProps(props);
  return <Space {...mergedProps} />;
}

export default ResponsiveSpace;

import React from 'react';
import Space, { SpaceAllProps } from '../Space';
import mergeBreakpointsProps, { BreakpointsProps } from '../ResponsiveFlex/mergeBreakpointsProps';
import ResponsiveFlex from '../ResponsiveFlex';

export type ResponsiveSpaceAllProps = BreakpointsProps<SpaceAllProps> & SpaceAllProps;

function ResponsiveSpace(props: ResponsiveSpaceAllProps): ReturnType<typeof Space> {
  // Lazy init media queries
  if (!ResponsiveFlex.getCurrentBreakpoint()) {
    ResponsiveFlex.initialize();
  }

  const mergedProps = mergeBreakpointsProps(props);
  return <Space {...mergedProps} />;
}

export default ResponsiveSpace;

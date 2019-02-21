import React from 'react';
import { FlexAllProps } from '../Flex';
import Space, { SpaceProps } from '../Space';
import mergeBreakpointsProps, { BreakpointsProps } from '../ResponsiveFlex/mergeBreakpointsProps';
import ResponsiveFlex from '../ResponsiveFlex';

export type ResponsiveSpaceAllProps = BreakpointsProps<SpaceProps & FlexAllProps> &
  SpaceProps &
  FlexAllProps;

function ResponsiveSpace(props: ResponsiveSpaceAllProps): ReturnType<typeof Space> {
  // Lazy init media queries
  if (!ResponsiveFlex.getCurrentBreakpoint()) {
    ResponsiveFlex.initialize();
  }

  const mergedProps = mergeBreakpointsProps(props);
  return <Space {...mergedProps} />;
}

export default ResponsiveSpace;

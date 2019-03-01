import React from 'react';
import ResponsiveFlex from '../ResponsiveFlex';
import { mergeResponsiveProps, ResponsiveProps } from '../responsive';
import Space, { SpaceAllProps } from '../Space';

export type ResponsiveSpaceAllProps = ResponsiveProps<SpaceAllProps> & SpaceAllProps;

function ResponsiveSpace(props: ResponsiveSpaceAllProps): ReturnType<typeof Space> {
  // Lazy init media queries
  if (!ResponsiveFlex.isInitialized()) {
    ResponsiveFlex.initialize();
  }

  const mergedProps = mergeResponsiveProps(props);
  return <Space {...mergedProps} />;
}

export default ResponsiveSpace;

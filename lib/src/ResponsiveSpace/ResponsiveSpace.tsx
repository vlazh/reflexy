import React from 'react';
import { ComponentOrElement } from '../Flex';
import Space, { SpaceAllProps } from '../Space';
import ResponsiveFlex from '../ResponsiveFlex';
import { mergeResponsiveProps, ResponsiveProps } from '../responsive';

export type ResponsiveSpaceAllProps<
  C extends ComponentOrElement = React.ElementType<JSX.IntrinsicElements['div']>
> = ResponsiveProps<SpaceAllProps<C>> & SpaceAllProps<C>;

function ResponsiveSpace<
  C extends ComponentOrElement = React.ElementType<JSX.IntrinsicElements['div']>
>(props: ResponsiveSpaceAllProps<C>): JSX.Element {
  // Lazy init media queries
  if (!ResponsiveFlex.isInitialized()) {
    ResponsiveFlex.initialize();
  }

  const mergedProps = mergeResponsiveProps(props);
  return <Space {...mergedProps} />;
}

export default ResponsiveSpace;

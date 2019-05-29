import React from 'react';
import {
  initMediaQueries,
  isInitialized as isInit,
  getCurrentViewSize as getCurrent,
} from '../mediaQueries';
import { mergeResponsiveProps, ResponsiveProps } from '../responsive';
import Flex, { FlexAllProps, ComponentOrElement } from '../Flex';

export type ResponsiveFlexAllProps<
  C extends ComponentOrElement = React.ElementType<JSX.IntrinsicElements['div']>
> = ResponsiveProps<FlexAllProps<C>> & FlexAllProps<C>;

function ResponsiveFlex<
  C extends ComponentOrElement = React.ElementType<JSX.IntrinsicElements['div']>
>(props: ResponsiveFlexAllProps<C>): JSX.Element {
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

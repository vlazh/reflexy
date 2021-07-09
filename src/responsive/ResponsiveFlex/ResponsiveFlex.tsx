import React from 'react';
import Flex, { FlexAllProps, DefaultComponentType } from '../../Flex';
import useMediaQuery from '../useMediaQuery';
import { ResponsiveProps, mergeBreakpointProps } from '../Responsive';

export type ResponsiveFlexAllProps<C extends React.ElementType = DefaultComponentType> =
  ResponsiveProps<FlexAllProps<C>> & FlexAllProps<C>;

export default function ResponsiveFlex<C extends React.ElementType = DefaultComponentType>(
  props: ResponsiveFlexAllProps<C>
): JSX.Element {
  const [viewSize] = useMediaQuery();
  // Trick for correct type inference
  const { p, ...mergedProps } = mergeBreakpointProps(viewSize, props);
  return <Flex p={p} {...mergedProps} />;
}

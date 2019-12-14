import React, { useEffect } from 'react';
import Flex, { FlexAllProps, TweakableComponentType, DefaultComponentType } from '../Flex';
import Responsive, { ResponsiveProps, mergeResponsiveProps } from '../Responsive';

export type ResponsiveFlexAllProps<
  C extends TweakableComponentType = DefaultComponentType
> = ResponsiveProps<FlexAllProps<C>> & FlexAllProps<C>;

export default function ResponsiveFlex<C extends TweakableComponentType = DefaultComponentType>(
  props: ResponsiveFlexAllProps<C>
): JSX.Element {
  useEffect(() => {
    // Lazy init media queries
    if (!Responsive.isInitialized()) {
      Responsive.initialize();
    }
  }, []);

  const { children, ...rest } = mergeResponsiveProps(props);
  // `as any` - fix for TS 3.7.3
  return React.createElement(Flex as any, rest, children);
}

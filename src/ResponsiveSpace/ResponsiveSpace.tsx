import React, { useEffect } from 'react';
import { ComponentOrElement, DefaultComponentType } from '../Flex';
import Space, { SpaceAllProps } from '../Space';
import Responsive, { ResponsiveProps, mergeResponsiveProps } from '../Responsive';

export type ResponsiveSpaceAllProps<
  C extends ComponentOrElement = DefaultComponentType
> = ResponsiveProps<SpaceAllProps<C>> & SpaceAllProps<C>;

export default function ResponsiveSpace<C extends ComponentOrElement = DefaultComponentType>(
  props: ResponsiveSpaceAllProps<C>
): JSX.Element {
  useEffect(() => {
    // Lazy init media queries
    if (!Responsive.isInitialized()) {
      Responsive.initialize();
    }
  }, []);

  const mergedProps: any = mergeResponsiveProps(props);
  return <Space {...mergedProps} />;
}

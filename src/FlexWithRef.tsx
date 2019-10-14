import React from 'react';
import Flex, { FlexAllProps, TweakableComponentType, DefaultComponentType } from './Flex';

type RefType<P extends { [P: string]: any }> = 'ref' extends keyof P ? P['ref'] : never;

const FlexWithRef = React.forwardRef(
  (props: FlexAllProps<DefaultComponentType>, ref: React.Ref<any>) => {
    return <Flex {...props} componentRef={ref} />;
  }
) as <C extends TweakableComponentType = DefaultComponentType>(
  props: Omit<FlexAllProps<C>, 'component' | 'componentRef'> & {
    component: C;
    ref?: undefined extends C ? unknown : RefType<React.ComponentPropsWithRef<C>>;
  }
) => JSX.Element;

export default FlexWithRef;

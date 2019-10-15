import React from 'react';
import Flex, { FlexAllProps, TweakableComponentType, DefaultComponentType } from './Flex';

type PropsWithRef<P extends { [P: string]: any }> = P &
  (P extends { componentRef?: any } ? { ref?: P['componentRef'] } : never);

const FlexWithRef = React.forwardRef(
  (props: FlexAllProps<DefaultComponentType>, ref: React.Ref<any>) => {
    return <Flex {...props} componentRef={ref} />;
  }
) as <C extends TweakableComponentType = DefaultComponentType>(
  props: PropsWithRef<FlexAllProps<C> & { component: C }>
) => JSX.Element;

export default FlexWithRef;

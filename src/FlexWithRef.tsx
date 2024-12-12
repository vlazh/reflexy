import React, { useMemo } from 'react';
import '@js-toolkit/utils/types';
import Flex, { type FlexAllProps, type DefaultComponentType } from './Flex';
import type { WithFlexComponent } from './types';
import { buildRefCallback, copyInternalProps } from './utils';

type PropsWithRef<P extends AnyObject> = P &
  (P extends { componentRef?: any } ? { ref?: P['componentRef'] | undefined } : {});

type GetProps<P extends AnyObject> = P extends { componentRef?: any }
  ? Omit<P, 'component'>
  : P extends { ref?: any }
    ? P
    : P & { ref?: never };

export type FlexWithRefProps<C extends React.ElementType> = { component: C } & GetProps<
  FlexAllProps<C>
> &
  WithFlexComponent;

const FlexWithRef = React.forwardRef(
  (
    {
      FlexComponent = Flex,
      componentRef,
      ...rest
    }: FlexAllProps<DefaultComponentType> & WithFlexComponent,
    ref: React.Ref<any>
  ) => {
    const refCallback = useMemo<React.Ref<HTMLDivElement> | undefined>(
      () => (ref && componentRef ? buildRefCallback([ref, componentRef]) : (ref ?? componentRef)),
      [componentRef, ref]
    );

    return <FlexComponent componentRef={refCallback} {...rest} />;
  }
);

FlexWithRef.displayName = 'FlexWithRef';

export default copyInternalProps(
  Flex,
  FlexWithRef as <C extends React.ElementType = DefaultComponentType>(
    props: PropsWithRef<FlexWithRefProps<C>>
  ) => React.JSX.Element
);

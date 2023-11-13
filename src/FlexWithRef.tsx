import React, { useMemo } from 'react';
import Flex, { type FlexAllProps, type DefaultComponentType } from './Flex';
import type { AnyObject, WithFlexComponent } from './types';

type PropsWithRef<P extends AnyObject> = P &
  (P extends { componentRef?: any | undefined } ? { ref?: P['componentRef'] | undefined } : {});

type GetProps<P extends AnyObject> = P extends { componentRef?: any }
  ? Omit<P, 'component'>
  : P extends { ref?: any | undefined }
    ? P
    : P & { ref?: never | undefined };

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
      () =>
        ref && componentRef
          ? (instance) => {
              [ref, componentRef].forEach((r) => {
                if (typeof r === 'function') {
                  r(instance);
                } else if (r) {
                  // eslint-disable-next-line no-param-reassign
                  (r as React.MutableRefObject<any>).current = instance;
                }
              });
            }
          : ref ?? componentRef,
      [componentRef, ref]
    );

    return <FlexComponent componentRef={refCallback} {...rest} />;
  }
) as <C extends React.ElementType = DefaultComponentType>(
  props: PropsWithRef<FlexWithRefProps<C>>
) => JSX.Element;

export default FlexWithRef;

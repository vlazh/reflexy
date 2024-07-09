import React, { useMemo } from 'react';
import '@js-toolkit/utils/types';
import { buildRefCallback } from './utils';

// type PropsWithRef<P extends AnyObject> = P & {
//   ref?: P extends { componentRef?: any } ? P['componentRef'] : unknown;
// };
type PropsWithRef<P extends AnyObject> = P &
  (P extends { componentRef?: any } ? { ref?: P['componentRef'] | undefined } : EmptyObject);

// type ForwardedComponentType<P extends { componentRef?: React.Ref<any> }> =
//   | ((props: P, context?: any) => JSX.Element | null)
//   | (new (props: P, context?: any) => React.Component<P, any>);
type ForwardedComponentType = React.ComponentType<any>;

type GetProps<P extends AnyObject> = P extends { componentRef?: any }
  ? Omit<P, 'component'>
  : // : { error: 'Component should provide `componentRef` prop' };
    EmptyObject;

export type ForwardRefProps<C extends ForwardedComponentType> = { component: C } & GetProps<
  React.ComponentPropsWithoutRef<C>
>;

const ForwardRef = React.forwardRef(
  (props: ForwardRefProps<ForwardedComponentType>, ref: React.Ref<any>) => {
    const { component, componentRef, children, ...componentProps } =
      props as React.PropsWithChildren<
        typeof props & { componentRef?: React.Ref<any> | undefined }
      >;

    const refCallback = useMemo<React.Ref<unknown> | undefined>(
      () => (ref && componentRef ? buildRefCallback([ref, componentRef]) : ref ?? componentRef),
      [componentRef, ref]
    );

    return React.createElement(
      component,
      Object.assign(componentProps, { componentRef: refCallback }),
      children
    );
  }
) as <C extends ForwardedComponentType>(props: PropsWithRef<ForwardRefProps<C>>) => JSX.Element;

export default ForwardRef;

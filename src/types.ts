export type AnyObject = Record<string, any>;

type PropsWithComponentRef<P extends AnyObject> = P extends { ref?: any }
  ? P & { componentRef?: P['ref'] }
  : P;

// Since TS 3.7.3
// Use `Omit` (as copy of object type) to make TweakableComponentProps as object
// and to avoid `Rest types may only be created from object types.ts(2700)` error in Flex props.
export type GetComponentProps<C extends React.ElementType = any> = Omit<
  undefined extends C
    ? Record<never, never>
    : PropsWithComponentRef<React.ComponentPropsWithRef<C>>,
  'ref' | 'component' /* if `C` is Flexed component and already contains `component` prop */
>;

export type TweakableComponentProps<C extends React.ElementType = any> = {
  /**
   * Sets custom react component as a container.
   * Component must accept className and style through props. */
  component?: C;
} & GetComponentProps<C>;

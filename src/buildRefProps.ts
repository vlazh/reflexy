import { isRefSupported } from './isRefSupported';

export function buildRefProps(
  Component: React.ElementType,
  componentRefProp: unknown
): { ref: unknown } | { componentRef: unknown } | undefined {
  if (componentRefProp) {
    if (isRefSupported(Component)) return { ref: componentRefProp };
    return { componentRef: componentRefProp };
    // Component might use `componentRef` prop for nested components so is no way to granular check
    // whether Component is Flex.
    // if (isFlex(Component)) return { componentRef: componentRefProp };
    // const componentString =
    //   typeof Component === 'object' ? JSON.stringify(Component) : String(Component);
    // console.warn(`Component '${componentString}' doesn't support 'ref'/'componentRef' prop.`);
  }
  return undefined;
}

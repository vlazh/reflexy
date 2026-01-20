import { useMediaQuery } from '@js-toolkit/react-hooks/useMediaQuery';
import Flex, { type FlexAllProps, type DefaultComponentType } from '../Flex';
import { copyInternalProps } from '../copyInternalProps';
import { type ResponsiveProps, mergeBreakpointProps } from './Responsive';

export type ResponsiveFlexAllProps<C extends React.ElementType = DefaultComponentType> =
  ResponsiveProps<FlexAllProps<C>> & FlexAllProps<C>;

function ResponsiveFlex<C extends React.ElementType = DefaultComponentType>(
  props: ResponsiveFlexAllProps<C>
): React.JSX.Element {
  const [viewSize] = useMediaQuery();
  // Trick for correct type inference
  const { p, ...mergedProps } = mergeBreakpointProps(
    viewSize,
    props as ResponsiveProps<FlexAllProps<C>> & FlexAllProps<C>
  );
  return <Flex p={p} {...mergedProps} />;
}

export default copyInternalProps(Flex, ResponsiveFlex);

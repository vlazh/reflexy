import React from 'react';
import styled from '@mui/system/styled';
import type { MUIStyledCommonProps } from '@mui/system/createStyled';
import type { DefaultComponentType, FlexAllProps } from '../../Flex/Flex';
import { toCssValue } from '../../Flex/utils';
import { buildRefProps, getSpaceSizeMultiplier } from '../../utils';
import useFlexDefaults from '../useFlexDefaults';
import { getFillValue, getOverflowValue } from './utils';

type FlexComponent = <C extends React.ElementType = DefaultComponentType>(
  props: FlexAllProps<C>
) => JSX.Element;

const FlexRoot = styled<FlexComponent>(
  (props): JSX.Element => {
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      flex,
      inline,
      row,
      column,
      reverse,
      wrap,
      center,
      alignItems,
      justifyContent,
      alignSelf,
      alignContent,
      basis,
      grow,
      shrink,
      order,
      fill,
      hfill,
      vfill,
      shrinkByContent,
      shrinkWidth,
      shrinkHeight,
      unit,
      mSize,
      mUnit,
      m,
      mx,
      my,
      mt,
      mb,
      mr,
      ml,
      pSize,
      pUnit,
      p,
      px,
      py,
      pt,
      pb,
      pr,
      pl,
      overflow,
      overflowX,
      overflowY,
      scrollable,
      scrollableX,
      scrollableY,
      // className,
      // style,
      classNameTransformer,
      styleTransformer,
      /* eslint-enable */

      component = 'div',
      componentRef,
      children,

      ...componentProps
    } = props as React.PropsWithChildren<
      typeof props & { componentRef?: React.Ref<any> | undefined }
    >;

    return React.createElement(
      component,
      Object.assign(componentProps, buildRefProps(component, componentRef)),
      children
    );
  },
  {
    skipSx: false,
    skipVariantsResolver: true,
  }
)(
  // ({ flex, inline, shrinkHeight, shrinkWidth }: FlexAllProps) => {
  //   return {
  //     ...(flex == null && { display: inline ? 'inline-flex' : 'flex' }),
  //     ...(shrinkHeight == null && { minHeight: 0 }),
  //     ...(shrinkWidth == null && { minWidth: 0 }),
  //   };
  // },

  (props: FlexAllProps) => {
    const { defaultUnit, defaultSize, defaultSizes } = useFlexDefaults();

    const {
      flex /*  = true */,
      inline,
      row,
      column,
      reverse,
      wrap,
      center,
      alignItems = center ? 'center' : undefined,
      justifyContent = center ? 'center' : undefined,
      alignSelf,
      alignContent,
      basis,
      grow,
      shrink,
      order,
      fill,
      hfill = fill,
      vfill = fill,
      shrinkByContent = flex,
      shrinkWidth = shrinkByContent,
      shrinkHeight = shrinkByContent,
      unit = defaultUnit,
      mSize = defaultSize,
      mUnit = unit,
      m,
      mx = m,
      my = m,
      mt = my,
      mb = my,
      mr = mx,
      ml = mx,
      pSize = defaultSize,
      pUnit = unit,
      p,
      px = p,
      py = p,
      pt = py,
      pb = py,
      pr = px,
      pl = px,
      overflow,
      overflowX = overflow,
      overflowY = overflow,
      scrollable,
      scrollableX = scrollable,
      scrollableY = scrollable,
    } = props;

    const resetValue = null;

    return {
      // Separate styles for correct priority in order to use with theming overrides or component overrides

      // ...(flex == null || flex && { display: inline ? 'inline-flex' : 'flex' }),
      ...(shrinkHeight == null && { minHeight: 0 }),
      ...(shrinkWidth == null && { minWidth: 0 }),

      // higher specificity to override component styles
      '&': {
        // eslint-disable-next-line no-nested-ternary
        display: flex == null || flex ? (inline ? 'inline-flex' : 'flex') : resetValue,
        flexDirection: reverse
          ? (column && 'column-reverse') || 'row-reverse'
          : (column && 'column') || (row && 'row') || resetValue,
        // eslint-disable-next-line no-nested-ternary
        flexWrap: wrap === true ? 'wrap' : wrap === false ? 'nowrap' : wrap || resetValue,
        flexBasis: basis ?? resetValue,
        flexGrow: grow != null ? +grow : resetValue,
        flexShrink: shrink != null ? +shrink : resetValue,
        order: order ?? resetValue,
        alignItems: alignItems ?? resetValue,
        justifyContent: justifyContent ?? resetValue,
        alignSelf: alignSelf ?? resetValue,
        alignContent: alignContent ?? resetValue,

        minHeight: shrinkHeight ? 0 : resetValue,
        minWidth: shrinkWidth ? 0 : resetValue,
        height: getFillValue(vfill) ?? resetValue,
        width: getFillValue(hfill) ?? resetValue,

        overflowX: getOverflowValue(overflowX, scrollableX) ?? resetValue,
        overflowY: getOverflowValue(overflowY, scrollableY) ?? resetValue,

        marginTop:
          mt != null
            ? toCssValue(mt, defaultSizes, getSpaceSizeMultiplier(mSize, defaultSizes), mUnit)
            : resetValue,
        marginRight:
          mr != null
            ? toCssValue(mr, defaultSizes, getSpaceSizeMultiplier(mSize, defaultSizes), mUnit)
            : resetValue,
        marginBottom:
          mb != null
            ? toCssValue(mb, defaultSizes, getSpaceSizeMultiplier(mSize, defaultSizes), mUnit)
            : resetValue,
        marginLeft:
          ml != null
            ? toCssValue(ml, defaultSizes, getSpaceSizeMultiplier(mSize, defaultSizes), mUnit)
            : resetValue,

        paddingTop:
          pt != null
            ? toCssValue(pt, defaultSizes, getSpaceSizeMultiplier(pSize, defaultSizes), pUnit)
            : resetValue,
        paddingRight:
          pr != null
            ? toCssValue(pr, defaultSizes, getSpaceSizeMultiplier(pSize, defaultSizes), pUnit)
            : resetValue,
        paddingBottom:
          pb != null
            ? toCssValue(pb, defaultSizes, getSpaceSizeMultiplier(pSize, defaultSizes), pUnit)
            : resetValue,
        paddingLeft:
          pl != null
            ? toCssValue(pl, defaultSizes, getSpaceSizeMultiplier(pSize, defaultSizes), pUnit)
            : resetValue,
      },
    };
  }
);

/**
 * Flexbox container.
 * Default style is just `display: flex;`.
 * Example: `<Flex component="button" ... />`
 * Example: `<Flex component={MyComponent} ... />`
 */
function Flex<C extends React.ElementType = DefaultComponentType>(
  props: FlexAllProps<C, { inferStyleProps: true }> & Pick<MUIStyledCommonProps, 'theme' | 'sx'>
): JSX.Element {
  return <FlexRoot {...props} />;
}

Flex.reflexy = true;

export default Flex;

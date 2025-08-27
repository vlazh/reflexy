'use client';

import React from 'react';
import styled from '@mui/system/styled';
import type { MUIStyledCommonProps } from '@mui/system/createStyled';
import type { DefaultComponentType, FlexAllProps } from '../../Flex';
import { REFLEXY_KEY, getSpaceSizeMultiplier, getSpace, spaceToCssValue } from '../../utils';
import useFlexDefaults from '../useFlexDefaults';
import { getFillValue, getOverflowValue } from './utils';

const FlexRoot = styled(
  (props: FlexAllProps<React.ElementType>) => {
    const {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      display,
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
      children,

      ...componentProps
    } = props as React.PropsWithChildren<typeof props>;

    return React.createElement(component, componentProps, children);
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
      display /* = 'flex' */,
      flex /* = true */,
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

    const marginSize = getSpaceSizeMultiplier(mSize, defaultSizes);
    const paddingSize = getSpaceSizeMultiplier(pSize, defaultSizes);

    const resetValue = null;

    return {
      // Separate styles for correct priority in order to use with theming overrides or component overrides

      // ...(flex == null || flex && { display: inline ? 'inline-flex' : 'flex' }),
      ...(shrinkHeight == null && { minHeight: 0 }),
      ...(shrinkWidth == null && { minWidth: 0 }),

      // higher specificity to override component styles
      '&': {
        // eslint-disable-next-line no-nested-ternary
        display: display || (flex == null || flex ? (inline ? 'inline-flex' : 'flex') : resetValue),
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
          mt != null ? spaceToCssValue(getSpace(mt, marginSize), defaultSizes, mUnit) : resetValue,
        marginRight:
          mr != null ? spaceToCssValue(getSpace(mr, marginSize), defaultSizes, mUnit) : resetValue,
        marginBottom:
          mb != null ? spaceToCssValue(getSpace(mb, marginSize), defaultSizes, mUnit) : resetValue,
        marginLeft:
          ml != null ? spaceToCssValue(getSpace(ml, marginSize), defaultSizes, mUnit) : resetValue,

        paddingTop:
          pt != null ? spaceToCssValue(getSpace(pt, paddingSize), defaultSizes, pUnit) : resetValue,
        paddingRight:
          pr != null ? spaceToCssValue(getSpace(pr, paddingSize), defaultSizes, pUnit) : resetValue,
        paddingBottom:
          pb != null ? spaceToCssValue(getSpace(pb, paddingSize), defaultSizes, pUnit) : resetValue,
        paddingLeft:
          pl != null ? spaceToCssValue(getSpace(pl, paddingSize), defaultSizes, pUnit) : resetValue,
      },
    };
  }
) as <C extends React.ElementType = DefaultComponentType>(
  props: FlexAllProps<C, { inferStyleProps: true }>
) => React.JSX.Element;

/**
 * Flexbox container.
 * Default style is just `display: flex;`.
 * Example: `<Flex component="button" ... />`
 * Example: `<Flex component={MyComponent} ... />`
 */
function Flex<C extends React.ElementType = DefaultComponentType>(
  props: FlexAllProps<C, { inferStyleProps: true }> & Pick<MUIStyledCommonProps, 'theme' | 'sx'>
): React.JSX.Element {
  return <FlexRoot {...props} />;
}

Flex[REFLEXY_KEY] = true;

export default Flex;

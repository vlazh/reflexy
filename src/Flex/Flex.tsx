import React, { createElement, use, useMemo } from 'react';
import '@js-toolkit/utils/types';
import { FlexContext } from '../FlexProvider';
import {
  defaultClassNameTransformer,
  defaultStyleTransformer,
  getSpaceSizeMultiplier,
  REFLEXY_KEY,
} from '../utils';
import props2className from './props2className';
import props2style from './props2style';
import type {
  ClassNameTransformer,
  DefaultComponentType,
  FlexAllProps,
  StyleTransformer,
} from './types';

/**
 * Flexbox container.
 * Default style is just `display: flex;`.
 * Example: `<Flex component="button" ... />`
 * Example: `<Flex component={MyComponent} ... />`
 */
function Flex<C extends React.ElementType = DefaultComponentType>(
  props: FlexAllProps<C, { inferStyleProps: true }>
): React.JSX.Element {
  const { defaultUnit, defaultSize, defaultSizes } = use(FlexContext);

  const {
    component = 'div',
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
    vfill = fill,
    hfill = fill,

    shrinkByContent = (display == null && flex) ||
      (display == null && flex == null) ||
      display === 'flex' ||
      display === 'inline-flex',
    shrinkHeight = shrinkByContent,
    shrinkWidth = shrinkByContent,

    unit = defaultUnit,
    mSize = defaultSize,
    mUnit = unit,
    m,
    mx = m,
    my = m,
    mt = my,
    mr = mx,
    mb = my,
    ml = mx,
    pSize = defaultSize,
    pUnit = unit,
    p,
    px = p,
    py = p,
    pt = py,
    pr = px,
    pb = py,
    pl = px,
    gapSize: gSize = defaultSize,
    gapUnit = unit,
    gap,
    columnGap,
    rowGap,

    scrollable,
    scrollableX = scrollable,
    scrollableY = scrollable,
    overflow,
    overflowX = overflow,
    overflowY = overflow,

    className,
    style,
    classNameTransformer = defaultClassNameTransformer as ClassNameTransformer<typeof className>,
    styleTransformer = defaultStyleTransformer as StyleTransformer<typeof style>,

    children,
    ...rest
  } = props as React.PropsWithChildren<FlexAllProps<any, { inferStyleProps: true }>>;

  const calcClassName = useMemo(
    () =>
      props2className({
        display,
        flex,
        inline,
        row,
        column,
        reverse,
        wrap,
        alignContent,
        alignItems,
        alignSelf,
        justifyContent,
        basis,
        grow,
        shrink,
        hfill,
        vfill,
        shrinkWidth,
        shrinkHeight,
        overflowX,
        overflowY,
        scrollableX,
        scrollableY,
      }),
    [
      display,
      flex,
      inline,
      row,
      column,
      reverse,
      wrap,
      alignContent,
      alignItems,
      alignSelf,
      justifyContent,
      basis,
      grow,
      shrink,
      hfill,
      vfill,
      shrinkWidth,
      shrinkHeight,
      overflowX,
      overflowY,
      scrollableX,
      scrollableY,
    ]
  );

  const marginSize = getSpaceSizeMultiplier(mSize, defaultSizes);
  const paddingSize = getSpaceSizeMultiplier(pSize, defaultSizes);
  const gapSize = getSpaceSizeMultiplier(gSize, defaultSizes);

  const calcStyles = useMemo(
    () =>
      props2style(
        {
          basis,
          order,
          grow,
          shrink,
          hfill,
          vfill,
          mSize: marginSize,
          mUnit,
          mb,
          ml,
          mr,
          mt,
          pSize: paddingSize,
          pUnit,
          pb,
          pl,
          pr,
          pt,
          gapSize,
          gapUnit,
          gap,
          columnGap,
          rowGap,
        },
        defaultSizes
      ),
    [
      basis,
      order,
      grow,
      shrink,
      hfill,
      vfill,
      marginSize,
      mUnit,
      mb,
      ml,
      mr,
      mt,
      paddingSize,
      pUnit,
      pb,
      pl,
      pr,
      pt,
      gapSize,
      gapUnit,
      gap,
      columnGap,
      rowGap,
      defaultSizes,
    ]
  );

  return createElement(
    component as C,
    Object.assign(rest, {
      className: (classNameTransformer as ClassNameTransformer<string>)(
        calcClassName,
        className as string
      ),
      style: (styleTransformer as StyleTransformer<React.CSSProperties>)(
        calcStyles,
        style as React.CSSProperties
      ),
    }),
    children
  );
}

Flex[REFLEXY_KEY] = true;

export default Flex;

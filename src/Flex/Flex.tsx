import React from 'react';
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
  const { defaultUnit, defaultSize, defaultSizes } = React.use(FlexContext);

  const {
    component = 'div',
    flex = true,
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

    shrinkByContent = flex,
    shrinkHeight = shrinkByContent,
    shrinkWidth = shrinkByContent,

    unit = defaultUnit,
    mSize = defaultSize,
    mUnit = unit,
    m,
    mx,
    my,
    mt = my,
    mr = mx,
    mb = my,
    ml = mx,
    pSize = defaultSize,
    pUnit = unit,
    p,
    px,
    py,
    pt = py,
    pr = px,
    pb = py,
    pl = px,

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

  const calcClassName = React.useMemo(
    () =>
      props2className({
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

  const calcStyles = React.useMemo(
    () =>
      props2style(
        {
          order,
          grow,
          shrink,
          hfill,
          vfill,
          mSize: marginSize,
          mUnit,
          m,
          mb,
          ml,
          mr,
          mt,
          pSize: paddingSize,
          pUnit,
          p,
          pb,
          pl,
          pr,
          pt,
        },
        defaultSizes
      ),
    [
      defaultSizes,
      grow,
      hfill,
      m,
      mUnit,
      marginSize,
      mb,
      ml,
      mr,
      mt,
      order,
      p,
      pUnit,
      paddingSize,
      pb,
      pl,
      pr,
      pt,
      shrink,
      vfill,
    ]
  );

  return React.createElement(
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

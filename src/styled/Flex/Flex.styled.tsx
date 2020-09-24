/* eslint-disable no-nested-ternary */
import React from 'react';
import styled from '@material-ui/styles/styled';
import type {
  DefaultComponentType,
  FlexAllProps,
  Styleable,
  ClassNameTransformer,
  StyleTransformer,
  SpaceSize,
  OverflowProps,
  FlexProps,
  SpaceProps,
  SpaceUnit,
} from '../../Flex/Flex';
import { toCssValue, defaultClassNameTransformer, defaultStyleTransformer } from '../../Flex/utils';

const getFillValue = (propValue: FlexProps['vfill']): string | undefined => {
  return typeof propValue === 'number'
    ? `${Math.min(+propValue, 1) * 100}%`
    : (propValue && '100%') || undefined;
};

const getScrollableValue = (
  scrollableValue: OverflowProps['scrollable']
): OverflowProps['overflow'] => {
  return typeof scrollableValue === 'string'
    ? scrollableValue
    : (scrollableValue === true && 'auto') || (scrollableValue === false && 'hidden') || undefined;
};

const getOverflowValue = (
  overflowValue: OverflowProps['overflow'],
  scrollableValue: OverflowProps['scrollable']
): OverflowProps['overflow'] => {
  return overflowValue ?? getScrollableValue(scrollableValue);
};

const getSpaceSize = (
  size: NonNullable<SpaceProps['mSize']>,
  defaultSizes: Record<SpaceSize, number>
): number => {
  return typeof size === 'number' ? size : defaultSizes[size];
};

export interface Theme {
  reflexy?: {
    defaultUnit?: SpaceUnit;
    defaultSizes?: Record<SpaceSize, number>;
  };
}

/**
 * Flexbox container.
 * Default style is just `display: flex;`.
 * Example: `<Flex component="button" ... />`
 * Example: `<Flex component={MyComponent} ... />`
 */
function Flex<C extends React.ElementType = DefaultComponentType>({
  component = 'div' as C,
  className,
  style,
  classNameTransformer = defaultClassNameTransformer as any,
  styleTransformer = defaultStyleTransformer as any,
  ...rest
}: FlexAllProps<C>): JSX.Element {
  // const css = useStyles(rest);

  // Exclude flex props
  const {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    inline,
    row,
    column,
    reverse,
    wrap,
    alignContent,
    alignItems,
    alignSelf,
    justifyContent,
    center,
    basis,
    grow,
    shrink,
    order,
    hfill,
    vfill,
    fill,
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
    mr,
    mb,
    ml,
    pSize,
    pUnit,
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    overflow,
    overflowX,
    overflowY,
    scrollable,
    scrollableX,
    scrollableY,
    /* eslint-enable */
    componentRef,
    children,
    ...customComponentProps
  } = rest as React.PropsWithChildren<typeof rest & { componentRef?: any }>;

  return React.createElement(
    component as React.ElementType<React.PropsWithChildren<Styleable<any, any>>>,
    {
      ...customComponentProps,
      className: (classNameTransformer as ClassNameTransformer<typeof className>)(
        // css.root,
        '',
        className
      ),
      style: (styleTransformer as StyleTransformer<typeof style>)(undefined, style),
      ref: componentRef,
    },
    children
  );
}

/** Default measure of space */
Flex.defaultUnit = 'rem' as SpaceUnit;

/** Predefined default space sizes */
Flex.defaultSizes = {
  xs: 0.25,
  s: 0.5,
  m: 1,
  l: 1.5,
  xl: 2,
  xxl: 2.5,
} as Record<SpaceSize, number>;

export default styled(Flex)<Theme>(
  ({
    theme,

    inline,
    column,
    row,
    reverse,
    wrap,
    basis,
    grow,
    shrink,
    order,
    center,
    alignItems = center ? 'center' : undefined,
    justifyContent = center ? 'center' : undefined,
    alignSelf,
    alignContent,

    shrinkByContent = true,
    shrinkHeight = shrinkByContent,
    shrinkWidth = shrinkByContent,

    fill,
    vfill = fill,
    hfill = fill,

    scrollable,
    scrollableX = scrollable,
    scrollableY = scrollable,
    overflow,
    overflowX = overflow,
    overflowY = overflow,

    unit = theme.reflexy?.defaultUnit ?? Flex.defaultUnit,
    mSize = 'm',
    mUnit = unit,
    m,
    mx,
    my,
    mt = my,
    mr = mx,
    mb = my,
    ml = mx,
    pSize = 'm',
    pUnit = unit,
    p,
    px,
    py,
    pt = py,
    pr = px,
    pb = py,
    pl = px,
  }) => {
    const defaultSizes = theme.reflexy?.defaultSizes ?? Flex.defaultSizes;

    return {
      display: inline ? 'inline-flex' : 'flex',
      flexDirection: reverse
        ? (column && 'column-reverse') || 'row-reverse'
        : (column && 'column') || (row && 'row') || undefined,
      flexWrap: wrap === true ? 'wrap' : wrap === false ? 'nowrap' : wrap,
      flexBasis: basis,
      flexGrow: grow != null ? +grow : undefined,
      flexShrink: shrink != null ? +shrink : undefined,
      order,
      alignItems,
      justifyContent,
      alignSelf,
      alignContent,

      minHeight: shrinkHeight ? 0 : undefined,
      minWidth: shrinkWidth ? 0 : undefined,
      height: getFillValue(vfill),
      width: getFillValue(hfill),

      overflowX: getOverflowValue(overflowX, scrollableX),
      overflowY: getOverflowValue(overflowY, scrollableY),

      // for strengthen
      '&&': {
        margin:
          m != null
            ? toCssValue(m, defaultSizes, getSpaceSize(mSize, defaultSizes), mUnit)
            : undefined,
        marginTop:
          mt != null
            ? toCssValue(mt, defaultSizes, getSpaceSize(mSize, defaultSizes), mUnit)
            : undefined,
        marginRight:
          mr != null
            ? toCssValue(mr, defaultSizes, getSpaceSize(mSize, defaultSizes), mUnit)
            : undefined,
        marginBottom:
          mb != null
            ? toCssValue(mb, defaultSizes, getSpaceSize(mSize, defaultSizes), mUnit)
            : undefined,
        marginLeft:
          ml != null
            ? toCssValue(ml, defaultSizes, getSpaceSize(mSize, defaultSizes), mUnit)
            : undefined,

        padding:
          p != null
            ? toCssValue(p, defaultSizes, getSpaceSize(pSize, defaultSizes), pUnit)
            : undefined,
        paddingTop:
          pt != null
            ? toCssValue(pt, defaultSizes, getSpaceSize(pSize, defaultSizes), pUnit)
            : undefined,
        paddingRight:
          pr != null
            ? toCssValue(pr, defaultSizes, getSpaceSize(pSize, defaultSizes), pUnit)
            : undefined,
        paddingBottom:
          pb != null
            ? toCssValue(pb, defaultSizes, getSpaceSize(pSize, defaultSizes), pUnit)
            : undefined,
        paddingLeft:
          pl != null
            ? toCssValue(pl, defaultSizes, getSpaceSize(pSize, defaultSizes), pUnit)
            : undefined,
      },
    };
  }
);

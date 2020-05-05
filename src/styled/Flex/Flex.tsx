/* eslint-disable no-nested-ternary */
import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import type {
  DefaultComponentType,
  FlexAllProps,
  Styleable,
  ClassNameTransformer,
  StyleTransformer,
  DefaultSpaceSize,
  OverflowProps,
  FlexProps,
  SpaceProps,
} from '../../Flex/Flex';
import { toCssValue, defaultClassNameTransformer, defaultStyleTransformer } from '../../Flex/utils';

const getFillValue = (
  propValue: number | boolean | undefined,
  fallback: boolean | undefined
): string | undefined => {
  const fill =
    typeof propValue === 'number'
      ? `${Math.min(+propValue, 1) * 100}%`
      : propValue ?? fallback
      ? '100%'
      : undefined;
  return fill;
};

const getScrollableValue = (
  scrollableValue: OverflowProps['scrollable'],
  scrollableFallback: OverflowProps['scrollable']
): OverflowProps['overflow'] => {
  return ((scrollableValue === true && 'auto') ||
    (scrollableValue === false && 'hidden') ||
    (scrollableValue == null
      ? (scrollableFallback === true && 'auto') ||
        (scrollableFallback === false && 'hidden') ||
        scrollableFallback
      : scrollableValue)) as OverflowProps['overflow'];
};

const getOverflowValue = (
  overflowValue: OverflowProps['overflow'],
  overflowFallback: OverflowProps['overflow'],
  scrollableValue: OverflowProps['scrollable'],
  scrollableFallback: OverflowProps['scrollable']
): OverflowProps['overflow'] => {
  return overflowValue == null
    ? getScrollableValue(scrollableValue, scrollableFallback) ??
        overflowFallback ??
        getScrollableValue(scrollableFallback, undefined)
    : overflowValue;
};

const getSpaceSize = (
  size: NonNullable<SpaceProps['mSize']>,
  defaultSizes: Record<DefaultSpaceSize, number>
): number => {
  return typeof size === 'number' ? size : defaultSizes[size];
};

export interface Theme {
  reflexy?: {
    defaultUnit?: string;
    defaultSizes?: Record<DefaultSpaceSize, number>;
  };
}

const useStyles = makeStyles((theme: Theme) => {
  const defaultSizes = theme.reflexy?.defaultSizes ?? Flex.defaultSizes;
  const defaultUnit = theme.reflexy?.defaultUnit ?? Flex.defaultUnit;

  return {
    root: {
      display: ({ inline }: FlexProps) => (inline ? 'inline-flex' : 'flex'),
      flexDirection: ({ column, row, reverse }: FlexProps) => {
        if (reverse) return (column && 'column-reverse') || 'row-reverse';
        return (column && 'column') || (row && 'row') || undefined;
      },
      flexWrap: ({ wrap }: FlexProps) =>
        wrap === true ? 'wrap' : wrap === false ? 'nowrap' : wrap,
      flexBasis: ({ basis }: FlexProps) => basis,
      flexGrow: ({ grow }: FlexProps) => (grow != null ? +grow : undefined),
      flexShrink: ({ shrink }: FlexProps) => (shrink != null ? +shrink : undefined),
      order: ({ order }: FlexProps) => order,
      alignItems: ({ alignItems, center }: FlexProps) =>
        alignItems || (center ? 'center' : undefined),
      justifyContent: ({ justifyContent, center }: FlexProps) =>
        justifyContent || (center ? 'center' : undefined),
      alignSelf: ({ alignSelf }: FlexProps) => alignSelf,
      alignContent: ({ alignContent }: FlexProps) => alignContent,

      minHeight: ({ shrinkByContent = true, shrinkHeight }: FlexProps) =>
        shrinkHeight ?? shrinkByContent ? 0 : undefined,
      minWidth: ({ shrinkByContent = true, shrinkWidth }: FlexProps) =>
        shrinkWidth ?? shrinkByContent ? 0 : undefined,
      height: ({ vfill, fill }: FlexProps) => getFillValue(vfill, fill),
      width: ({ hfill, fill }: FlexProps) => getFillValue(hfill, fill),

      overflowX: ({ overflowX, overflow, scrollableX, scrollable }: OverflowProps) =>
        getOverflowValue(overflowX, overflow, scrollableX, scrollable),
      overflowY: ({ overflowY, overflow, scrollableY, scrollable }: OverflowProps) =>
        getOverflowValue(overflowY, overflow, scrollableY, scrollable),

      margin: ({ m, mSize = 'm', unit = defaultUnit }: SpaceProps) =>
        m != null
          ? toCssValue(m, defaultSizes, getSpaceSize(mSize, defaultSizes), unit)
          : undefined,
      marginTop: ({ my, mt = my, mSize = 'm', unit = defaultUnit }: SpaceProps) =>
        mt != null
          ? toCssValue(mt, defaultSizes, getSpaceSize(mSize, defaultSizes), unit)
          : undefined,
      marginRight: ({ mx, mr = mx, mSize = 'm', unit = defaultUnit }: SpaceProps) =>
        mr != null
          ? toCssValue(mr, defaultSizes, getSpaceSize(mSize, defaultSizes), unit)
          : undefined,
      marginBottom: ({ my, mb = my, mSize = 'm', unit = defaultUnit }: SpaceProps) =>
        mb != null
          ? toCssValue(mb, defaultSizes, getSpaceSize(mSize, defaultSizes), unit)
          : undefined,
      marginLeft: ({ mx, ml = mx, mSize = 'm', unit = defaultUnit }: SpaceProps) =>
        ml != null
          ? toCssValue(ml, defaultSizes, getSpaceSize(mSize, defaultSizes), unit)
          : undefined,

      padding: ({ p, pSize = 'm', unit = defaultUnit }: SpaceProps) =>
        p != null
          ? toCssValue(p, defaultSizes, getSpaceSize(pSize, defaultSizes), unit)
          : undefined,
      paddingTop: ({ py, pt = py, pSize = 'm', unit = defaultUnit }: SpaceProps) =>
        pt != null
          ? toCssValue(pt, defaultSizes, getSpaceSize(pSize, defaultSizes), unit)
          : undefined,
      paddingRight: ({ px, pr = px, pSize = 'm', unit = defaultUnit }: SpaceProps) =>
        pr != null
          ? toCssValue(pr, defaultSizes, getSpaceSize(pSize, defaultSizes), unit)
          : undefined,
      paddingBottom: ({ py, pb = py, pSize = 'm', unit = defaultUnit }: SpaceProps) =>
        pb != null
          ? toCssValue(pb, defaultSizes, getSpaceSize(pSize, defaultSizes), unit)
          : undefined,
      paddingLeft: ({ px, pl = px, pSize = 'm', unit = defaultUnit }: SpaceProps) =>
        pl != null
          ? toCssValue(pl, defaultSizes, getSpaceSize(pSize, defaultSizes), unit)
          : undefined,
    },
  };
});

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
  const css = useStyles(rest);

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
    mSize,
    m,
    mx,
    my,
    mt,
    mr,
    mb,
    ml,
    pSize,
    p,
    px,
    py,
    pt,
    pr,
    pb,
    pl,
    unit,
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
        css.root,
        className
      ),
      style: (styleTransformer as StyleTransformer<typeof style>)(undefined, style),
      ref: componentRef,
    },
    children
  );
}

/** Default measure of space */
Flex.defaultUnit = 'rem';

/** Predefined default space sizes */
Flex.defaultSizes = {
  xs: 0.25,
  s: 0.5,
  m: 1,
  l: 1.5,
  xl: 2,
  xxl: 2.5,
} as Record<DefaultSpaceSize, number>;

export default Flex;

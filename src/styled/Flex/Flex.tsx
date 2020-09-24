/* eslint-disable no-nested-ternary */
import React from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
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
  FlexComponentProps,
} from '../../Flex/Flex';
import { toCssValue, defaultClassNameTransformer, defaultStyleTransformer } from '../../Flex/utils';
import isHasRef from '../../isHasRef';
import sharedDefaults from '../../sharedDefaults';

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

const getSpaceSizeMultiplier = (
  size: NonNullable<SpaceProps['mSize']>,
  sizeMultipliers: Record<SpaceSize, number>
): number => {
  return typeof size === 'number' ? size : sizeMultipliers[size];
};

export interface Theme {
  reflexy?: {
    defaultUnit?: SpaceUnit;
    defaultSizes?: Record<SpaceSize, number>;
  };
}

const useStyles = makeStyles((theme: Theme) => {
  const defaultSizes = theme.reflexy?.defaultSizes ?? sharedDefaults.defaultSizes;
  const defaultUnit = theme.reflexy?.defaultUnit ?? sharedDefaults.defaultUnit;

  return {
    // Use `Function values` instead of `Function rules` because of dublication classes if present nested rules.
    // https://codesandbox.io/s/material-demo-forked-btfjn?file=/demo.js
    root: {
      display: ({ inline }: FlexComponentProps) => (inline ? 'inline-flex' : 'flex'),
      flexDirection: ({ reverse, row, column }: FlexComponentProps) =>
        reverse
          ? (column && 'column-reverse') || 'row-reverse'
          : (column && 'column') || (row && 'row') || undefined,
      flexWrap: ({ wrap }: FlexComponentProps) =>
        wrap === true ? 'wrap' : wrap === false ? 'nowrap' : wrap,
      flexBasis: ({ basis }: FlexComponentProps) => basis,
      flexGrow: ({ grow }: FlexComponentProps) => (grow != null ? +grow : undefined),
      flexShrink: ({ shrink }: FlexComponentProps) => (shrink != null ? +shrink : undefined),
      order: ({ order }: FlexComponentProps) => order,
      alignItems: ({ center, alignItems = center ? 'center' : undefined }: FlexComponentProps) =>
        alignItems,
      justifyContent: ({
        center,
        justifyContent = center ? 'center' : undefined,
      }: FlexComponentProps) => justifyContent,
      alignSelf: ({ alignSelf }: FlexComponentProps) => alignSelf,
      alignContent: ({ alignContent }: FlexComponentProps) => alignContent,

      minHeight: ({ shrinkByContent = true, shrinkHeight = shrinkByContent }: FlexComponentProps) =>
        shrinkHeight ? 0 : undefined,
      minWidth: ({ shrinkByContent = true, shrinkWidth = shrinkByContent }: FlexComponentProps) =>
        shrinkWidth ? 0 : undefined,
      height: ({ fill, vfill = fill }: FlexComponentProps) => getFillValue(vfill),
      width: ({ fill, hfill = fill }: FlexComponentProps) => getFillValue(hfill),

      overflowX: ({
        overflow,
        scrollable,
        overflowX = overflow,
        scrollableX = scrollable,
      }: FlexComponentProps) => getOverflowValue(overflowX, scrollableX),
      overflowY: ({
        overflow,
        scrollable,
        overflowY = overflow,
        scrollableY = scrollable,
      }: FlexComponentProps) => getOverflowValue(overflowY, scrollableY),

      // for strengthen
      '&&': {
        margin: ({ unit = defaultUnit, mSize = 'm', mUnit = unit, m }: FlexComponentProps) =>
          m != null
            ? toCssValue(m, defaultSizes, getSpaceSizeMultiplier(mSize, defaultSizes), mUnit)
            : undefined,
        marginTop: ({
          unit = defaultUnit,
          mSize = 'm',
          mUnit = unit,
          my,
          mt = my,
        }: FlexComponentProps) =>
          mt != null
            ? toCssValue(mt, defaultSizes, getSpaceSizeMultiplier(mSize, defaultSizes), mUnit)
            : undefined,
        marginRight: ({
          unit = defaultUnit,
          mSize = 'm',
          mUnit = unit,
          mx,
          mr = mx,
        }: FlexComponentProps) =>
          mr != null
            ? toCssValue(mr, defaultSizes, getSpaceSizeMultiplier(mSize, defaultSizes), mUnit)
            : undefined,
        marginBottom: ({
          unit = defaultUnit,
          mSize = 'm',
          mUnit = unit,
          my,
          mb = my,
        }: FlexComponentProps) =>
          mb != null
            ? toCssValue(mb, defaultSizes, getSpaceSizeMultiplier(mSize, defaultSizes), mUnit)
            : undefined,
        marginLeft: ({
          unit = defaultUnit,
          mSize = 'm',
          mUnit = unit,
          mx,
          ml = mx,
        }: FlexComponentProps) =>
          ml != null
            ? toCssValue(ml, defaultSizes, getSpaceSizeMultiplier(mSize, defaultSizes), mUnit)
            : undefined,

        padding: ({ unit = defaultUnit, pSize = 'm', pUnit = unit, p }: FlexComponentProps) =>
          p != null
            ? toCssValue(p, defaultSizes, getSpaceSizeMultiplier(pSize, defaultSizes), pUnit)
            : undefined,
        paddingTop: ({
          unit = defaultUnit,
          pSize = 'm',
          pUnit = unit,
          py,
          pt = py,
        }: FlexComponentProps) =>
          pt != null
            ? toCssValue(pt, defaultSizes, getSpaceSizeMultiplier(pSize, defaultSizes), pUnit)
            : undefined,
        paddingRight: ({
          unit = defaultUnit,
          pSize = 'm',
          pUnit = unit,
          px,
          pr = px,
        }: FlexComponentProps) =>
          pr != null
            ? toCssValue(pr, defaultSizes, getSpaceSizeMultiplier(pSize, defaultSizes), pUnit)
            : undefined,
        paddingBottom: ({
          unit = defaultUnit,
          pSize = 'm',
          pUnit = unit,
          py,
          pb = py,
        }: FlexComponentProps) =>
          pb != null
            ? toCssValue(pb, defaultSizes, getSpaceSizeMultiplier(pSize, defaultSizes), pUnit)
            : undefined,
        paddingLeft: ({
          unit = defaultUnit,
          pSize = 'm',
          pUnit = unit,
          px,
          pl = px,
        }: FlexComponentProps) =>
          pl != null
            ? toCssValue(pl, defaultSizes, getSpaceSizeMultiplier(pSize, defaultSizes), pUnit)
            : undefined,
      },
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
        css.root,
        className
      ),
      style: (styleTransformer as StyleTransformer<typeof style>)(undefined, style),
      ...(componentRef &&
        (typeof component === 'string' || isHasRef(component)
          ? { ref: componentRef }
          : { componentRef })),
    },
    children
  );
}

Object.defineProperties(Flex, {
  defaultUnit: {
    configurable: true,
    enumerable: true,
    get() {
      return sharedDefaults.defaultUnit;
    },
    set(v: SpaceUnit) {
      sharedDefaults.defaultUnit = v;
    },
  },
  defaultSizes: {
    configurable: true,
    enumerable: true,
    get() {
      return sharedDefaults.defaultSizes;
    },
    set(v: typeof sharedDefaults.defaultSizes) {
      sharedDefaults.defaultSizes = v;
    },
  },
});

export default Flex as typeof Flex & typeof sharedDefaults;

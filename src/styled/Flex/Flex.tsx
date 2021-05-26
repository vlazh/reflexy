import React, { useContext } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';
import useTheme from '@material-ui/styles/useTheme';
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
  FlexSimpleProps,
} from '../../Flex/Flex';
import { FlexContext } from '../../FlexProvider';
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
    defaultSize?: SpaceSize;
  };
}

type RequiredSome<T, K extends keyof T> = T & { [P in K]-?: T[P] };

type RequiredKeepUndefined<T> = { [K in keyof T]-?: [T[K]] } extends infer U
  ? U extends Record<keyof U, [any]>
    ? { [K in keyof U]: U[K][0] }
    : never
  : never;

type MakeStylesProps = RequiredKeepUndefined<
  RequiredSome<
    Omit<
      FlexSimpleProps,
      | 'center'
      | 'shrinkByContent'
      | 'fill'
      | 'unit'
      | 'm'
      | 'mx'
      | 'my'
      | 'p'
      | 'px'
      | 'py'
      | 'overflow'
      | 'scrollable'
      | 'className'
    >,
    'mUnit' | 'pUnit' | 'mSize' | 'pSize'
  > & {
    readonly defaultSizes: typeof sharedDefaults['defaultSizes'];
  }
>;

const useStyles = makeStyles(() => {
  return {
    // Use `Function values` instead of `Function rules` because of dublication classes if present nested rules.
    // https://codesandbox.io/s/material-demo-forked-btfjn?file=/demo.js
    root: {
      display: ({ flex, inline }: MakeStylesProps) =>
        // eslint-disable-next-line no-nested-ternary
        flex ? (inline ? 'inline-flex' : 'flex') : undefined,
      flexDirection: ({ reverse, row, column }: MakeStylesProps) =>
        reverse
          ? (column && 'column-reverse') || 'row-reverse'
          : (column && 'column') || (row && 'row') || undefined,
      flexWrap: ({ wrap }: MakeStylesProps) =>
        // eslint-disable-next-line no-nested-ternary
        wrap === true ? 'wrap' : wrap === false ? 'nowrap' : wrap,
      flexBasis: ({ basis }: MakeStylesProps) => basis,
      flexGrow: ({ grow }: MakeStylesProps) => (grow != null ? +grow : undefined),
      flexShrink: ({ shrink }: MakeStylesProps) => (shrink != null ? +shrink : undefined),
      order: ({ order }: MakeStylesProps) => order,
      alignItems: ({ alignItems }: MakeStylesProps) => alignItems,
      justifyContent: ({ justifyContent }: MakeStylesProps) => justifyContent,
      alignSelf: ({ alignSelf }: MakeStylesProps) => alignSelf,
      alignContent: ({ alignContent }: MakeStylesProps) => alignContent,

      minHeight: ({ shrinkHeight }: MakeStylesProps) => (shrinkHeight ? 0 : undefined),
      minWidth: ({ shrinkWidth }: MakeStylesProps) => (shrinkWidth ? 0 : undefined),
      height: ({ vfill }: MakeStylesProps) => getFillValue(vfill),
      width: ({ hfill }: MakeStylesProps) => getFillValue(hfill),

      overflowX: ({ overflowX, scrollableX }: MakeStylesProps) =>
        getOverflowValue(overflowX, scrollableX),
      overflowY: ({ overflowY, scrollableY }: MakeStylesProps) =>
        getOverflowValue(overflowY, scrollableY),

      // for strengthen
      '&&': {
        marginTop: ({ mSize, mUnit, mt, defaultSizes }: MakeStylesProps) =>
          mt != null
            ? toCssValue(mt, defaultSizes, getSpaceSizeMultiplier(mSize, defaultSizes), mUnit)
            : undefined,
        marginRight: ({ mSize, mUnit, mr, defaultSizes }: MakeStylesProps) =>
          mr != null
            ? toCssValue(mr, defaultSizes, getSpaceSizeMultiplier(mSize, defaultSizes), mUnit)
            : undefined,
        marginBottom: ({ mSize, mUnit, mb, defaultSizes }: MakeStylesProps) =>
          mb != null
            ? toCssValue(mb, defaultSizes, getSpaceSizeMultiplier(mSize, defaultSizes), mUnit)
            : undefined,
        marginLeft: ({ mSize, mUnit, ml, defaultSizes }: MakeStylesProps) =>
          ml != null
            ? toCssValue(ml, defaultSizes, getSpaceSizeMultiplier(mSize, defaultSizes), mUnit)
            : undefined,

        paddingTop: ({ pSize, pUnit, pt, defaultSizes }: MakeStylesProps) =>
          pt != null
            ? toCssValue(pt, defaultSizes, getSpaceSizeMultiplier(pSize, defaultSizes), pUnit)
            : undefined,
        paddingRight: ({ pSize, pUnit, pr, defaultSizes }: MakeStylesProps) =>
          pr != null
            ? toCssValue(pr, defaultSizes, getSpaceSizeMultiplier(pSize, defaultSizes), pUnit)
            : undefined,
        paddingBottom: ({ pSize, pUnit, pb, defaultSizes }: MakeStylesProps) =>
          pb != null
            ? toCssValue(pb, defaultSizes, getSpaceSizeMultiplier(pSize, defaultSizes), pUnit)
            : undefined,
        paddingLeft: ({ pSize, pUnit, pl, defaultSizes }: MakeStylesProps) =>
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
  const context = useContext(FlexContext);
  const theme = useTheme<Theme | undefined>();

  const defaultUnit =
    context.defaultUnit ?? theme?.reflexy?.defaultUnit ?? sharedDefaults.defaultUnit;
  const defaultSize =
    context.defaultSize ?? theme?.reflexy?.defaultSize ?? sharedDefaults.defaultSize;
  const defaultSizes =
    context.defaultSizes ?? theme?.reflexy?.defaultSizes ?? sharedDefaults.defaultSizes;

  const {
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
    hfill = fill,
    vfill = fill,
    shrinkByContent = true,
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

    componentRef,
    children,
    ...customComponentProps
  } = rest as React.PropsWithChildren<typeof rest & { componentRef?: any }>;

  const css = useStyles({
    flex,
    inline,
    row,
    column,
    reverse,
    wrap,
    alignItems,
    justifyContent,
    alignSelf,
    alignContent,
    basis,
    grow,
    shrink,
    order,
    hfill,
    vfill,
    shrinkWidth,
    shrinkHeight,
    mSize,
    mUnit,
    mt,
    mb,
    mr,
    ml,
    pSize,
    pUnit,
    pt,
    pb,
    pr,
    pl,
    overflowX,
    overflowY,
    scrollableX,
    scrollableY,

    defaultSizes,
  });

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
  defaultSize: {
    configurable: true,
    enumerable: true,
    get() {
      return sharedDefaults.defaultSize;
    },
    set(v: typeof sharedDefaults.defaultSize) {
      sharedDefaults.defaultSize = v;
    },
  },
} as Record<keyof typeof sharedDefaults, PropertyDescriptor>);

export default Flex as typeof Flex & typeof sharedDefaults;

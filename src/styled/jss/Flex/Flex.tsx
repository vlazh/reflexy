import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import useTheme from '@mui/styles/useTheme';
import type {
  DefaultComponentType,
  FlexAllProps,
  Styleable,
  ClassNameTransformer,
  StyleTransformer,
  FlexSimpleProps,
} from '../../../Flex/Flex';
import { defaultClassNameTransformer, defaultStyleTransformer } from '../../../utils';
import { toCssValue } from '../../../Flex/utils';
import { buildRefProps } from '../../../buildRefProps';
import { defineSharedDefaults } from '../../../defineSharedDefaults';
import type { SharedDefaults } from '../../../sharedDefaults';
import useFlexDefaults from '../../useFlexDefaults';
import { getFillValue, getOverflowValue, getSpaceSizeMultiplier } from '../../Flex/utils';
import './types';

type RequiredSome<T, K extends keyof T> = T & { [P in K]-?: Exclude<T[P], undefined> };

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
      | 'style'
    >,
    'mUnit' | 'pUnit' | 'mSize' | 'pSize'
  > &
    Pick<SharedDefaults, 'defaultSizes'>
>;

type MakeDefaultStylesProps = Pick<
  MakeStylesProps,
  'flex' | 'inline' | 'shrinkHeight' | 'shrinkWidth'
>;

const resetValue = null as unknown as undefined;

// Separate styles for correct priority in order to use with theming overrides
const useDefaultStyles = makeStyles(
  {
    root: {
      display: ({ flex, inline }: MakeDefaultStylesProps) =>
        // eslint-disable-next-line no-nested-ternary
        flex == null ? (inline ? 'inline-flex' : 'flex') : resetValue,
      minHeight: ({ shrinkHeight }: MakeDefaultStylesProps) =>
        shrinkHeight == null ? 0 : resetValue,
      minWidth: ({ shrinkWidth }: MakeDefaultStylesProps) => (shrinkWidth == null ? 0 : resetValue),
    },
  },
  { name: Flex.name }
);

const useStyles = makeStyles(
  {
    // Use `Function values` instead of `Function rules` because of dublication classes if present nested rules.
    // https://codesandbox.io/s/material-demo-forked-btfjn?file=/demo.js
    root: {
      display: ({ flex, inline }: MakeStylesProps) =>
        // eslint-disable-next-line no-nested-ternary
        flex ? (inline ? 'inline-flex' : 'flex') : resetValue,
      flexDirection: ({ reverse, row, column }: MakeStylesProps) =>
        reverse
          ? (column && 'column-reverse') || 'row-reverse'
          : (column && 'column') || (row && 'row') || resetValue,
      flexWrap: ({ wrap }: MakeStylesProps) =>
        // eslint-disable-next-line no-nested-ternary
        wrap === true ? 'wrap' : wrap === false ? 'nowrap' : wrap || resetValue,
      flexBasis: ({ basis }: MakeStylesProps) => basis ?? resetValue,
      flexGrow: ({ grow }: MakeStylesProps) => (grow != null ? +grow : resetValue),
      flexShrink: ({ shrink }: MakeStylesProps) => (shrink != null ? +shrink : resetValue),
      order: ({ order }: MakeStylesProps) => order ?? resetValue,
      alignItems: ({ alignItems }: MakeStylesProps) => alignItems ?? resetValue,
      justifyContent: ({ justifyContent }: MakeStylesProps) => justifyContent ?? resetValue,
      alignSelf: ({ alignSelf }: MakeStylesProps) => alignSelf ?? resetValue,
      alignContent: ({ alignContent }: MakeStylesProps) => alignContent ?? resetValue,

      minHeight: ({ shrinkHeight }: MakeStylesProps) => (shrinkHeight ? 0 : resetValue),
      minWidth: ({ shrinkWidth }: MakeStylesProps) => (shrinkWidth ? 0 : resetValue),
      height: ({ vfill }: MakeStylesProps) => getFillValue(vfill) ?? resetValue,
      width: ({ hfill }: MakeStylesProps) => getFillValue(hfill) ?? resetValue,

      overflowX: ({ overflowX, scrollableX }: MakeStylesProps) =>
        getOverflowValue(overflowX, scrollableX) ?? resetValue,
      overflowY: ({ overflowY, scrollableY }: MakeStylesProps) =>
        getOverflowValue(overflowY, scrollableY) ?? resetValue,

      // higher specificity
      // '&&': {
      marginTop: ({ mSize, mUnit, mt, defaultSizes }: MakeStylesProps) =>
        mt != null
          ? toCssValue(mt, defaultSizes, getSpaceSizeMultiplier(mSize, defaultSizes), mUnit)
          : resetValue,
      marginRight: ({ mSize, mUnit, mr, defaultSizes }: MakeStylesProps) =>
        mr != null
          ? toCssValue(mr, defaultSizes, getSpaceSizeMultiplier(mSize, defaultSizes), mUnit)
          : resetValue,
      marginBottom: ({ mSize, mUnit, mb, defaultSizes }: MakeStylesProps) =>
        mb != null
          ? toCssValue(mb, defaultSizes, getSpaceSizeMultiplier(mSize, defaultSizes), mUnit)
          : resetValue,
      marginLeft: ({ mSize, mUnit, ml, defaultSizes }: MakeStylesProps) =>
        ml != null
          ? toCssValue(ml, defaultSizes, getSpaceSizeMultiplier(mSize, defaultSizes), mUnit)
          : resetValue,

      paddingTop: ({ pSize, pUnit, pt, defaultSizes }: MakeStylesProps) =>
        pt != null
          ? toCssValue(pt, defaultSizes, getSpaceSizeMultiplier(pSize, defaultSizes), pUnit)
          : resetValue,
      paddingRight: ({ pSize, pUnit, pr, defaultSizes }: MakeStylesProps) =>
        pr != null
          ? toCssValue(pr, defaultSizes, getSpaceSizeMultiplier(pSize, defaultSizes), pUnit)
          : resetValue,
      paddingBottom: ({ pSize, pUnit, pb, defaultSizes }: MakeStylesProps) =>
        pb != null
          ? toCssValue(pb, defaultSizes, getSpaceSizeMultiplier(pSize, defaultSizes), pUnit)
          : resetValue,
      paddingLeft: ({ pSize, pUnit, pl, defaultSizes }: MakeStylesProps) =>
        pl != null
          ? toCssValue(pl, defaultSizes, getSpaceSizeMultiplier(pSize, defaultSizes), pUnit)
          : resetValue,
      // },
    },
  },
  { index: 1, name: Flex.name }
);

/**
 * Flexbox container.
 * Default style is just `display: flex;`.
 * Example: `<Flex component="button" ... />`
 * Example: `<Flex component={MyComponent} ... />`
 */
function Flex<C extends React.ElementType = DefaultComponentType>(
  props: FlexAllProps<C, { inferStyleProps: true }>
): JSX.Element {
  const { defaultUnit, defaultSize, defaultSizes } = useFlexDefaults(useTheme);

  const {
    flex,
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

    className,
    style,
    classNameTransformer = defaultClassNameTransformer as ClassNameTransformer<unknown>,
    styleTransformer = defaultStyleTransformer as StyleTransformer<unknown>,

    component = 'div' as C,
    componentRef,
    children,

    ...componentProps
  } = props as React.PropsWithChildren<
    typeof props & { componentRef?: React.Ref<any> | undefined }
  >;

  const css0 = useStyles({
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

  const css = useDefaultStyles({
    classes: { root: css0.root },
    flex,
    inline,
    shrinkHeight,
    shrinkWidth,
  });

  return React.createElement(
    component as React.ElementType<React.PropsWithChildren<Styleable<any, any>>>,
    Object.assign(componentProps, {
      className: (classNameTransformer as ClassNameTransformer<string>)(
        css.root,
        className as string
      ),
      style: (styleTransformer as StyleTransformer<React.CSSProperties>)(
        undefined,
        style as React.CSSProperties
      ),
      ...buildRefProps(component, componentRef),
    }),
    children
  );
}

export default defineSharedDefaults(Flex);

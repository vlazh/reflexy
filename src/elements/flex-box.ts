/* eslint-disable lit/no-invalid-html */
/* eslint-disable lit/binding-positions */
import { LitElement, css, type PropertyValues } from 'lit';
import { html, literal, unsafeStatic, type StaticValue } from 'lit/static-html.js';
import { customElement, property } from 'lit/decorators.js';
import { classMap, type ClassInfo } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { FlexProps, OverflowProps, SpaceProps, SpaceSize, SpaceUnit } from '../propsTypes';
import type { SharedDefaults } from '../sharedDefaults';
import {
  getSpace,
  spaceToCssValue,
  gapToCssValue,
  fillToCssValue,
  scrollableToCssValue,
  getSpaceSizeMultiplier,
} from '../utils';
import {
  stringAndBooleanConverter,
  stringAndNumberConverter,
  numberAndBooleanConverter,
  numberAndStringAndBooleanConverter,
} from './converters';

type Props = Required<OmitStrict<FlexProps, 'flex' | 'inline'>> &
  Required<SpaceProps> &
  Required<OverflowProps>;

@customElement('flex-box')
export class FlexBox extends LitElement implements Props {
  private tag: StaticValue | undefined;

  @property({ type: String })
  as: string | undefined;

  @property({ reflect: true })
  display: Props['display'] = 'flex';

  @property({ type: Boolean, reflect: true })
  row: Props['row'] = true;

  @property({ type: Boolean, reflect: true })
  column: Props['column'] = undefined;

  @property({ type: Boolean, reflect: true })
  reverse: Props['reverse'] = undefined;

  @property({ converter: stringAndBooleanConverter, reflect: true })
  wrap: Props['wrap'] = undefined;

  @property({ converter: stringAndNumberConverter, reflect: true })
  basis: Props['basis'] = undefined;

  @property({ type: String, attribute: 'align-items', reflect: true })
  alignItems: Props['alignItems'] = undefined;

  @property({ type: String, attribute: 'align-content', reflect: true })
  alignContent: Props['alignContent'] = undefined;

  @property({ type: String, attribute: 'align-self', reflect: true })
  alignSelf: Props['alignSelf'] = undefined;

  @property({ type: String, attribute: 'justify-content', reflect: true })
  justifyContent: Props['justifyContent'] = undefined;

  @property({ type: Boolean, reflect: true })
  center: Props['center'] = undefined;

  @property({ type: Number, reflect: true })
  order: Props['order'] = undefined;

  @property({ converter: numberAndBooleanConverter, reflect: true })
  grow: Props['grow'] = undefined;

  @property({ converter: numberAndBooleanConverter, reflect: true })
  shrink: Props['shrink'] = undefined;

  @property({ converter: numberAndBooleanConverter, reflect: true })
  hfill: Props['hfill'] = undefined;

  @property({ converter: numberAndBooleanConverter, reflect: true })
  vfill: Props['vfill'] = undefined;

  @property({ type: Boolean, reflect: true })
  fill: Props['fill'] = undefined;

  @property({ type: Boolean, attribute: 'shrink-by-content', reflect: true })
  shrinkByContent: Props['shrinkByContent'] = undefined;

  @property({ type: Boolean, attribute: 'shrink-width', reflect: true })
  shrinkWidth: Props['shrinkWidth'] = undefined;

  @property({ type: Boolean, attribute: 'shrink-height', reflect: true })
  shrinkHeight: Props['shrinkHeight'] = undefined;

  @property({ converter: stringAndNumberConverter, reflect: true })
  unit: Props['unit'] = undefined;

  @property({
    converter: stringAndNumberConverter,
    attribute: 'm-unit',
    reflect: true,
  })
  mUnit: Props['mUnit'] = undefined;

  @property({
    converter: stringAndNumberConverter,
    attribute: 'm-size',
    reflect: true,
  })
  mSize: Props['mSize'] = undefined;

  @property({ converter: stringAndBooleanConverter, reflect: true })
  m: Props['m'] = undefined;

  @property({ converter: stringAndBooleanConverter, reflect: true })
  mx: Props['mx'] = undefined;

  @property({ converter: stringAndBooleanConverter, reflect: true })
  my: Props['my'] = undefined;

  @property({ converter: stringAndBooleanConverter, reflect: true })
  mt: Props['mt'] = undefined;

  @property({ converter: stringAndBooleanConverter, reflect: true })
  mr: Props['mr'] = undefined;

  @property({ converter: stringAndBooleanConverter, reflect: true })
  mb: Props['mb'] = undefined;

  @property({ converter: stringAndBooleanConverter, reflect: true })
  ml: Props['ml'] = undefined;

  @property({
    converter: stringAndNumberConverter,
    attribute: 'p-unit',
    reflect: true,
  })
  pUnit: Props['pUnit'] = undefined;

  @property({
    converter: stringAndBooleanConverter,
    attribute: 'p-size',
    reflect: true,
  })
  pSize: Props['pSize'] = undefined;

  @property({ converter: stringAndBooleanConverter, reflect: true })
  p: Props['p'] = undefined;

  @property({ converter: stringAndBooleanConverter, reflect: true })
  px: Props['px'] = undefined;

  @property({ converter: stringAndBooleanConverter, reflect: true })
  py: Props['py'] = undefined;

  @property({ converter: stringAndBooleanConverter, reflect: true })
  pt: Props['pt'] = undefined;

  @property({ converter: stringAndBooleanConverter, reflect: true })
  pr: Props['pr'] = undefined;

  @property({ converter: stringAndBooleanConverter, reflect: true })
  pb: Props['pb'] = undefined;

  @property({ converter: stringAndBooleanConverter, reflect: true })
  pl: Props['pl'] = undefined;

  @property({
    converter: stringAndNumberConverter,
    attribute: 'gap-unit',
    reflect: true,
  })
  gapUnit: Props['gapUnit'] = undefined;

  @property({
    converter: stringAndNumberConverter,
    attribute: 'gap-size',
    reflect: true,
  })
  gapSize: Props['gapSize'] = undefined;

  @property({ converter: numberAndStringAndBooleanConverter, reflect: true })
  gap: Props['gap'] = undefined;

  @property({
    converter: numberAndStringAndBooleanConverter,
    attribute: 'row-gap',
    reflect: true,
  })
  rowGap: Props['rowGap'] = undefined;

  @property({
    converter: numberAndStringAndBooleanConverter,
    attribute: 'column-gap',
    reflect: true,
  })
  columnGap: Props['columnGap'] = undefined;

  @property({ type: String, reflect: true })
  overflow: Props['overflow'] | undefined;

  @property({ type: String, attribute: 'overflow-x', reflect: true })
  overflowX: Props['overflowX'] | undefined;

  @property({ type: String, attribute: 'overflow-y', reflect: true })
  overflowY: Props['overflowY'] | undefined;

  @property({ converter: stringAndBooleanConverter, reflect: true })
  scrollable: Props['scrollable'] | undefined;

  @property({
    converter: stringAndBooleanConverter,
    attribute: 'scrollable-x',
    reflect: true,
  })
  scrollableX: Props['scrollableX'] | undefined;

  @property({
    converter: stringAndBooleanConverter,
    attribute: 'scrollable-y',
    reflect: true,
  })
  scrollableY: Props['scrollableY'] | undefined;

  static override styles = css`
    :host {
      --local-default-unit: var(--default-unit, rem);
      --local-default-size: var(--default-size, m);
      --local-default-size-xs: var(--default-size-xs, 0.25);
      --local-default-size-s: var(--default-size-s, 0.5);
      --local-default-size-m: var(--default-size-m, 1);
      --local-default-size-l: var(--default-size-l, 1.5);
      --local-default-size-xl: var(--default-size-xl, 2);
      --local-default-size-xxl: var(--default-size-xxl, 2.5);

      display: var(--flex-display, flex);
      flex-direction: var(--flex-direction, row);
      flex-wrap: var(--flex-wrap);
      flex-basis: var(--flex-basis);
      flex-grow: var(--flex-grow);
      flex-shrink: var(--flex-shrink);
      order: var(--order);
      align-items: var(--align-items);
      align-self: var(--align-self);
      align-content: var(--align-content);
      justify-content: var(--justify-content);

      min-height: var(--min-height);
      min-width: var(--min-width);
      height: var(--height);
      width: var(--width);

      overflow-x: var(--overflow-x);
      overflow-y: var(--overflow-y);

      margin-top: var(--margin-top);
      margin-right: var(--margin-right);
      margin-bottom: var(--margin-bottom);
      margin-left: var(--margin-left);

      padding-top: var(--padding-top);
      padding-right: var(--padding-right);
      padding-bottom: var(--padding-bottom);
      padding-left: var(--padding-left);

      gap: var(--gap);
      row-gap: var(--row-gap);
      column-gap: var(--column-gap);
    }
  `;

  // override connectedCallback(): void {
  //   super.connectedCallback();
  //   // setTimeout(() => {
  //   //   this.wrap = true;
  //   // }, 2000);
  // }

  private getDefaults(): SharedDefaults {
    const computedStyle = getComputedStyle(this);

    return {
      defaultUnit: computedStyle.getPropertyValue('--local-default-unit') as SpaceUnit,
      defaultSize: computedStyle.getPropertyValue('--local-default-size') as SpaceSize,
      defaultSizes: {
        xs: +computedStyle.getPropertyValue('--local-default-size-xs'),
        s: +computedStyle.getPropertyValue('--local-default-size-s'),
        m: +computedStyle.getPropertyValue('--local-default-size-m'),
        l: +computedStyle.getPropertyValue('--local-default-size-l'),
        xl: +computedStyle.getPropertyValue('--local-default-size-xl'),
        xxl: +computedStyle.getPropertyValue('--local-default-size-xxl'),
      },
    } satisfies SharedDefaults;
  }

  // protected override update(changedProperties: PropertyValues<this>): void {
  //   super.update(changedProperties);

  //   const defaults = this.getDefaults();

  //   const {
  //     display,
  //     row,
  //     column,
  //     reverse,
  //     wrap,
  //     center,
  //     alignItems = center ? 'center' : undefined,
  //     justifyContent = center ? 'center' : undefined,
  //     alignSelf,
  //     alignContent,
  //     basis,
  //     grow,
  //     shrink,
  //     order,
  //     fill,
  //     hfill = fill,
  //     vfill = fill,
  //     shrinkByContent = display == null || display === 'flex' || display === 'inline-flex',
  //     shrinkWidth = shrinkByContent,
  //     shrinkHeight = shrinkByContent,
  //     unit = defaults.defaultUnit,
  //     mSize = defaults.defaultSize,
  //     mUnit = unit,
  //     m,
  //     mx = m,
  //     my = m,
  //     mt = my,
  //     mb = my,
  //     mr = mx,
  //     ml = mx,
  //     pSize = defaults.defaultSize,
  //     pUnit = unit,
  //     p,
  //     px = p,
  //     py = p,
  //     pt = py,
  //     pb = py,
  //     pr = px,
  //     pl = px,
  //     gapSize: gSize = defaults.defaultSize,
  //     gapUnit = unit,
  //     gap,
  //     columnGap,
  //     rowGap,
  //     overflow,
  //     overflowX = overflow,
  //     overflowY = overflow,
  //     scrollable,
  //     scrollableX = scrollable,
  //     scrollableY = scrollable,
  //   } = this;

  //   const marginSize = getSpaceSizeMultiplier(mSize, defaults.defaultSizes);
  //   const paddingSize = getSpaceSizeMultiplier(pSize, defaults.defaultSizes);
  //   const gapSize = getSpaceSizeMultiplier(gSize, defaults.defaultSizes);

  //   const { style } = this;

  //   style.setProperty('--flex-display', display || null);
  //   style.setProperty(
  //     '--flex-direction',
  //     reverse
  //       ? (column && 'column-reverse') || 'row-reverse'
  //       : (column && 'column') || (row && 'row') || null
  //   );
  //   style.setProperty(
  //     '--flex-wrap',
  //     typeof wrap === 'boolean' ? (wrap && 'wrap') || 'nowrap' : wrap || null
  //   );
  //   style.setProperty('--flex-basis', basis != null ? String(basis) : null);
  //   style.setProperty('--flex-grow', grow != null ? String(+grow) : null);
  //   style.setProperty('--flex-shrink', shrink != null ? String(+shrink) : null);
  //   style.setProperty('--order', order != null ? String(order) : null);

  //   style.setProperty('--align-items', alignItems || null);
  //   style.setProperty('--align-self', alignSelf || null);
  //   style.setProperty('--align-content', alignContent || null);
  //   style.setProperty('--justify-content', justifyContent || null);

  //   style.setProperty('--min-height', shrinkHeight ? '0px' : null);
  //   style.setProperty('--min-width', shrinkWidth ? '0px' : null);
  //   style.setProperty('--height', fillToCssValue(vfill) ?? null);
  //   style.setProperty('--width', fillToCssValue(hfill) ?? null);

  //   style.setProperty('--overflow-x', overflowX ?? scrollableToCssValue(scrollableX) ?? null);
  //   style.setProperty('--overflow-y', overflowY ?? scrollableToCssValue(scrollableY) ?? null);

  //   style.setProperty(
  //     '--margin-top',
  //     mt != null ? spaceToCssValue(getSpace(mt, marginSize), defaults.defaultSizes, mUnit) : null
  //   );
  //   style.setProperty(
  //     '--margin-right',
  //     mr != null ? spaceToCssValue(getSpace(mr, marginSize), defaults.defaultSizes, mUnit) : null
  //   );
  //   style.setProperty(
  //     '--margin-bottom',
  //     mb != null ? spaceToCssValue(getSpace(mb, marginSize), defaults.defaultSizes, mUnit) : null
  //   );
  //   style.setProperty(
  //     '--margin-left',
  //     ml != null ? spaceToCssValue(getSpace(ml, marginSize), defaults.defaultSizes, mUnit) : null
  //   );

  //   style.setProperty(
  //     '--padding-top',
  //     pt != null ? spaceToCssValue(getSpace(pt, paddingSize), defaults.defaultSizes, pUnit) : null
  //   );
  //   style.setProperty(
  //     '--padding-right',
  //     pr != null ? spaceToCssValue(getSpace(pr, paddingSize), defaults.defaultSizes, pUnit) : null
  //   );
  //   style.setProperty(
  //     '--padding-bottom',
  //     pb != null ? spaceToCssValue(getSpace(pb, paddingSize), defaults.defaultSizes, pUnit) : null
  //   );
  //   style.setProperty(
  //     '--padding-left',
  //     pl != null ? spaceToCssValue(getSpace(pl, paddingSize), defaults.defaultSizes, pUnit) : null
  //   );

  //   style.setProperty(
  //     '--gap',
  //     gap != null ? gapToCssValue(getSpace(gap, gapSize), defaults.defaultSizes, gapUnit) : null
  //   );
  //   style.setProperty(
  //     '--row-gap',
  //     rowGap != null
  //       ? spaceToCssValue(getSpace(rowGap, gapSize), defaults.defaultSizes, gapUnit)
  //       : null
  //   );
  //   style.setProperty(
  //     '--column-gap',
  //     columnGap != null
  //       ? spaceToCssValue(getSpace(columnGap, gapSize), defaults.defaultSizes, gapUnit)
  //       : null
  //   );
  // }

  // override updated(changed: Map<string, any>) {
  //   super.updated(changed);
  //   this.applyChildFlexDefaults();
  // }

  protected override update(changedProperties: PropertyValues<this>): void {
    if (changedProperties.has('as')) {
      const name = this.as?.trim();
      this.tag = name && name !== 'div' ? literal`${unsafeStatic(name)}` : undefined;
    }
    super.update(changedProperties);
  }

  // eslint-disable-next-line class-methods-use-this
  protected getClasses(): ClassInfo | undefined {
    return undefined;
  }

  protected override render(): unknown {
    const defaults = this.getDefaults();

    const {
      display,
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
      shrinkByContent = display == null || display === 'flex' || display === 'inline-flex',
      shrinkWidth = shrinkByContent,
      shrinkHeight = shrinkByContent,
      unit = defaults.defaultUnit,
      mSize = defaults.defaultSize,
      mUnit = unit,
      m,
      mx = m,
      my = m,
      mt = my,
      mb = my,
      mr = mx,
      ml = mx,
      pSize = defaults.defaultSize,
      pUnit = unit,
      p,
      px = p,
      py = p,
      pt = py,
      pb = py,
      pr = px,
      pl = px,
      gapSize: gSize = defaults.defaultSize,
      gapUnit = unit,
      gap,
      columnGap,
      rowGap,
      overflow,
      overflowX = overflow,
      overflowY = overflow,
      scrollable,
      scrollableX = scrollable,
      scrollableY = scrollable,
    } = this;

    const marginSize = getSpaceSizeMultiplier(mSize, defaults.defaultSizes);
    const paddingSize = getSpaceSizeMultiplier(pSize, defaults.defaultSizes);
    const gapSize = getSpaceSizeMultiplier(gSize, defaults.defaultSizes);

    const displayValue = display || null;
    const directionValue = reverse
      ? (column && 'column-reverse') || 'row-reverse'
      : (column && 'column') || (row && 'row') || null;
    const wrapValue = typeof wrap === 'boolean' ? (wrap && 'wrap') || 'nowrap' : wrap || null;
    const basisValue = basis != null ? String(basis) : null;
    const growValue = grow != null ? String(+grow) : null;
    const shrinkValue = shrink != null ? String(+shrink) : null;
    const orderValue = order != null ? String(order) : null;

    const alignItemsValue = alignItems || null;
    const alignSelfValue = alignSelf || null;
    const alignContentValue = alignContent || null;
    const justifyContentValue = justifyContent || null;

    const minHeightValue = shrinkHeight ? '0px' : null;
    const minWidthValue = shrinkWidth ? '0px' : null;
    const heightValue = fillToCssValue(vfill) ?? null;
    const widthValue = fillToCssValue(hfill) ?? null;

    const overflowXValue = overflowX ?? scrollableToCssValue(scrollableX) ?? null;
    const overflowYValue = overflowY ?? scrollableToCssValue(scrollableY) ?? null;

    const marginTopValue =
      mt != null ? spaceToCssValue(getSpace(mt, marginSize), defaults.defaultSizes, mUnit) : null;
    const marginRightValue =
      mr != null ? spaceToCssValue(getSpace(mr, marginSize), defaults.defaultSizes, mUnit) : null;
    const marginBottomValue =
      mb != null ? spaceToCssValue(getSpace(mb, marginSize), defaults.defaultSizes, mUnit) : null;
    const marginLeftValue =
      ml != null ? spaceToCssValue(getSpace(ml, marginSize), defaults.defaultSizes, mUnit) : null;

    const paddingTopValue =
      pt != null ? spaceToCssValue(getSpace(pt, paddingSize), defaults.defaultSizes, pUnit) : null;
    const paddingRightValue =
      pr != null ? spaceToCssValue(getSpace(pr, paddingSize), defaults.defaultSizes, pUnit) : null;
    const paddingBottomValue =
      pb != null ? spaceToCssValue(getSpace(pb, paddingSize), defaults.defaultSizes, pUnit) : null;
    const paddingLeftValue =
      pl != null ? spaceToCssValue(getSpace(pl, paddingSize), defaults.defaultSizes, pUnit) : null;

    const gapValue =
      gap != null ? gapToCssValue(getSpace(gap, gapSize), defaults.defaultSizes, gapUnit) : null;
    const rowGapValue =
      rowGap != null
        ? spaceToCssValue(getSpace(rowGap, gapSize), defaults.defaultSizes, gapUnit)
        : null;
    const columnGapValue =
      columnGap != null
        ? spaceToCssValue(getSpace(columnGap, gapSize), defaults.defaultSizes, gapUnit)
        : null;

    const classes = this.getClasses();
    const cls = ifDefined(classes && classMap(classes));

    const root = this.tag
      ? html`<${this.tag} class="${cls}"><slot></slot></${this.tag}>`
      : html`<div class="${cls}"><slot></slot></div>`;

    return html`
      <style>
        :host {
          --flex-display: ${displayValue};
          --flex-direction: ${directionValue};
          --flex-wrap: ${wrapValue};
          --flex-basis: ${basisValue};
          --flex-grow: ${growValue};
          --flex-shrink: ${shrinkValue};
          --order: ${orderValue};
          --align-items: ${alignItemsValue};
          --align-self: ${alignSelfValue};
          --align-content: ${alignContentValue};
          --justify-content: ${justifyContentValue};

          --min-height: ${minHeightValue};
          --min-width: ${minWidthValue};
          --height: ${heightValue};
          --width: ${widthValue};

          --overflow-x: ${overflowXValue};
          --overflow-y: ${overflowYValue};

          --margin-top: ${marginTopValue};
          --margin-right: ${marginRightValue};
          --margin-bottom: ${marginBottomValue};
          --margin-left: ${marginLeftValue};

          --padding-top: ${paddingTopValue};
          --padding-right: ${paddingRightValue};
          --padding-bottom: ${paddingBottomValue};
          --padding-left: ${paddingLeftValue};

          --gap: ${gapValue};
          --row-gap: ${rowGapValue};
          --column-gap: ${columnGapValue};
        }
      </style>
      ${root}
    `;
  }
}

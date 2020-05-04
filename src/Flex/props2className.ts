import type { FlexProps, OverflowProps } from './Flex';
import css from './Flex.css';

export default function props2className(
  props: Pick<
    FlexProps,
    | 'column'
    | 'row'
    | 'reverse'
    | 'grow'
    | 'shrink'
    | 'wrap'
    | 'alignItems'
    | 'center'
    | 'justifyContent'
    | 'fill'
    | 'hfill'
    | 'vfill'
    | 'alignContent'
    | 'alignSelf'
    | 'inline'
    | 'basis'
    | 'shrinkByContent'
    | 'shrinkWidth'
    | 'shrinkHeight'
  > &
    OverflowProps
): string {
  const column = !!props.column;
  const row = !column && !!props.row;
  const reverse = props.reverse ? '-reverse' : '';
  const grow =
    props.grow != null && (+props.grow >= 0 && +props.grow <= 24 && +props.grow).toString();
  const shrink =
    props.shrink != null && (+props.shrink >= 0 && +props.shrink <= 24 && +props.shrink).toString();
  const wrap = (props.wrap === false && 'nowrap') || (props.wrap === true && 'wrap') || props.wrap;
  const alignItems = props.alignItems || (props.center && 'center');
  const justifyContent = props.justifyContent || (props.center && 'center');
  const basis = (props.basis === 0 || typeof props.basis === 'string') && String(props.basis);
  const fill = typeof props.fill === 'boolean' ? props.fill : undefined;
  const hfill = props.hfill == null ? fill : typeof props.hfill === 'boolean' && props.hfill;
  const vfill = props.vfill == null ? fill : typeof props.vfill === 'boolean' && props.vfill;
  const shrinkByContent = !!props.shrinkByContent;
  const shrinkWidth = props.shrinkWidth == null ? shrinkByContent : props.shrinkWidth;
  const shrinkHeight = props.shrinkHeight == null ? shrinkByContent : props.shrinkHeight;

  const scrollable =
    (props.scrollable === true && 'auto') ||
    (props.scrollable === false && 'hidden') ||
    props.scrollable;
  const scrollableX =
    (props.scrollableX === true && 'auto') ||
    (props.scrollableX === false && 'hidden') ||
    (props.scrollableX == null ? scrollable : props.scrollableX);
  const scrollableY =
    (props.scrollableY === true && 'auto') ||
    (props.scrollableY === false && 'hidden') ||
    (props.scrollableY == null ? scrollable : props.scrollableY);

  const overflow = props.overflow ?? scrollable;
  const overflowX = props.overflowX == null ? scrollableX ?? overflow : props.overflowX;
  const overflowY = props.overflowY == null ? scrollableY ?? overflow : props.overflowY;

  const className = [
    css[`display--${props.inline ? 'inline-flex' : 'flex'}`],
    row && css[`row${reverse}`],
    column && css[`column${reverse}`],
    wrap && css[`wrap--${wrap}`],
    alignItems && css[`align-items--${alignItems}`],
    props.alignContent && css[`align-content--${props.alignContent}`],
    props.alignSelf && css[`align-self--${props.alignSelf}`],
    justifyContent && css[`justify-content--${justifyContent}`],
    basis && css[`basis--${basis}`],
    grow && css[`grow--${grow}`],
    shrink && css[`shrink--${shrink}`],
    hfill && css['fill-h'],
    vfill && css['fill-v'],
    // props.shrinkByContent && css['shrink-by-content'],
    // props.shrinkByContent ? (column && css['shrink-by-column']) || css['shrink-by-row'] : undefined,
    shrinkWidth && css['shrink-width'],
    shrinkHeight && css['shrink-height'],
    overflowX && css[`overflow-x--${overflowX}`],
    overflowY && css[`overflow-y--${overflowY}`],
  ].reduce<string>((acc, cls) => {
    if (!cls) return acc;
    return acc ? `${acc} ${cls}` : cls;
  }, '');

  return className;
}

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
    | 'justifyContent'
    | 'hfill'
    | 'vfill'
    | 'alignContent'
    | 'alignSelf'
    | 'inline'
    | 'basis'
    | 'shrinkWidth'
    | 'shrinkHeight'
  > &
    Pick<OverflowProps, 'overflowX' | 'overflowY' | 'scrollableX' | 'scrollableY'>
): string {
  const column = !!props.column;
  const row = !column && !!props.row;
  const reverse = props.reverse ? '-reverse' : '';
  const grow =
    props.grow != null && (+props.grow >= 0 && +props.grow <= 24 && +props.grow).toString();
  const shrink =
    props.shrink != null && (+props.shrink >= 0 && +props.shrink <= 24 && +props.shrink).toString();
  const wrap = (props.wrap === false && 'nowrap') || (props.wrap === true && 'wrap') || props.wrap;
  const basis = (props.basis === 0 || typeof props.basis === 'string') && String(props.basis);
  const hfill = typeof props.hfill === 'boolean' && props.hfill;
  const vfill = typeof props.vfill === 'boolean' && props.vfill;

  const scrollableX =
    typeof props.scrollableX === 'string'
      ? props.scrollableX
      : (props.scrollableX === true && 'auto') ||
        (props.scrollableX === false && 'hidden') ||
        undefined;
  const scrollableY =
    typeof props.scrollableY === 'string'
      ? props.scrollableY
      : (props.scrollableY === true && 'auto') ||
        (props.scrollableY === false && 'hidden') ||
        undefined;

  const overflowX = props.overflowX ?? scrollableX;
  const overflowY = props.overflowY ?? scrollableY;

  const className = [
    css[`display--${props.inline ? 'inline-flex' : 'flex'}`],
    row && css[`row${reverse}`],
    column && css[`column${reverse}`],
    wrap && css[`wrap--${wrap}`],
    props.alignItems && css[`align-items--${props.alignItems}`],
    props.alignContent && css[`align-content--${props.alignContent}`],
    props.alignSelf && css[`align-self--${props.alignSelf}`],
    props.justifyContent && css[`justify-content--${props.justifyContent}`],
    basis && css[`basis--${basis}`],
    grow && css[`grow--${grow}`],
    shrink && css[`shrink--${shrink}`],
    hfill && css['fill-h'],
    vfill && css['fill-v'],
    props.shrinkWidth && css['shrink-width'],
    props.shrinkHeight && css['shrink-height'],
    overflowX && css[`overflow-x--${overflowX}`],
    overflowY && css[`overflow-y--${overflowY}`],
  ].reduce<string>((acc, cls) => {
    if (!cls) return acc;
    return acc ? `${acc} ${cls}` : cls;
  }, '');

  return className;
}

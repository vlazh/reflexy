export interface Props {
  [key: string]: any;
}

export function exclude(props: Props): Props {
  const result = { ...props };

  delete result.inline;
  delete result.alignContent;
  delete result.alignItems;
  delete result.alignSelf;
  delete result.justifyContent;
  delete result.basis;
  delete result.flexBasis;
  delete result.grow;
  delete result.shrink;
  delete result.row;
  delete result.column;
  delete result.reverse;
  delete result.wrap;
  delete result.order;
  delete result.hfill;
  delete result.vfill;
  delete result.fill;
  delete result.component;
  delete result.tagName;
  delete result.center;

  return result;
}

export interface Props {
  [key: string]: any;
}

export function exclude(props: Props): Props {
  const result = { ...props };

  delete result.display;
  // delete result.flex;
  delete result.flexBasis;
  delete result.inline;
  delete result.reverse;
  delete result.row;
  delete result.column;
  delete result.wrap;
  delete result.alignItems;
  delete result.alignSelf;
  delete result.alignContent;
  delete result.justifyContent;
  delete result.hfill;
  delete result.vfill;
  delete result.fill;
  delete result.component;
  delete result.tagName;
  delete result.className;

  return result;
}

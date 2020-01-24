import { ViewSize } from '../MediaQueries';

export const sizesMap: Record<ViewSize, number> = {
  [ViewSize.xxs]: 1,
  [ViewSize.xs]: 2,
  [ViewSize.s]: 3,
  [ViewSize.m]: 4,
  [ViewSize.l]: 5,
  [ViewSize.xl]: 6,
  [ViewSize.xxl]: 7,
};

export const sizes = Object.entries(sizesMap) as [ViewSize, number][];

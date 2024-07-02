import ViewSize from './ViewSize';
import { viewSizeValueList } from './viewSizeValues';

export default function getViewSize(width: number): ViewSize {
  const viewSize =
    viewSizeValueList.find(
      ([, value]) => width >= value.minWidth && width <= value.maxWidth
    )?.[0] ?? viewSizeValueList.at(-1)![0];
  return viewSize;
}

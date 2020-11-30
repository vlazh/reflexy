import ViewSize from './ViewSize';
import { viewSizeValueList } from './viewSizeValues';

export default function getViewSize(width: number): ViewSize {
  const [viewSize = ViewSize.xxl] =
    viewSizeValueList.find(([, value]) => width >= value.minWidth && width <= value.maxWidth) ?? [];
  return viewSize;
}

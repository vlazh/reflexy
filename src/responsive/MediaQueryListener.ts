/* eslint-disable no-underscore-dangle */
/* https://mediag.com/news/popular-screen-resolutions-designing-for-all/ */
/* http://viewportsizes.com */

import ViewSize from './ViewSize';
import viewSizeValues, { ViewSizeValue, viewSizeValueList } from './viewSizeValues';

export interface MediaQueryEvent extends Pick<MediaQueryListEvent, 'matches'> {
  readonly viewSize: ViewSize;
}

export type MediaQueryEventHandler = (event: MediaQueryEvent) => void;

export interface MediaQueryListenerOptions {
  /** @deprecated @see https://stackoverflow.com/a/39401858 */
  deviceDimentions?: boolean;
}

export default class MediaQueryListener {
  private _currentViewSize: ViewSize | undefined;
  private readonly mediaQueries: MediaQueryList[] = [];
  private readonly listeners: Set<MediaQueryEventHandler> = new Set();
  readonly queries: Readonly<Record<ViewSize, string>>;

  get currentViewSize(): ViewSize {
    if (!this._currentViewSize) {
      throw new Error(
        `Media queries is not initialized properly. Current view size is ${String(
          this._currentViewSize
        )}.`
      );
    }
    return this._currentViewSize;
  }

  get currentViewSizeValue(): ViewSizeValue {
    return viewSizeValues[this.currentViewSize];
  }

  /** Init all media queries for handle changes. */
  constructor({ deviceDimentions }: MediaQueryListenerOptions = {}) {
    this.queries = viewSizeValueList.reduce((acc, [viewSize, { minWidth, maxWidth }]) => {
      const q = deviceDimentions
        ? `only screen and (min-device-width: ${minWidth}px) and (max-device-width: ${maxWidth}px)`
        : `only screen and (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;
      acc[viewSize] = q;
      return acc;
    }, {} as Record<ViewSize, string>);

    Object.entries(this.queries).forEach(([key, query]) => {
      const viewSize = key as ViewSize;
      const mq = window.matchMedia(query);
      this.mediaQueries.push(mq);
      mq.onchange = ({ matches }) => {
        if (matches) {
          this._currentViewSize = viewSize;
          // console.log(viewSize);
        }
        this.listeners.forEach((handle) => handle({ viewSize, matches }));
      };
      // For initialize currentViewport with right value
      if (mq.matches) {
        this._currentViewSize = viewSize;
      }
    });
  }

  destroy(): void {
    this.mediaQueries.splice(0, this.mediaQueries.length).forEach((mq) => {
      // eslint-disable-next-line no-param-reassign
      mq.onchange = null;
    });
  }

  addListener(listener: MediaQueryEventHandler): void {
    this.listeners.add(listener);
  }

  removeListener(listener: MediaQueryEventHandler): boolean {
    return this.listeners.delete(listener);
  }
}

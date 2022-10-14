/* eslint-disable no-underscore-dangle */
/* https://mediag.com/news/popular-screen-resolutions-designing-for-all/ */
/* http://viewportsizes.com */

import type ViewSize from './ViewSize';
import { viewSizeValues, ViewSizeValue } from './viewSizeValues';
import getViewSizeQueryMap, { GetViewSizeQueryMapOptions } from './getViewSizeQueryMap';

export interface MediaQueryEvent extends Pick<MediaQueryListEvent, 'matches'> {
  readonly viewSize: ViewSize;
}

export type MediaQueryEventHandler = (event: MediaQueryEvent) => void;

export type MediaQueryListenerOptions = GetViewSizeQueryMapOptions;

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
  constructor(options: MediaQueryListenerOptions = {}) {
    this.queries = getViewSizeQueryMap(options);

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

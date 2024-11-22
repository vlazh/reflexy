/* eslint-disable no-underscore-dangle */
/* https://mediag.com/news/popular-screen-resolutions-designing-for-all/ */
/* http://viewportsizes.com */

import ViewSize from './ViewSize';
import getViewSizeQueryMap, { type GetViewSizeQueryMapOptions } from './getViewSizeQueryMap';

export interface MediaQueryEvent extends Pick<MediaQueryListEvent, 'matches'> {
  readonly viewSize: ViewSize;
}

export type MediaQueryEventHandler = (event: MediaQueryEvent) => void;

export type MediaQueryListenerOptions = GetViewSizeQueryMapOptions;

export default class MediaQueryListener implements Disposable {
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

  get currentViewSizeQuery(): ViewSize.Values {
    return ViewSize.values[this.currentViewSize];
  }

  /** Init all media queries for handle changes. */
  constructor(options: MediaQueryListenerOptions = {}) {
    this.queries = getViewSizeQueryMap(options);

    Object.entries(this.queries).forEach(([key, query]) => {
      const viewSize = ViewSize.of(key);
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

  addListener(listener: MediaQueryEventHandler): void {
    this.listeners.add(listener);
  }

  removeListener(listener: MediaQueryEventHandler): boolean {
    return this.listeners.delete(listener);
  }

  destroy(): void {
    this.mediaQueries.splice(0, this.mediaQueries.length).forEach((mq) => {
      // eslint-disable-next-line no-param-reassign
      mq.onchange = null;
    });
    this.listeners.clear();
  }

  [Symbol.dispose](): void {
    return this.destroy();
  }
}

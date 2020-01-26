/* eslint-disable no-underscore-dangle */

/* https://mediag.com/news/popular-screen-resolutions-designing-for-all/ */
/* http://viewportsizes.com */

export enum ViewSize {
  xxs = 'xxs',
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl',
  xxl = 'xxl',
}

export interface ViewSizeValue {
  minWidth: number;
  maxWidth: number;
}

export interface MediaQueryEvent extends Pick<MediaQueryListEvent, 'matches'> {
  readonly viewSize: ViewSize;
}

export type MediaQueryEventHandler = (event: MediaQueryEvent) => void;

export default abstract class MediaQueries {
  /** All values are unique. */
  static readonly viewSizeValues: Record<ViewSize, ViewSizeValue> = {
    [ViewSize.xxs]: { minWidth: 0, maxWidth: 479 },
    [ViewSize.xs]: { minWidth: 480, maxWidth: 767 },
    [ViewSize.s]: { minWidth: 768, maxWidth: 991 },
    [ViewSize.m]: { minWidth: 992, maxWidth: 1279 },
    [ViewSize.l]: { minWidth: 1280, maxWidth: 1919 },
    [ViewSize.xl]: { minWidth: 1920, maxWidth: 2559 },
    [ViewSize.xxl]: { minWidth: 2560, maxWidth: Number.MAX_SAFE_INTEGER },
  };

  /** Sorted values. See `viewSizeValues`. */
  static readonly viewSizeValueList = Object.entries(MediaQueries.viewSizeValues).sort(
    ([, a], [, b]) => a.minWidth - b.minWidth
  ) as readonly [ViewSize, ViewSizeValue][];

  static readonly queries: Readonly<
    Record<ViewSize, string>
  > = MediaQueries.viewSizeValueList.reduce((acc, [viewSize, { minWidth, maxWidth }]) => {
    acc[viewSize] = `only screen and (min-width: ${minWidth}px) and (max-width: ${maxWidth}px)`;
    return acc;
  }, {} as Record<ViewSize, string>);

  private static _currentViewSize: ViewSize | undefined;

  private static readonly mediaQueries: MediaQueryList[] = [];

  private static readonly listeners: Set<MediaQueryEventHandler> = new Set();

  static get isInitialized(): boolean {
    return this.mediaQueries.length > 0;
  }

  static get currentViewSize(): ViewSize {
    if (!this.isInitialized) {
      throw new Error('Media queries is not initialized. You should initialize it before.');
    }
    if (!this._currentViewSize) {
      throw new Error(
        `Media queries is not initialized properly. Current view size is ${this._currentViewSize}.`
      );
    }
    return this._currentViewSize;
  }

  static get currentViewSizeValue(): ViewSizeValue {
    return this.viewSizeValues[this.currentViewSize];
  }

  static addListener(listener: MediaQueryEventHandler): void {
    this.listeners.add(listener);
  }

  static removeListener(listener: MediaQueryEventHandler): boolean {
    return this.listeners.delete(listener);
  }

  /**
   * Init all media queries for handle changes.
   * Safe for multiple calls.
   */
  static init(): ViewSize {
    if (this.isInitialized) {
      return this.currentViewSize;
    }

    Object.entries(this.queries).forEach(([key, query]) => {
      const viewSize = key as ViewSize;
      const mq = window.matchMedia(query);
      this.mediaQueries.push(mq);
      mq.onchange = ({ matches }) => {
        if (matches) {
          this._currentViewSize = viewSize;
          // console.log(viewSize);
        }
        this.listeners.forEach(handle => handle({ viewSize, matches }));
      };
      // For initialize currentViewport with right value
      if (mq.matches) {
        this._currentViewSize = viewSize;
      }
    });

    return this.currentViewSize;
  }

  static destroy(): void {
    this.mediaQueries.splice(0, this.mediaQueries.length).forEach(mq => {
      // eslint-disable-next-line no-param-reassign
      mq.onchange = null;
    });
  }
}

/** Returns custom media queries like object `{ ['--xxs']: '(max-width: 479px)', ... }` */
export function exportMediaQueries(): Record<string, string> {
  return Object.entries(MediaQueries.queries).reduce(
    (acc, [key, value]) => ({ ...acc, [`--${key}`]: value }),
    {}
  );
}

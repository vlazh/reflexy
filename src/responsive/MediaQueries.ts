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

export interface MediaQueryEvent extends Pick<MediaQueryListEvent, 'matches'> {
  readonly viewSize: ViewSize;
}

export type MediaQueryEventHandler = (event: MediaQueryEvent) => void;

export default abstract class MediaQueries {
  static queries: Readonly<Record<ViewSize, string>> = Object.freeze({
    [ViewSize.xxs]: 'only screen and (max-width: 479px)',
    [ViewSize.xs]: 'only screen and (min-width: 480px) and (max-width: 767px)',
    [ViewSize.s]: 'only screen and (min-width: 768px) and (max-width: 991px)',
    [ViewSize.m]: 'only screen and (min-width: 992px) and (max-width: 1279px)',
    [ViewSize.l]: 'only screen and (min-width: 1280px) and (max-width: 1919px)',
    [ViewSize.xl]: 'only screen and (min-width: 1920px) and (max-width: 2559px)',
    [ViewSize.xxl]: 'only screen and (min-width: 2560px)',
  });

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

/* eslint-disable no-underscore-dangle */
import MediaQueryListener, {
  MediaQueryListenerOptions,
  MediaQueryEventHandler,
  ViewSize,
  ViewSizeValue,
} from './MediaQueryListener';

export * from './MediaQueryListener';

export type MediaQueryInitOptions = MediaQueryListenerOptions;

export default abstract class MediaQuery {
  private static _listener: MediaQueryListener;

  static get listener(): MediaQueryListener {
    if (!this._listener) {
      throw new Error('Media queries is not initialized. You should initialize it before.');
    }
    return this._listener;
  }

  static get isInitialized(): boolean {
    return this._listener != null;
  }

  static get currentViewSize(): ViewSize {
    return this.listener.currentViewSize;
  }

  static get currentViewSizeValue(): ViewSizeValue {
    return this.listener.currentViewSizeValue;
  }

  static addListener(listener: MediaQueryEventHandler): void {
    this.listener.addListener(listener);
  }

  static removeListener(listener: MediaQueryEventHandler): boolean {
    return this.listener.removeListener(listener);
  }

  /**
   * Init all media queries for handle changes.
   * Safe for multiple calls.
   */
  static init(options: MediaQueryInitOptions = {}): ViewSize {
    if (this.isInitialized) {
      return this.currentViewSize;
    }
    this._listener = new MediaQueryListener(options);
    return this.currentViewSize;
  }

  static destroy(): void {
    if (!this._listener) return;
    this._listener.destroy();
  }
}

/** Returns custom media queries like object `{ ['--xxs']: '(max-width: 479px)', ... }` */
export function exportMediaQueries(): Record<string, string> {
  return Object.entries(MediaQuery.listener.queries).reduce(
    (acc, [key, value]) => ({ ...acc, [`--${key}`]: value }),
    {}
  );
}

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

export const mediaQueries: Record<ViewSize, string> = Object.freeze({
  [ViewSize.xxs]: 'only screen and (max-width: 479px)',
  [ViewSize.xs]: 'only screen and (min-width: 480px) and (max-width: 767px)',
  [ViewSize.s]: 'only screen and (min-width: 768px) and (max-width: 991px)',
  [ViewSize.m]: 'only screen and (min-width: 992px) and (max-width: 1279px)',
  [ViewSize.l]: 'only screen and (min-width: 1280px) and (max-width: 1919px)',
  [ViewSize.xl]: 'only screen and (min-width: 1920px) and (max-width: 2559px)',
  [ViewSize.xxl]: 'only screen and (min-width: 2560px)',
});

let currentViewSize: ViewSize | undefined;
let initialized = false;

export function getCurrentViewSize(): typeof currentViewSize {
  return currentViewSize;
}

export function isInitialized(): typeof initialized {
  return initialized;
}

/** Init all media queries for handle changes */
export function initMediaQueries(onChange?: (viewSize: ViewSize, matches: boolean) => void): void {
  if (initialized) {
    console.warn('Media queries already initialized.');
    return;
  }

  Object.getOwnPropertyNames(mediaQueries).forEach(key => {
    const viewSize = key as ViewSize;
    const mq = window.matchMedia(mediaQueries[viewSize]);
    mq.addEventListener('change', event => {
      event.matches && changeViewSize(viewSize);
      onChange && onChange(viewSize, event.matches);
    });
    // Call listener explicitly at runtime for initialize currentViewport with right value
    mq.matches && changeViewSize(viewSize);
  });

  initialized = true;
}

function changeViewSize(viewSize: ViewSize): void {
  currentViewSize = viewSize;
}

/** Export map of custom media queries for using it in postcss-custom-media. */
export function exportMediaQueries(): Record<string, string> {
  return Object.getOwnPropertyNames(mediaQueries).reduce(
    (acc, key) => ({
      ...acc,
      [`--${key}`]: mediaQueries[key],
    }),
    {}
  );
}

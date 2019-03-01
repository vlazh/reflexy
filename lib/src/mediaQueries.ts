/* https://mediag.com/news/popular-screen-resolutions-designing-for-all/ */
/* http://screensiz.es/ */

export enum BreakpointGroup {
  Phone = 'phone',
  Tablet = 'tablet',
  Desktop = 'desktop',
}

export enum Breakpoint {
  PhoneS = 'phone-s',
  PhoneM = 'phone-m',
  PhoneL = 'phone-l',
  TabletS = 'tablet-s',
  TabletM = 'tablet-m',
  TabletL = 'tablet-l',
  DesktopS = 'desktop-s',
  DesktopM = 'desktop-m',
  DesktopL = 'desktop-l',
}

export type Breakpoints = BreakpointGroup | Breakpoint;

export interface CurrentBreakpoint {
  group: BreakpointGroup;
  value: Breakpoint;
}

export const mediaQueries = Object.freeze({
  [BreakpointGroup.Phone]: {
    [Breakpoint.PhoneS]:
      'only screen and (max-width: 320px) and (orientation: portrait), only screen and (max-height: 320px) and (orientation: landscape)',
    [Breakpoint.PhoneM]:
      'only screen and (min-width: 321px) and (max-width: 414px) and (orientation: portrait), only screen and (min-height: 321px) and (max-height: 414px) and (orientation: landscape)',
    [Breakpoint.PhoneL]:
      'only screen and (min-width: 415px) and (max-width: 480px) and (orientation: portrait), only screen and (min-height: 415px) and (max-height: 480px) and (orientation: landscape)',
  },
  [BreakpointGroup.Tablet]: {
    [Breakpoint.TabletS]:
      'only screen and (min-width: 481px) and (max-width: 600px) and (orientation: portrait), only screen and (min-height: 481px) and (max-height: 600px) and (orientation: landscape)',
    [Breakpoint.TabletM]:
      'only screen and (min-width: 601px) and (max-width: 768px) and (orientation: portrait), only screen and (min-height: 601px) and (max-height: 768px) and (orientation: landscape)',
    [Breakpoint.TabletL]:
      'only screen and (min-width: 769px) and (max-width: 1023px) and (orientation: portrait), only screen and (min-height: 769px) and (max-height: 1023px) and (orientation: landscape)',
  },
  [BreakpointGroup.Desktop]: {
    [Breakpoint.DesktopS]: 'only screen and (min-width: 1024px) and (max-width: 1366px)',
    [Breakpoint.DesktopM]: 'only screen and (min-width: 1367px) and (max-width: 1920px)',
    [Breakpoint.DesktopL]: 'only screen and (min-width: 1921px)',
  },
});

let currentBreakpoint: CurrentBreakpoint | undefined;

let initialized = false;

export function getCurrentBreakpoint(): typeof currentBreakpoint {
  return currentBreakpoint;
}

export function isInitialized(): typeof initialized {
  return initialized;
}

/** Init all media queries for handle changes */
export function initMediaQueries(onChange?: typeof changeBreakpoint): void {
  if (initialized) {
    console.warn('Media queries already initialized.');
    return;
  }

  Object.getOwnPropertyNames(mediaQueries).forEach(groupKey => {
    Object.getOwnPropertyNames(mediaQueries[groupKey]).forEach(key => {
      const mq = window.matchMedia(mediaQueries[groupKey][key]);
      mq.addEventListener('change', event => {
        changeBreakpoint(groupKey as BreakpointGroup, key as Breakpoint, event.matches);
        onChange && onChange(groupKey as BreakpointGroup, key as Breakpoint, event.matches);
      });
      // Call listener explicitly at runtime for initialize currentBreakpoint with right value
      mq.matches && changeBreakpoint(groupKey as BreakpointGroup, key as Breakpoint, mq.matches);
    });
  });

  initialized = true;
}

function changeBreakpoint(group: BreakpointGroup, bp: Breakpoint, matches: boolean): void {
  if (matches) {
    currentBreakpoint = { group, value: bp };
  }
}

/** Export map of custom media queries for using it in postcss-custom-media. */
export function exportMediaQueries(): Record<string, string> {
  return Object.getOwnPropertyNames(mediaQueries).reduce((resultMap, groupKey) => {
    const groupQuery = Object.getOwnPropertyNames(mediaQueries[groupKey])
      .map(key => mediaQueries[groupKey][key])
      .join(', ');

    const children = Object.getOwnPropertyNames(mediaQueries[groupKey]).reduce(
      (acc, key) => ({
        ...acc,
        [`--${key}`]: mediaQueries[groupKey][key],
      }),
      {}
    );

    return { ...resultMap, [`--${groupKey}`]: groupQuery, ...children };
  }, {});
}

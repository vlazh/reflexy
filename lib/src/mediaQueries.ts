/* https://mediag.com/news/popular-screen-resolutions-designing-for-all/ */
/* http://screensiz.es/ */

export enum BreakpointGroup {
  Phone = 'phone',
  Tablet = 'tablet',
  Desktop = 'desktop',
}

export enum Breakpoint {
  PhoneSm = 'phone-sm',
  PhoneMd = 'phone-md',
  PhoneLg = 'phone-lg',
  TabletSm = 'tablet-sm',
  TabletMd = 'tablet-md',
  TabletLg = 'tablet-lg',
  DesktopSm = 'desktop-sm',
  DesktopMd = 'desktop-md',
  DesktopLg = 'desktop-lg',
}

export type Breakpoints = BreakpointGroup | Breakpoint;

export const mediaQueries = Object.freeze({
  [BreakpointGroup.Phone]: {
    [Breakpoint.PhoneSm]:
      'only screen and (max-device-width: 320px) and (orientation: portrait), only screen and (max-device-height: 320px) and (orientation: landscape)',
    [Breakpoint.PhoneMd]:
      'only screen and (min-device-width: 321px) and (max-device-width: 414px) and (orientation: portrait), only screen and (min-device-height: 321px) and (max-device-height: 414px) and (orientation: landscape)',
    [Breakpoint.PhoneLg]:
      'only screen and (min-device-width: 415px) and (max-device-width: 480px) and (orientation: portrait), only screen and (min-device-height: 415px) and (max-device-height: 480px) and (orientation: landscape)',
  },
  [BreakpointGroup.Tablet]: {
    [Breakpoint.TabletSm]:
      'only screen and (min-device-width: 481px) and (max-device-width: 600px) and (orientation: portrait), only screen and (min-device-height: 481px) and (max-device-height: 600px) and (orientation: landscape)',
    [Breakpoint.TabletMd]:
      'only screen and (min-device-width: 601px) and (max-device-width: 768px) and (orientation: portrait), only screen and (min-device-height: 601px) and (max-device-height: 768px) and (orientation: landscape)',
    [Breakpoint.TabletLg]:
      'only screen and (min-device-width: 769px) and (max-device-width: 1023px) and (orientation: portrait), only screen and (min-device-height: 769px) and (max-device-height: 1023px) and (orientation: landscape)',
  },
  [BreakpointGroup.Desktop]: {
    [Breakpoint.DesktopSm]:
      'only screen and (min-device-width: 1024px) and (max-device-width: 1024px) and (orientation: portrait), only screen and (min-device-height: 1024px) and (max-device-height: 1024px) and (orientation: landscape)',
    [Breakpoint.DesktopMd]:
      'only screen and (min-device-width: 1025px) and (max-device-width: 1919px) and (orientation: portrait), only screen and (min-device-height: 1025px) and (max-device-height: 1919px) and (orientation: landscape)',
    [Breakpoint.DesktopLg]:
      'only screen and (min-device-width: 1920px) and (orientation: portrait), only screen and (min-device-height: 1920px) and (orientation: landscape)',
  },
});

let currentBreakpoint: { group: BreakpointGroup; value: Breakpoint } | undefined;

/** Init all media queries for handle changes */
export function initMediaQueries(onChange?: typeof changeBreakpoint) {
  if (currentBreakpoint != null) {
    console.warn('Media queries already initialized.');
    return;
  }
  // console.time('mq');
  Object.getOwnPropertyNames(mediaQueries).forEach(groupKey => {
    Object.getOwnPropertyNames(mediaQueries[groupKey]).forEach(key => {
      const mq = window.matchMedia(mediaQueries[groupKey][key]);
      mq.addEventListener('change', event => {
        changeBreakpoint(groupKey as BreakpointGroup, key as Breakpoint, event.matches);
        onChange && onChange(groupKey as BreakpointGroup, key as Breakpoint, event.matches);
      });
      // Call listener explicitly at runtime for initialize currentBreakpoint with right value
      changeBreakpoint(groupKey as BreakpointGroup, key as Breakpoint, mq.matches);
    });
  });
  // console.timeEnd('mq');
}

function changeBreakpoint(group: BreakpointGroup, bp: Breakpoint, matches: boolean) {
  console.log('changeBreakpoint', bp, matches);
  if (matches) {
    currentBreakpoint = { group, value: bp };
  }
}

export function getCurrentBreakpoint() {
  return currentBreakpoint;
}

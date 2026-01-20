import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ViewSize } from '@js-toolkit/web-utils/responsive/ViewSize';
import {
  getLastMergedBreakpointsValue,
  type Breakpoints,
  type BreakpointsMergeType,
  type MergeBreakpointsOptions,
} from '../responsive/utils';
import { stringAndBooleanConverter } from './converters';
import { MediaQueryController } from './MediaQueryController';

@customElement('flex-responsive-render')
export class FlexResponsiveRender
  extends LitElement
  implements
    Required<Breakpoints<boolean | undefined>>,
    Required<Pick<MergeBreakpointsOptions, 'merge'>>
{
  private readonly mq = new MediaQueryController(this);

  @property({ converter: stringAndBooleanConverter, reflect: true, useDefault: true })
  merge: boolean | BreakpointsMergeType = true;

  @property({ type: Boolean, reflect: true, useDefault: true })
  xxxxs: boolean | undefined;

  @property({ type: Boolean, reflect: true, useDefault: true })
  xxxs: boolean | undefined;

  @property({ type: Boolean, reflect: true, useDefault: true })
  xxs: boolean | undefined;

  @property({ type: Boolean, reflect: true, useDefault: true })
  xs: boolean | undefined;

  @property({ type: Boolean, reflect: true, useDefault: true })
  s: boolean | undefined;

  @property({ type: Boolean, reflect: true, useDefault: true })
  m: boolean | undefined;

  @property({ type: Boolean, reflect: true, useDefault: true })
  l: boolean | undefined;

  @property({ type: Boolean, reflect: true, useDefault: true })
  xl: boolean | undefined;

  @property({ type: Boolean, reflect: true, useDefault: true })
  xxl: boolean | undefined;

  @property({ type: Boolean, reflect: true, useDefault: true })
  xxxl: boolean | undefined;

  @property({ type: Boolean, reflect: true, useDefault: true })
  xxxxl: boolean | undefined;

  @property({ type: Boolean, reflect: true, useDefault: true })
  xxxxxl: boolean | undefined;

  get currentViewSize(): ViewSize {
    return this.mq.currentViewSize;
  }

  protected override render(): unknown {
    const render = getLastMergedBreakpointsValue(
      this.currentViewSize,
      { merge: this.merge, breakpoints: this },
      false
    );
    if (!render) return null;
    return html`<slot></slot>`;
  }
}

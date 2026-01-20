import type { PropertyValues } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  forEachBreakpoints,
  type Breakpoints,
  type BreakpointsMergeType,
  type MergeBreakpointsOptions,
} from '../responsive/utils';
import ViewSize from '../../../web-utils/src/responsive/ViewSize';
import { FlexBox } from './flex-box';
import { stringAndBooleanConverter } from './converters';
import { MediaQueryController } from './MediaQueryController';

type ClassProps = {
  [P in keyof Breakpoints as `class${Uppercase<P>}`]: string | undefined;
};

@customElement('flex-box-responsive')
export class FlexBoxResponsive
  extends FlexBox
  implements ClassProps, Required<Pick<MergeBreakpointsOptions, 'merge'>>
{
  private readonly mq = new MediaQueryController(this);
  private readonly classBreakpoints: Required<Breakpoints<string | undefined>>;
  private prevViewSize: ViewSize | undefined;
  private classes: Set<string> | undefined;

  @property({ converter: stringAndBooleanConverter, reflect: true })
  merge: boolean | BreakpointsMergeType = true;

  @property({ type: String, attribute: 'class-xxxxs', reflect: true })
  classXXXXS: string | undefined = undefined;

  @property({ type: String, attribute: 'class-xxxs', reflect: true })
  classXXXS: string | undefined = undefined;

  @property({ type: String, attribute: 'class-xxs', reflect: true })
  classXXS: string | undefined = undefined;

  @property({ type: String, attribute: 'class-xs', reflect: true })
  classXS: string | undefined = undefined;

  @property({ type: String, attribute: 'class-s', reflect: true })
  classS: string | undefined = undefined;

  @property({ type: String, attribute: 'class-m', reflect: true })
  classM: string | undefined = undefined;

  @property({ type: String, attribute: 'class-l', reflect: true })
  classL: string | undefined = undefined;

  @property({ type: String, attribute: 'class-xl', reflect: true })
  classXL: string | undefined = undefined;

  @property({ type: String, attribute: 'class-xxl', reflect: true })
  classXXL: string | undefined = undefined;

  @property({ type: String, attribute: 'class-xxxl', reflect: true })
  classXXXL: string | undefined = undefined;

  @property({ type: String, attribute: 'class-xxxxl', reflect: true })
  classXXXXL: string | undefined = undefined;

  @property({ type: String, attribute: 'class-xxxxxl', reflect: true })
  classXXXXXL: string | undefined = undefined;

  constructor() {
    super();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    this.classBreakpoints = {
      get xxxxs() {
        return self.classXXXXS;
      },
      get xxxs() {
        return self.classXXXS;
      },
      get xxs() {
        return self.classXXS;
      },
      get xs() {
        return self.classXS;
      },
      get s() {
        return self.classS;
      },
      get m() {
        return self.classM;
      },
      get l() {
        return self.classL;
      },
      get xl() {
        return self.classXL;
      },
      get xxl() {
        return self.classXXL;
      },
      get xxxl() {
        return self.classXXXL;
      },
      get xxxxl() {
        return self.classXXXXL;
      },
      get xxxxxl() {
        return self.classXXXXXL;
      },
    };
  }

  protected override updated(changedProperties: PropertyValues<this>): void {
    if (
      this.prevViewSize !== this.mq.currentViewSize ||
      changedProperties.keys().some((k) => typeof k === 'string' && k.startsWith('class'))
    ) {
      this.prevViewSize = this.mq.currentViewSize;

      const newClasses = forEachBreakpoints(
        this.mq.currentViewSize,
        this.classBreakpoints,
        this.merge,
        (value, acc) => {
          if (value) {
            acc.add(value);
          }
          return acc;
        },
        new Set<string>()
      );

      const removed = this.classes?.difference(newClasses);
      removed && removed.size > 0 && removed.forEach((cls) => this.classList.remove(cls));

      newClasses.forEach((cls) => this.classList.add(cls));
      this.classes = newClasses;

      // console.log('Updated classes:', this.classes);
    }

    super.updated(changedProperties);
  }
}

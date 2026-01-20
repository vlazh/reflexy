import type { ReactiveController, ReactiveControllerHost } from 'lit';
import type { ViewSize } from '@js-toolkit/web-utils/responsive/ViewSize';
import {
  MediaQuery,
  type MediaQueryEventHandler,
} from '@js-toolkit/web-utils/responsive/MediaQuery';

export class MediaQueryController implements ReactiveController {
  private changeHandler: MediaQueryEventHandler = ({ matches }) => {
    matches && this.host.requestUpdate();
  };

  constructor(private host: ReactiveControllerHost) {
    host.addController(this);
    MediaQuery.init();
  }

  // eslint-disable-next-line class-methods-use-this
  get currentViewSize(): ViewSize {
    return MediaQuery.currentViewSize;
  }

  hostConnected(): void {
    MediaQuery.addListener(this.changeHandler);
  }

  hostDisconnected(): void {
    MediaQuery.removeListener(this.changeHandler);
  }
}

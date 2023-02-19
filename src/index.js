import { atob as _atob } from 'abab';
import _XMLHttpRequest from './XMLHttpRequest';
import _TextDecoder from './TextDecoder';
import copyProperties from './copyProperties';
import EventTarget from './EventTarget';

export function createScopedThreejs(canvas) {
  Object.defineProperty(canvas, 'style', {
    get() {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
      };
    },
  });

  Object.defineProperty(canvas, 'clientHeight', {
    get() {
      return this.height;
    },
  });

  Object.defineProperty(canvas, 'clientWidth', {
    get() {
      return this.width;
    },
  });

  copyProperties(canvas.constructor.prototype, EventTarget.prototype);

  // eslint-disable-next-line
  const document = {
    createElementNS(_, type) {
      if (type === 'canvas') return canvas;
      if (type === 'img') return canvas.createImage();
    },
  };
  copyProperties(document.constructor.prototype, EventTarget.prototype);

  // eslint-disable-next-line
  const window = {
    AudioContext: function () {},
    URL: {},
  };
  copyProperties(window.constructor.prototype, EventTarget.prototype);

  // eslint-disable-next-line
  const atob = (a) => {
    return _atob(a);
  };

  // eslint-disable-next-line
  const XMLHttpRequest = _XMLHttpRequest;

  // eslint-disable-next-line
  const TextDecoder = _TextDecoder;

  const exports = {
    TextDecoder,
  };

  // eslint-disable-next-line
  const HTMLCanvasElement = undefined;

  // three.js source code will be injected here
  // eslint-disable-next-line
  __INJECT_THREE__;

  return exports;
}

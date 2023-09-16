import { capitalize } from './utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener');
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);

      if (!this[method]) {
        throw new Error(`method ${method} is not implemented in ${this.name} Component`);
      }

      this.$root.on(listener, this[method].bind(this));
      // return `on${listener[0].toUpperCase().slice(2)}`;
    });
  }
  removeDOMListeners() {}
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}

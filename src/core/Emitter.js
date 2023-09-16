export class Emitter {
  constructor() {
    this.listeners = {};
  }

  // dispatch, fire, trigger
  emit(event, ...args) {
    if (Array.isArray(this.listeners[event])) {
      this.listeners[event].forEach((listener) => listener(...args));
    } else return false;
  }

  // on, listen
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);

    const unsubscribe = () => {
      this.listeners[event] = this.listeners[event].filter((listener) => listener !== fn);
    };
    return unsubscribe;
  }
}

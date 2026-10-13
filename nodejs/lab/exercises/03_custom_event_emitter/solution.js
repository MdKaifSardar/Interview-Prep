// solution.js
class MyEventEmitter {
  constructor() {
    this._events = new Map();
  }

  on(event, listener) {
    if (typeof listener !== 'function') throw new TypeError('Listener must be a function');
    if (!this._events.has(event)) {
      this._events.set(event, []);
    }
    this._events.get(event).push(listener);
    return this;
  }

  emit(event, ...args) {
    const listeners = this._events.get(event);
    if (!listeners || listeners.length === 0) return false;
    // Clone array so listeners removing themselves don't affect iteration
    [...listeners].forEach((fn) => fn(...args));
    return true;
  }

  once(event, listener) {
    if (typeof listener !== 'function') throw new TypeError('Listener must be a function');
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener(...args);
    };
    wrapper._original = listener;
    return this.on(event, wrapper);
  }

  off(event, listener) {
    const listeners = this._events.get(event);
    if (!listeners) return this;
    const index = listeners.findIndex((fn) => fn === listener || fn._original === listener);
    if (index !== -1) {
      listeners.splice(index, 1);
      if (listeners.length === 0) this._events.delete(event);
    }
    return this;
  }

  listenerCount(event) {
    const listeners = this._events.get(event);
    return listeners ? listeners.length : 0;
  }
}

module.exports = { MyEventEmitter };

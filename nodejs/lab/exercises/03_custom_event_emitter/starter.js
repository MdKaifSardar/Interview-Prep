// starter.js
class MyEventEmitter {
  constructor() {
    this._events = new Map();
  }

  on(event, listener) {
    // TODO
    if(!listener.type === 'function'){
      throw new TypeError ('listener must be a function');
    }

    if(!this._events.has(event)){
      this._events.set(event, []);
    }
    this._events.get(event).push(listener);
  }

  emit(event, ...args) {
    const listeners = this._events.get(event);
    if (!listeners || listeners.length === 0) return false;
    if(listeners.length === 0){
      this._events.set(event, []);
    }
    this._events.get(event).forEach((fn) => fn(...args));
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

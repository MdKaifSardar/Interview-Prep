// starter.js
class MyEventEmitter {
  constructor() {
    // TODO: Initialize events map
  }

  on(event, listener) {
    // TODO
  }

  emit(event, ...args) {
    // TODO: Returns boolean indicating if event had listeners
  }

  once(event, listener) {
    // TODO: Calls listener at most once, then removes it
  }

  off(event, listener) {
    // TODO: Removes specific listener
  }

  listenerCount(event) {
    // TODO: Returns count of listeners
  }
}

module.exports = { MyEventEmitter };

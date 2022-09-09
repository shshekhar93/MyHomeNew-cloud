import { createContext, useContext } from "react";

class Store {
  #data = {};
  /**
   * @type {Object.<string, Function[]>}
   */
  #eventHandlers = {};

  get(key, defaultValue = null) {
    return this.#data[key] || defaultValue;
  }

  set(key, value) {
    this.#data[key] = value;

    const handlers = this.#eventHandlers[key];
    if(handlers) {
      handlers.forEach(handler => {
        setTimeout(handler.bind(null, value, key), 1);
      });
    }
  }

  subscribe(key, handler) {
    let handlers = this.#eventHandlers[key];
    if(!handlers) {
      handlers = [];
    }
    this.#eventHandlers[key] = [...handlers, handler];
  }

  unsubscribe(key, handler) {
    let handlers = this.#eventHandlers[key];;
    if(!handlers) {
      return;
    } 

    this.#eventHandlers[key] = handlers.filter(h => h !== handler);
  }
}

const StoreContext = createContext();

/**
 * 
 * @returns {Store}
 */
function useStore() {
  return useContext(StoreContext);
}

export {
  Store,
  StoreContext,
  useStore,
};

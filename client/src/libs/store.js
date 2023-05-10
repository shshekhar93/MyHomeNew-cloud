import { createContext, useContext, useEffect, useMemo, useState } from "react";

class Store {
  #data = {};
  /**
   * @type {Object.<string, Function[]>}
   */
  #eventHandlers = {};

  get(key, defaultValue = null) {
    const result = this.#data[key];
    return (result === undefined || result === null) ? defaultValue : result;
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

/**
 * 
 * @param {string|string[]} storeProp 
 * @returns 
 */
function useStoreValue(storeProp) {
  const [, rerenderer] = useState(0);
  const store = useStore();

  const normalizedStoreProp = useMemo(() => {
    if(!Array.isArray(storeProp)) {
      return [ storeProp ];
    }
    return storeProp;
  }, [storeProp]);

  useEffect(() => {
    const handler = () => rerenderer(Date.now());
    store.subscribe(normalizedStoreProp, handler);

    return () => store.unsubscribe(normalizedStoreProp, handler);
  }, [store, normalizedStoreProp]);

  const singleValue = storeProp !== normalizedStoreProp;

  return singleValue?
    store.get(storeProp) :
    normalizedStoreProp.map(prop => store.get(prop));
}

export {
  Store,
  StoreContext,
  useStore,
  useStoreValue,
};

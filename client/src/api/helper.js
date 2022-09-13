import { useCallback, useEffect, useState } from "react";
import { ERRORS } from "../libs/constants";
import { useStore } from "../libs/store";

const PAYLOAD_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

const NO_PAYLOAD_METHODS = ['GET'];

async function httpRequest(method, path, body, headers) {
  const sendPayload = !NO_PAYLOAD_METHODS.includes(method);
  const resp = await fetch(path, {
    method,
    credentials: 'same-origin',
    headers: {
      ...(sendPayload ? PAYLOAD_HEADERS : {}),
      ...headers,
    },
    body: sendPayload ? JSON.stringify(body) : undefined,
  });

  if (resp.ok) {
    return resp.json();
  }

  if (resp.status === 401) {
    throw ERRORS.UNAUTHORIZED;
  }

  throw ERRORS.SERVER_ERROR;
}

function getRequest(path, headers) {
  return httpRequest('GET', path, null, headers);
}

function postRequest(path, body, headers) {
  return httpRequest('POST', path, body, headers);
}

const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
};

const HTTP_METHOD_FUNCTION_MAP = {
  [HTTP_METHODS.GET]: getRequest,
  [HTTP_METHODS.POST]: postRequest,
};

/**
 * Generic function to create a hook for calling API in standard way.
 * 
 * @template T
 * @typedef {Object} APIResponse
 * @property {boolean} loading True, if the api call is in progress
 * @property {boolean} error True, if the last API call failed
 * @property {T} result Result of the API call. 
 * 
 * @param {string} storeProp The prop corresponding to this API in store
 * @param {string} path Path of the API
 * @param {string} method HTTP Method, default to GET
 * @returns {[APIResponse.<T>, Function]}
 */
function useAPI(storeProp, path, method = HTTP_METHODS.GET/*, requestFn*/) {
  const [, rerenderer] = useState(0);
  const store = useStore();

  const callAPI = useCallback(async () => {
    store.set(storeProp, {
      loading: true,
    });

    try {
      const callerFn = HTTP_METHOD_FUNCTION_MAP[method]
      const result = await callerFn(path);

      store.set(storeProp, {
        result,
        loading: false,
      });
    }
    catch(e) {
      store.set(storeProp, {
        error: true,
        loading: false,
      });
    }
  }, [store, storeProp, method, path]);

  useEffect(() => {
    const handler = () => rerenderer(Date.now());
    store.subscribe(storeProp, handler);

    // Trigger first load
    callAPI();

    return () => store.unsubscribe(storeProp, handler);
  }, [store, storeProp, callAPI]);

  return [
    store.get(storeProp, {}),
    callAPI,
  ];
}

export {
  getRequest,
  postRequest,
  useAPI,
  HTTP_METHODS,
};

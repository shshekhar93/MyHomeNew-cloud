import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import './index.css';
import { Root } from './components/root';
import { Store, StoreContext } from './libs/store';

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

// 1. Create a client engine instance
const engine = new Styletron();

const store = new Store();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StyletronProvider value={engine} debug={debug} debugAfterHydration>
      <StoreContext.Provider value={store}>
        <Root />
      </StoreContext.Provider>
    </StyletronProvider>
  </React.StrictMode>
);

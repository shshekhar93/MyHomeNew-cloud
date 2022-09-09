import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import './index.css';
import { Root } from './components/root';

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

// 1. Create a client engine instance
const engine = new Styletron();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StyletronProvider value={engine} debug={debug} debugAfterHydration>
      <Root />
    </StyletronProvider>
  </React.StrictMode>
);

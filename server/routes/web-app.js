import { statSync } from 'fs';
import express, { Router } from 'express';

const router = new Router();

const webappURL = new URL('../web-app', import.meta.url);

const webAppExists = (() => {
  try {
    statSync(webappURL);
    return true;
  }
  catch(e) {
    return false;
  }
})();

if(webAppExists) {
  router.use(express.static(webappURL.pathname));
}

export { router };

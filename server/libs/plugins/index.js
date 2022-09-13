import {initialize as initializeFileTypesPlugin} from './file-types/index.js';

//@TODO: Auto require all plugins in this folder and initialize them.

async function initializePlugins() {
  return initializeFileTypesPlugin();
}


export {
  initializePlugins,
};

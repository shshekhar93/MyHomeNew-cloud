import { getAllOtherFilesInDir } from '../../utils.js';

const DEFAULT_FILE_TYPE = {
  category: 'UNKNOWN',
  contentType: 'application/octet-stream',
};

let fileTypePlugins;

async function initialize() {
  const files = getAllOtherFilesInDir(import.meta.url);
  fileTypePlugins = await Promise.all(
    files.map(file => import(`./${file}`)),
  );
}

async function checkFileType(path) {
  if(!fileTypePlugins) {
    throw new Error('FILE_TYPE_PLUGIN_NOT_INITIALIZED');
  }

  for(let plugin of fileTypePlugins) {
    const result = await plugin.check(path);

    if(result) {
      return result;
    }
  }

  return DEFAULT_FILE_TYPE;
} 

export {
  initialize,
  checkFileType,
};

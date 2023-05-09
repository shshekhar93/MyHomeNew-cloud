import { join } from 'path';
import { config } from '../../config/index.js';
import { ENTRY_TYPES, ERRORS } from '../../libs/constants.js';
import { ensureTrailingSlash } from '../../libs/utils.js';
import { getAllEntriesByPath } from '../../libs/database/index.js';

const SHARE_NAME_REGEX = /^(.+)\$(\/.*)$/;

async function getIndex(path) {
  const {
    directories,
  } = config;
  
  path = ensureTrailingSlash(path || '');
  const [
    ,
    share,
    relativePath,
  ] = path.match(SHARE_NAME_REGEX) || [];

  if(!share || !directories[share]) {
    throw ERRORS.INVALID_PATH;
  }
  
  const fullPath = join(directories[share], relativePath);

  try {
    const result = await getAllEntriesByPath(fullPath);
    return {
      path: fullPath,
      directories: result.filter(({ type }) => type === ENTRY_TYPES.DIR),
      files: result.filter(({ type }) => type === ENTRY_TYPES.FILE),
    };
  }
  catch(e) {
    if(e.code === 'ENOENT') {
      throw ERRORS.NOT_FOUND;
    }
    throw e;
  }
}

export {
  getIndex,
};
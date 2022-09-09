import { readFile } from 'fs/promises';
import { join } from 'path';
import { config } from '../../config/index.js';
import { ERRORS } from '../../libs/constants.js';
import { ensureTrailingSlash, sha256 } from '../../libs/utils.js';

const SHARE_NAME_REGEX = /^(.+)\$\/(.+)$/;

async function getIndex(path) {
  const {
    indexDir,
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
  const indexFilename = sha256(fullPath);
  const indexPath = join(indexDir, indexFilename);

  try {
    return JSON.parse(
      await readFile(indexPath, 'utf8'),
    );
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
import { URL } from 'url';
import { join } from 'path';
import { readdir, writeFile  } from 'fs/promises';
import { config } from '../../config/index.js';
import { logError } from '../logger.js';
import { sha256 } from '../utils.js';
import { checkFileType } from '../plugins/file-types/index.js';

let isWalking = false;

function isReady() {
  return !isWalking;
}

// TODO: Parallelize in batch with use of queue.
async function generateIndex(dir) {
  try {
    const dirURL = new URL(dir, import.meta.url);
    const entries = await readdir(dirURL, {
      encoding: 'utf8',
      withFileTypes: true,
    });

    const directories = entries
      .filter(e => e.isDirectory())
      .map(({name}) => ({
        name,
        path: decodeURIComponent(new URL(`${name}/`, dirURL).pathname),
      }));
    
    const files = entries
      .filter(e => e.isFile())
      .map(({name}) => ({
        name,
        path: decodeURIComponent(new URL(name, dirURL).pathname),
      }));
    
    for(let file of files) {
      Object.assign(file, await checkFileType(file.path));
    }

    const index = {
      path: dirURL.pathname,
      directories,
      files,
    };

    const indexFilename = sha256(decodeURIComponent(dirURL.pathname));
    const indexPath = new URL(join(config.indexDir, indexFilename), import.meta.url);
    const indexData = JSON.stringify(index);

    // TODO: add retry capability
    await writeFile(indexPath, indexData, {
      encoding: 'utf8',
    });

    for(let directory of directories) {
      await generateIndex(directory.path);
    }
  }
  catch(e) {
    logError(`Unable to read (${dir}) :: ${e.code} - ${e.stack}`);
  }
}

async function createIndex() {
  const {
    directories,
  } = config;

  isWalking = true;

  for(let directory of Object.values(directories)) {
    await generateIndex(directory);
  }

  isWalking = false;
}

export {
  isReady,
  createIndex,
  generateIndex,
};

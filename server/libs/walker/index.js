import { URL } from 'url';
import { readdir  } from 'fs/promises';
import { config } from '../../config/index.js';
import { logError } from '../logger.js';
import { checkFileType } from '../plugins/file-types/index.js';
import { insertDirEntry, insertFileEntry, updateAppSetting } from '../database/index.js';
import { APP_SETTINGS } from '../constants.js';

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
      .filter(e => e.isDirectory());
    
    for(const { name } of directories) {
      await insertDirEntry({
        name,
        path: dirURL.pathname,
      }).catch(
        err => console.log(`Error while saving (${dirURL.pathname}${name}) :: ${err.code} :: ${err.message}`),
      );
    }
    
    const files = entries
      .filter(e => e.isFile());
    
    for(const { name } of files) {
      const fileType = await checkFileType(decodeURIComponent(new URL(`${name}/`, dirURL).pathname));
      await insertFileEntry({
        ...fileType,
        name,
        path: dirURL.pathname,
      }).catch(
        err => console.log(`Error while saving (${dirURL.pathname}${name}) :: ${err.code} :: ${err.message}`),
      );
    }

    for(let { name } of directories) {
      await generateIndex(decodeURIComponent(new URL(`${name}/`, dirURL).pathname));
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

  const refreshFinishedAt = String(Math.floor(Date.now() / 1000));
  await updateAppSetting(APP_SETTINGS.LAST_REFRESHED_AT, refreshFinishedAt);

  isWalking = false;
}

export {
  isReady,
  createIndex,
  generateIndex,
};

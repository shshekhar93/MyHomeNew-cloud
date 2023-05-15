import { join } from 'path';
import { createReadStream } from 'fs';
import { config } from '../../config/index.js';
import { APP_SETTINGS, ENTRY_TYPES, ERRORS, INDEX_STATUS } from '../../libs/constants.js';
import { getAllFilesByCategory, getAllFilesByTag, getEntryById, getSettingValue } from '../../libs/database/index.js';
import { createIndex, isReady } from '../../libs/walker/index.js';
import { getIndex } from './directories.js';
import { md5 } from '../../libs/utils.js';
import { createThumbnail } from '../../libs/file-processors/thumbnail.js';
import { stat } from 'fs/promises';

async function generateEtag() {
  return md5(await getSettingValue(APP_SETTINGS.LAST_REFRESHED_AT));
}

async function handleEtagMatch(req, res, eTag) {
  const eTagFromClient = req.get('if-none-match');
  if(eTagFromClient === eTag) {
    res.status(304).end();
    return true;
  }
  return false;
}

function refreshIndex(req, res) {
  createIndex();
  res.json({
    status: INDEX_STATUS.IN_PROGRESS,
  });
}

async function getShares(req, res) {
  const directories = Object.keys(config.directories)
    .map(name => ({
      name: `${name}$`,
      path: `${name}$`,
    }));
  res.json({ directories });
}

async function readdir(req, res) {
  const {
    path,
  } = req.query;

  try {
    if(!path) {
      throw ERRORS.INVALID_PATH;
    }

    const eTag = await generateEtag();
    if(await handleEtagMatch(req, res, eTag)) {
      return;
    }

    res.set('ETag', eTag);
    res.json(await getIndex(path));
  }
  catch(e) {
    res.status(400).json({
      error: e.code || e.message,
    });
  }
}

export async function getFilesByCategory(req, res) {
  const category = req.params.category;
  try {
    if(!category) {
      throw ERRORS.NOT_FOUND;
    }

    const eTag = await generateEtag();
    if(await handleEtagMatch(req, res, eTag)) {
      return;
    }

    res.set('ETag', eTag);
    res.json(await getAllFilesByCategory(category));
  }
  catch(e) {
    const code = e === ERRORS.NOT_FOUND ? 404 : 500;
    return res.status(code).json({
      error: e.code || e.message,
    });
  }
}

export async function getFilesByTag(req, res) {
  const tag = req.params.tag;
  try {
    if(!tag) {
      return res.status(400).json({
        error: ERRORS.NOT_FOUND,
      });
    }

    const eTag = await generateEtag();
    if(await handleEtagMatch(req, res, eTag)) {
      return;
    }

    res.set('ETag', eTag);
    res.json(await getAllFilesByTag(tag));
  }
  catch(e) {
    const code = e === ERRORS.NOT_FOUND ? 404 : 500;
    return res.status(code).json({
      error: e.code || e.message,
    });
  }
}

async function thumbnail(req, res) {
  const id = req.params.id;
  try {
    if(!id) {
      throw ERRORS.NOT_FOUND;
    }

    const entry = await getEntryById(id);
    if(entry?.type !== ENTRY_TYPES.FILE || entry?.category !== 'IMAGE') {
      throw ERRORS.NOT_FOUND;
    }

    const fullPath = join(entry.path, entry.name);
    const filePathHash = md5(fullPath);
    const thumbnailPath = join(config.indexDir, 'thumbnails', filePathHash);

    // @TODO: Fix this implementation, it will return old if file changes with same name.
    if(await handleEtagMatch(req, res, filePathHash)) {
      return;
    }

    const fileStream = createReadStream(thumbnailPath);
    fileStream.on('error', async (err) => {
      if(err.code === 'ENOENT') {
        const thumbnailBuf = await createThumbnail(fullPath, thumbnailPath);
        res.set('Content-Type', 'image/webp');
        res.send(thumbnailBuf);
        return;
      }
      //Log error first.
      res.status(500).json({
        error: ERRORS.SYSTEM_ERROR.message,
      });
    });

    res.set('ETag', filePathHash);
    fileStream.pipe(res);
  }
  catch(e) {
    const code = e === ERRORS.NOT_FOUND ? 404 : 500;
    return res.status(code).json({
      error: e.code || e.message,
    });
  }
}

async function readfile(req, res) {
  const { id } = req.params;
  
  try {
    const entry = await getEntryById(id);
  
    if(entry?.type !== ENTRY_TYPES.FILE) {
      throw ERRORS.NOT_FOUND;
    }

    const filePath = join(entry.path, entry.name);
    const metadata = await stat(filePath);
    const eTag = md5(String(Math.floor(metadata.mtimeMs / 1000)));

    if(await handleEtagMatch(req, res, eTag)) {
      return;
    }

    const stream = createReadStream(filePath);

    stream.on('error', (/*err*/) => {
      // Streaming error occured. Send 404 if response not already sent.
      if(!res.headersSent) {
        res.status(500).json({
          error: ERRORS.SYSTEM_ERROR.message,
        });
      }
    });
    
    if(entry.contentType) {
      res.set('Content-Type', entry.contentType);
    }
    res.set('ETag', eTag);
    stream.pipe(res);
  }
  catch(e) {
    console.log(e.stack);
    const code = e === ERRORS.NOT_FOUND ? 404 : 500;
    return res.status(code).json({
      error: e.code || e.message,
    });
  }
}

function indexStatus(req, res) {
  const isIndexReady = isReady();

  res.json({
    status: isIndexReady? INDEX_STATUS.READY: INDEX_STATUS.IN_PROGRESS,
  });
}

export {
  refreshIndex,
  getShares,
  readdir,
  readfile,
  thumbnail,
  indexStatus,
};

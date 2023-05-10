import { join } from 'path';
import { createReadStream } from 'fs';
import { config } from '../../config/index.js';
import { ENTRY_TYPES, ERRORS, INDEX_STATUS } from '../../libs/constants.js';
import { getAllFilesByCategory, getAllFilesByTag, getEntryById } from '../../libs/database/index.js';
import { createIndex, isReady } from '../../libs/walker/index.js';
import { getIndex } from './directories.js';

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
  if(!category) {
    return res.status(400).json({
      error: ERRORS.NOT_FOUND,
    });
  }
  res.json(await getAllFilesByCategory(category));
}

export async function getFilesByTag(req, res) {
  const tag = req.params.tag;
  if(!tag) {
    return res.status(400).json({
      error: ERRORS.NOT_FOUND,
    });
  }
  res.json(await getAllFilesByTag(tag));
}

function thumbnail(req, res) {
  res.json({});
}

async function readfile(req, res) {
  const { id } = req.params;
  const entry = await getEntryById(id);

  if(!entry || entry.type !== ENTRY_TYPES.FILE) {
    return res.status(400).json({
      error: ERRORS.NOT_FOUND,
    });
  }
  
  try {
    const stream = createReadStream(join(entry.path, entry.name));
    
    if(entry.contentType) {
      res.set('Content-Type', entry.contentType);
    }

    stream.pipe(res);
  }
  catch(e) {
    // log error
    return res.status(500).json({
      error: ERRORS.SYSTEM_ERROR,
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

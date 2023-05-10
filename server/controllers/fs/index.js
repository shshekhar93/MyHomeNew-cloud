import { config } from '../../config/index.js';
import { ERRORS, INDEX_STATUS } from '../../libs/constants.js';
import { getAllFilesByCategory, getAllFilesByTag } from '../../libs/database/index.js';
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

function readfile(req, res) {
  res.json({});
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

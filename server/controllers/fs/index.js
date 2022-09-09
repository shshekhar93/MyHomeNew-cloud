import { ERRORS, INDEX_STATUS } from '../../libs/constants.js';
import { createIndex, isReady } from '../../libs/walker/index.js';
import { getIndex } from './directories.js';

function refreshIndex(req, res) {
  createIndex();
  res.json({
    status: INDEX_STATUS.IN_PROGRESS,
  });
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
  readdir,
  readfile,
  thumbnail,
  indexStatus,
};

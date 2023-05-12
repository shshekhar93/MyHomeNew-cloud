import { Router } from 'express';
import {
  getShares,
  indexStatus,
  readdir,
  getFilesByCategory,
  readfile,
  refreshIndex,
  thumbnail,
  getFilesByTag,
} from '../controllers/fs/index.js';

const router = new Router();

router.get('/refresh-index', refreshIndex);
router.get('/index-status', indexStatus);
router.get('/shares', getShares);
router.get('/readdir', readdir);
router.get('/category/:category', getFilesByCategory);
router.get('/tag/:tag', getFilesByTag);
router.get('/file/by-id/:id', readfile);
router.get('/thumbnail/by-id/:id', thumbnail);

export {
  router,
};

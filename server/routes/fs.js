import { Router } from 'express';
import {
  getShares,
  indexStatus,
  readdir,
  readfile,
  refreshIndex,
  thumbnail,
} from '../controllers/fs/index.js';

const router = new Router();

router.get('/refresh-index', refreshIndex);
router.get('/index-status', indexStatus);
router.get('/shares', getShares);
router.get('/readdir', readdir);
router.get('/readfile', readfile);
router.get('/thumbnail', thumbnail);

export {
  router,
};

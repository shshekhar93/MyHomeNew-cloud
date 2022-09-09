import { Router } from 'express';
import {
  indexStatus,
  readdir,
  readfile,
  refreshIndex,
  thumbnail,
} from '../controllers/fs/index.js';

const router = new Router();

router.use('/refresh-index', refreshIndex);
router.use('/index-status', indexStatus);
router.use('/readdir', readdir);
router.use('/readfile', readfile);
router.use('/thumbnail', thumbnail);

export {
  router,
};

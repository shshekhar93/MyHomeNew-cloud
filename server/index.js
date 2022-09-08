import express from 'express';
import bodyParser from 'body-parser';
import { logInfo } from './libs/logger.js';

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logInfo(`App started on port ${port}`);
});

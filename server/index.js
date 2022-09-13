import express from 'express';
import bodyParser from 'body-parser';
import { logInfo } from './libs/logger.js';
import { useRoutes } from './routes/index.js';
import { initializePlugins } from './libs/plugins/index.js';

const app = express();
app.use(bodyParser.json());

(async () => {
  await initializePlugins();
  await useRoutes(app);

  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    logInfo(`App started on port ${port}`);
  });
})();

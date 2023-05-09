import { getAllOtherFilesInDir } from '../libs/utils.js';

async function useRoutes(app) {
  const files = getAllOtherFilesInDir(import.meta.url);
  const routes = await Promise.all(
    files.map(file => import(`./${file}`)),
  );

  routes.forEach(({ router }) => app.use(router));
}

export {
  useRoutes,
};

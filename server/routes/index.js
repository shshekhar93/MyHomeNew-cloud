import { readdirSync } from 'fs';
import { dirname } from 'path';
import { URL } from 'url';

function allFiles () {
  const dir = dirname(import.meta.url);
  
  return readdirSync(new URL(dir))
    .filter(name => name !== 'index.js');
}

async function useRoutes(app) {
  const files = allFiles();
  const routes = await Promise.all(
    files.map(file => import(`./${file}`)),
  );

  routes.forEach(({ router }) => app.use(router));
}

export {
  useRoutes,
};

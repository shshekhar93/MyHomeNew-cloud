import { URL } from 'url';
import { readFileSync } from 'fs';

const configFile = new URL('./config.json', import.meta.url).pathname;
const config = JSON.parse(readFileSync(configFile, 'utf8'));

export {
  config,
};

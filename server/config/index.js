import { URL } from 'url';
import { readFile } from 'fs';

const configFile = new URL('../config.json', import.meta.url).pathname;
const config = JSON.parse(readFile(configFile, 'utf8'));

export {
  config
};

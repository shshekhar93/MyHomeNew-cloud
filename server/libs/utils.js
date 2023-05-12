import { readdirSync } from 'fs';
import { createHash } from 'crypto';
import { basename, dirname } from 'path';
import { URL } from 'url';

/**
 * 
 * @param {arr} arr Array to iterate over
 * @param {Function} fn The function to be executed
 * @param {AsyncMapOptions} opts The options
 */
export async function asyncMap(arr, fn, opts = {}) {
  const {
    concurrency = 0,
  } = opts;

  if(concurrency === 0) {
    return Promise.all(arr.map(fn));
  }

  let i = 0;
  const result = Array(arr.length);
  async function evaluateNext(index) {
    result[index] = await fn(arr[index]);
    
    if(i < arr.length) {
      await evaluateNext(i++);
    }
  }
  await Promise.all(
    range(concurrency).map(() => evaluateNext(i++)),
  );
  return result;
}

export function range(count, start = 1) {
  return Array(count).fill().map((_, idx) => start + idx);
}

export function delay(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

export function ensureTrailingSlash(path) {
  if(path.endsWith('/')) {
    return path;
  }

  return `${path}/`;
}

export function getAllOtherFilesInDir(filename) {
  const dir = dirname(filename);
  const file = basename(filename);

  return readdirSync(new URL(dir))
    .filter(name => name !== file);
}

export function fromCallback(fn) {
  return new Promise((resolve, reject) => {
    fn((err, result) => {
      if(err) {
        return reject(err);
      }
      resolve(result);
    });
  });
}

export function toCamelCase(str) {
  return str.toLowerCase().replace(/[_]+(.)/g, (_, chr) => chr.toUpperCase());
}

export function md5(str) {
  return createHash('md5')
    .update(str)
    .digest('hex');
}

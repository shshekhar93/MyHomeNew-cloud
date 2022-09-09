import { createHmac } from 'crypto';

/**
 * 
 * @param {arr} arr Array to iterate over
 * @param {Function} fn The function to be executed
 * @param {AsyncMapOptions} opts The options
 */
async function asyncMap(arr, fn, opts = {}) {
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

function range(count, start = 1) {
  return Array(count).fill().map((_, idx) => start + idx);
}

function delay(millis) {
  return new Promise((resolve) => setTimeout(resolve, millis));
}

function sha256(str, secret = 'Keyboard cat') {
  const hasher = createHmac('sha256', secret);
  return hasher.update(str).digest('hex');
}

function ensureTrailingSlash(path) {
  if(path.endsWith('/')) {
    return path;
  }

  return `${path}/`;
}

export {
  asyncMap,
  range,
  delay,
  sha256,
  ensureTrailingSlash,
};

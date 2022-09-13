import {parse} from 'path';

const IMAGE_EXTENSIONS_MAP = {
  '.bmp': 'image/bmp',
  '.gif': 'image/gif',
  '.ico': 'image/vnd.microsoft.icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.tif': 'image/tiff',
  '.tiff': 'image/tiff',
  '.webp': 'image/webp',
  '.heic': 'image/heic',
};

function byExtension(path) {
  const ext = parse(path).ext.toLowerCase();

  if(IMAGE_EXTENSIONS_MAP[ext]) {
    return {
      category: 'IMAGE',
      contentType: IMAGE_EXTENSIONS_MAP[ext],
    };
  }
  return null;
}

function byMagic(/*path*/) {
  return null;
}

function check(path) {
  const result = byMagic(path);
  if(result) {
    return result;
  }

  return byExtension(path);
}

export {
  check,
};

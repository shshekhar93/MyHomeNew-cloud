import {parse} from 'path';

const VIDEO_EXTENSIONS_MAP = {
  '.avi': 'video/x-msvideo',
  '.mp4': 'video/mp4',
  '.mpeg': 'video/mpeg',
  '.ogv': 'video/ogg',
  '.ts': 'video/mp2t',
  '.webm': 'video/webm',
  '.3gp': 'video/3gpp',
  '.3g2': 'video/3gpp2',
  '.mkv': 'video/webm',
};

function byExtension(path) {
  const ext = parse(path).ext.toLowerCase();
  
  if(VIDEO_EXTENSIONS_MAP[ext]) {
    return {
      category: 'VIDEO',
      contentType: VIDEO_EXTENSIONS_MAP[ext],
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

import {parse} from 'path';

const AUDIO_EXTENSIONS_MAP = {
  '.aac': 'audio/aac',
  '.cda': 'application/x-cdf',
  '.mid': 'audio/midi',
  '.midi': 'audio/midi',
  '.mp3': 'audio/mpeg',
  '.oga': 'audio/ogg',
  '.opus': 'audio/opus',
  '.wav': 'audio/wav',
  '.weba': 'audio/webm',
  '.3gp': 'audio/3gpp',
  '.3g2': 'audio/3gpp2',
};

function byExtension(path) {
  const ext = parse(path).ext.toLowerCase();
  
  if(AUDIO_EXTENSIONS_MAP[ext]) {
    return {
      category: 'AUDIO',
      contentType: AUDIO_EXTENSIONS_MAP[ext],
    };
  }
  return null;
}

function byMagic(/*path*/) {
  return null;
}

export function check(path) {
  const result = byMagic(path);
  if(result) {
    return result;
  }

  return byExtension(path);
}

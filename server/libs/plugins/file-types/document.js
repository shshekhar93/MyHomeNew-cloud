import {parse} from 'path';

const DOCUMENT_EXTENSIONS_MAP = {
  '.txt': 'text/plain',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.xls': 'application/vnd.ms-excel',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.ppt': 'application/vnd.ms-powerpoint',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.rtf': 'application/rtf',
  '.odt': 'application/vnd.oasis.opendocument.text',
  '.ods': 'application/vnd.oasis.opendocument.spreadsheet',
  '.odp': 'application/vnd.oasis.opendocument.presentation',
};

function byExtension(path) {
  const ext = parse(path).ext.toLowerCase();
  if(DOCUMENT_EXTENSIONS_MAP[ext]) {
    return {
      category: 'DOCUMENT',
      contentType: DOCUMENT_EXTENSIONS_MAP[ext],
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

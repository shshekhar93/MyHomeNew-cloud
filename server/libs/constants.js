export const INDEX_STATUS = {
  IN_PROGRESS: 'IN_PROGRESS',
  READY: 'READY', 
};

export const ERRORS = {
  SYSTEM_ERROR: new Error('SYSTEM_ERROR'),
  INVALID_PATH: new Error('INVALID_PATH'),
  NOT_FOUND: new Error('NOT_FOUND'),
  OPERATION_FAILED: new Error('OPERATION_FAILED'),
};

export const ENTRY_TYPES = {
  DIR: 'DIR',
  FILE: 'FILE',
};

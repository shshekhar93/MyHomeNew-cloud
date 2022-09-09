const INDEX_STATUS = {
  IN_PROGRESS: 'IN_PROGRESS',
  READY: 'READY', 
};

const ERRORS = {
  INVALID_PATH: new Error('INVALID_PATH'),
  NOT_FOUND: new Error('NOT_FOUND'),
};

export {
  INDEX_STATUS,
  ERRORS,
};

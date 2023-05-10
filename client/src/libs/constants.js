const STORE_PROPS = {
  NAV_OPEN: 'nav-open',
  SHARES: 'shares',
  CUR_DIR: 'cur-dir',
  FILES_BY_CATEGORY: 'files-by-category',
};

const ERRORS = {
  UNAUTHORIZED: new Error('UNAUTHORIZED'),
  SERVER_ERROR: new Error('SERVER_ERROR'),
};

export {
  STORE_PROPS,
  ERRORS,
};

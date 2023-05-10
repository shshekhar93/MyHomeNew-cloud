const STORE_PROPS = {
  NAV_OPEN: 'nav-open',
  SHARES: 'shares',
  CUR_DIR: 'cur-dir',
  FILES_BY_CATEGORY: 'files-by-category',
  FILES_ARRAY: 'files-array',
  SELECTED_FILE_INDEX: 'selected-file-index',
};

const ERRORS = {
  UNAUTHORIZED: new Error('UNAUTHORIZED'),
  SERVER_ERROR: new Error('SERVER_ERROR'),
};

export {
  STORE_PROPS,
  ERRORS,
};

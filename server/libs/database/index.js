import sqlite3 from 'sqlite3';
import { config } from '../../config/index.js';
import { fromCallback, toCamelCase } from '../utils.js';
import { GET_FILES_BY_CATEGORY, GET_ENTRIES_BY_PATH, INSERT_DIR_ENTRY_QUERY, INSERT_FILE_ENTRY_QUERY, SETUP_QUERIES, GET_FILES_BY_TAG } from './queries.js';

const sqlite = sqlite3.verbose();
const DB_PATH = `${config.indexDir}db.sqlite3`;

let DB;
export async function initializeDB() {
  try {
    await fromCallback(cb => {
      DB = new sqlite.Database(DB_PATH, cb);
    });

    for(const query of SETUP_QUERIES) {
      await fromCallback(cb => DB.run(query, cb));
    }

    console.log('Database connection open');
  }
  catch(err) {
    console.log('Database connection failed', err.message || err);
  }
}

export async function closeDB() {
  if(!DB) {
    return;
  }

  return fromCallback(cb => {
    DB.close(cb);
  });
}

export async function run(query, values) {
  return fromCallback(cb => {
    const params = [query, cb];
    if(values) {
      params.splice(1, 0, values);
    }
    DB.run(...params);
  });
}

export async function all(query, values = []) {
  const result = await fromCallback(cb => DB.all(query, values, cb));
  return result.map(
    obj => Object.fromEntries(
      Object.entries(obj)
        .map(([key, value]) => [toCamelCase(key), value]),
    ),
  );
}

export async function insertDirEntry({
  name, path,
}) {
  return run(INSERT_DIR_ENTRY_QUERY, [name, path]);
}

export async function insertFileEntry({
  name,
  path,
  category,
  contentType,
}) {
  return run(INSERT_FILE_ENTRY_QUERY, [name, path, category, contentType]);
}

export async function getAllEntriesByPath(path) {
  return all(GET_ENTRIES_BY_PATH, [path]);
}

export async function getAllFilesByCategory(category) {
  return all(GET_FILES_BY_CATEGORY, [category]);
}

export async function getAllFilesByTag(tag) {
  return all(GET_FILES_BY_TAG, [tag]);
}

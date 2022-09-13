import { STORE_PROPS } from "../libs/constants";
import { useStore } from "../libs/store";
import { useAPI } from "./helper";

/**
 * @typedef {Object} Entry
 * @property {string} name
 * 
 * @typedef {Object} Folder
 * @property {Entry[]} directories
 * @property {Entry[]} files
 * 
 * @typedef {import("./helper").APIResponse.<Folder|{}>} ReaddirAPIResponse
 * 
 * @returns {[ReaddirAPIResponse, Function]}
 */
function useReaddir() {
  const store = useStore();
  const path = store.get(STORE_PROPS.CUR_DIR);
  const fullPath = `/readdir?path=${encodeURIComponent(path)}`;
  return useAPI(STORE_PROPS.CUR_DIR_CONTENTS, fullPath);
}

export {
  useReaddir,
};

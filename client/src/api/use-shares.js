import { STORE_PROPS } from "../libs/constants";
import { useAPI } from "./helper";

/**
 * @typedef {Object} Entry
 * @property {string} name
 * 
 * @typedef {Object} Share
 * @property {Entry[]} directories
 * @property {Entry[]} files
 * 
 * @typedef {import("./helper").APIResponse.<Share|{}>} ShareAPIResponse
 * 
 * @returns {[ShareAPIResponse, Function]}
 */
function useShares() {
  return useAPI(STORE_PROPS.SHARES, '/shares');
}

export {
  useShares,
};

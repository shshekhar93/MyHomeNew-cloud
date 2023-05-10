import { STORE_PROPS } from "../libs/constants";
import { useAPI } from "./helper";

export function useFilesByCategory(category) {
  return useAPI(STORE_PROPS.FILES_BY_CATEGORY, `/category/${category}`);
}

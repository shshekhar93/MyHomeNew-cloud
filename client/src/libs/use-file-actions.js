import { useCallback, useEffect, useState } from "react";
import { useStore } from "./store"
import { STORE_PROPS } from "./constants";

const FILE_PROPS = [
  STORE_PROPS.FILES_ARRAY,
  STORE_PROPS.SELECTED_FILE_INDEX,
];

export const useFileActions = () => {
  const store = useStore();
  const openFile = useCallback((allFiles, selectedIndex) => {
    if(!allFiles || allFiles.length === 0) {
      return;
    }

    store.set(STORE_PROPS.FILES_ARRAY, allFiles);
    store.set(STORE_PROPS.SELECTED_FILE_INDEX, selectedIndex);
  }, [store]);

  const closeFile = useCallback(() => {
    FILE_PROPS.forEach(prop => store.set(prop, null));
  }, [store]);

  return [
    openFile,
    closeFile,
  ];
};

export const useSelectedFile = () => {
  const store = useStore();
  const [, rerenderer] = useState(0);

  useEffect(() => {
    const handler = () => rerenderer(Date.now());
    FILE_PROPS.forEach(prop => store.subscribe(prop, handler));

    return () => FILE_PROPS.forEach(prop => store.unsubscribe(prop, handler));
  }, []);

  return [
    store.get(STORE_PROPS.FILES_ARRAY),
    store.get(STORE_PROPS.SELECTED_FILE_INDEX),
    useCallback(() => {
      FILE_PROPS.forEach(prop => store.set(prop, null));
    }, [store]),
  ];
};

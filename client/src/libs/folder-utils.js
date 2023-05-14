import { useEffect } from "react";

export const DATA_TYPE_ATTR = 'data-type';
export const ENTRY_TYPE_VALUE = 'folder-display';
export const ENTRY_ELEM_MATCHER = `[${DATA_TYPE_ATTR}="${ENTRY_TYPE_VALUE}"]`;

const Extractors = {
  ArrowRight: (rect) => {
    return document.elementFromPoint(rect.x + rect.width + 8, rect.y);
  },
  ArrowLeft: (rect) => {
    return document.elementFromPoint(rect.x - 8 - 1, rect.y);
  },
  ArrowUp: (rect) => {
    return document.elementFromPoint(rect.x, rect.y - 8 - 1);
  },
  ArrowDown: (rect) => {
    return document.elementFromPoint(rect.x, rect.y + rect.height + 8);
  },
};

export function getFirstEntryElement() {
  return document.querySelector(ENTRY_ELEM_MATCHER);
}

export function getNextEntryElement(code) {
  const extractor = Extractors[code];
  if(!extractor) {
    // Unhandled key.
    return;
  }

  const currentActive = document.activeElement;
  if(currentActive.getAttribute(DATA_TYPE_ATTR) !== ENTRY_TYPE_VALUE) {
    // just return the first elem
    return getFirstEntryElement();
  }

  const rect = currentActive.getBoundingClientRect();
  const elem = extractor(rect);
  return elem;
}

export function useKeyboardNavForEntries() {
  useEffect(() => {
    const handler = (e) => {
      const nextElem = getNextEntryElement(e.code)
      nextElem && nextElem.focus();
    }
    document.addEventListener('keyup', handler);

    return () => document.removeEventListener('keyup', handler);
  }, []);
};

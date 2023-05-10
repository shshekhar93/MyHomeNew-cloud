import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export function findParent(element, parentMatcher) {
  const { body } = document;

  while(element !== body) {
    if(element.matches(parentMatcher)) {
      return element;
    }

    element = element.parentElement;
  }
  
  return null;
};

export function useQuery() {
  const { search } = useLocation();

  return useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);
};

const ACTIVATION_KEYS = [
  'Enter',
  'Space',
];
export function accessibleClickProps(onClick, onDblClick) {
  const onKeyUp = (e) => {
    if(ACTIVATION_KEYS.includes(e.code)) {
      onClick(e);
    }
  };

  return {
    [onDblClick ? 'onDoubleClick' : 'onClick']: onClick,
    onKeyUp,
  }
};

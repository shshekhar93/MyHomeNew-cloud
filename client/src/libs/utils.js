import { useMemo } from "react";
import { useLocation } from "react-router-dom";

function findParent(element, parentMatcher) {
  const { body } = document;

  while(element !== body) {
    if(element.matches(parentMatcher)) {
      return element;
    }

    element = element.parentElement;
  }
  
  return null;
}

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);
}

export {
  findParent,
  useQuery,
};

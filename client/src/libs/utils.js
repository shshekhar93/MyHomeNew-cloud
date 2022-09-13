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

export {
  findParent,
};

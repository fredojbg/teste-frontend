class PairPrograming {
  /**
   * Base Component constructor
   * @param {Object} props Component's properties.
   */
  constructor() { }

  render(_contentContainerSelector, _htmlToRender) {
    const element = document.querySelector(String(_contentContainerSelector));

    if (element) {
      element.innerHTML = String(_htmlToRender);
    } else {
      console.info(`Element '${_contentContainerSelector}' not found on page!`);
    }
  }

  /**
   * Get element by selector
   * @param {*} elementSelector
   */
  getElement(elementSelector = '') {
    return document.querySelector(String(elementSelector));
  }

  /**
   * Get elements by selectors
   * @param {*} elementSelector
   */
  getElements(elementSelectors = []) {
    let elements = [];

    [...elementSelectors].forEach(selector => {
      const elementFound = document.querySelector(String(selector));

      if (elementFound) {
        elements.push(elementFound);
      }
    });

    return elements;
  }

}

export default PairPrograming;
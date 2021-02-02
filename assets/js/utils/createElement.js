  /**
 * Создание HTML элемента
 * @param {string} type тип создаваемого элемента
 * @param {object} options обьект с параметрами создаваемого элемента
 * @param {string[]} options.classNames - css classes
 * @param {{event: function}} options.eventListeners - array of tuples with pair [event, function]
 * @param {{string: string}} options.attributes - array of tuples with pair [attribute, value]
 * @param {string} textData текстовая строка, находящаяся внутри элемента
 * @param {Node[]} children дочерние элементы 
 * @return {HTMLElement} созданный элемент
 */
function createElement(elementType, {classNames, eventListeners = {}, attributes = {}, textData} , ...children) {
  const element = document.createElement(elementType);

  element.classList.add(...classNames);
  for (const [attribute, value] of Object.entries(attributes)) {
    element.setAttribute(attribute, value);
  }
  for( const [event, func] of Object.entries(eventListeners)){
    element.addEventListener(event, func);
  }

  if(textData) {
    element.append(document.createTextNode(textData));
  };
  element.append(...children);
  return element;
}
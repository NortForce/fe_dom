  /**
   * Функция создания элемента с инициалами
   * @param {string} fullName
   * @return {HTMLElement} div с инициалами
   */
  function createAbbr(fullName) {
    const abbr = createElement('div', {classNames: ['initials']});
    abbr.append(document.createTextNode(returnAbbr(fullName)));
    return abbr;
  }

/**
 * Функция для получения полного имени
 * @param {string} firstName 
 * @param {string} lastName 
 * @return {string} полное имя
 */
function getFullName (firstName, lastName) {
  return (firstName || lastName) ? `${firstName} ${lastName}`.trim() : '';
}
/**
 * Функция получения инициалов
 * @param {string} fullName 
 * @return {string} Инициалы или пустая строка
 */
function returnAbbr (fullName) {
  const [firstName, lastName ] =fullName.split(' ');
  if(firstName && lastName) {
    return `${firstName.trim().charAt(0)} ${lastName.trim().charAt(0)}`;
  } else if (firstName && !lastName) {
    return `${firstName.trim().charAt(0)}`;
  } else if (!firstName && lastName) {
    return `${lastName.trim().charAt(0)}`;
  }
  return '';
}
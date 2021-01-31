  const faSites = new Map([
    ['www.instagram.com',['fa-instagram', 'icon-instagram']],
    ['www.facebook.com',['fa-facebook', 'icon-facebook']],
    ['twitter.com',['fa-twitter', 'icon-twitter']],
  ]);

  const container = document.getElementById('root');
  const cards = responseData.map((data) => createCard(data));
  container.append(...cards);

  function createCard(data) {
    const {id,firstName, lastName, profilePicture, contacts} = data;
    
    const abbr = createAbbr(firstName, lastName);    
    const fullName = getFullName(firstName, lastName);

    
    const picture = createImage({classNames: ['card-image'], attributes: {src: profilePicture, alt: fullName}, id: id});
    const h3 = createElement('h3', {classNames: ['card-name'], textData: fullName});
    const h4 = createElement('h4', {classNames: ['job-position'], textData: `Some important position, probably`});
    const p = createElement('p', {classNames: ['card-description'], textData: `Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam quis risus eget urna mollis ornare vel eu leo.`});
    
    const userContacts = createSocialLinks(contacts);

    const cardImgWrap = createElement('div', {classNames: ['card-image-wrapper'], attributes: {id: `wrapper${id}`}},abbr, picture);
    cardImgWrap.style.backgroundColor = stringToColour(fullName);
    const article = createElement('article', {classNames:['card-container']}, cardImgWrap, h3, h4, p, userContacts);

    return createElement('li', {classNames: ["card-wrapper"]}, article);
  }

  /*
    CREATING ELEMENTS LOGIC
  */

  /**
 *
 * @param {string} type
 * @param {object} options
 * @param {string[]} options.classNames - css classes
 * @param {function} options.eventListeners - array of tuples with pair [event, function]
 * @param {Array} options.attributes - array of tuples with pair [attribute, value]
 * @param {string} textData текстовая строка, находящаяся внутри элемента
 * @param {Node[]} children
 * @return {HTMLElement} 
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
  /**
   * Функция создания элемента с инициалами
   * @param {string} firstName
   * @param {string} lastName
   * @return {HTMLElement} div с инициалами
   */
  function createAbbr(firstName, lastName) {
    const abbr = createElement('div', {classNames: ['initials']});
    abbr.append(document.createTextNode(getAbbr(firstName, lastName)));
    return abbr;
  }

  function createImage(options) {
    const { classNames , attributes , id} = options;
    const img = createElement('img', {classNames, attributes});
    img.dataset.id = id;
    img.addEventListener('error', handleImageError);
    img.addEventListener('load', handleImageLoad);
    return img;
  }

  /**
   * Функция обертка для создания группы социальных ссылок
   * @param {Array} contacts массив контактов
   * @return {HTMLElement} элемент div с ссылками на все полученные соц сети
   */
  function createSocialLinks (contacts) {
    const linkHolder = [];
    const userLinks = getSocialSites(contacts, faSites);

    for (const link of userLinks) {
      linkHolder.push(createSocialLink (link));
    }
    return  createElement('div', {classNames: ['contacts']}, ...linkHolder);
  }

  /**
   * Функция-обертка для создания ссылки в соц-сети
   * @param {Map} map 
   * @param {string} map.href 
   * @param {Array} map.userClasses классы для ссылок
   * @return {HTMLElement} ссылка на соц сеть
   */
  function createSocialLink ([href, userClasses]) {
    userClasses.unshift('fa', 'fa-fw', 'social-icon');
    const linkImg = createElement('span', {classNames: userClasses});
    return createElement('a', {classNames:['social-wrapper'], attributes : {href}}, linkImg);
  }

/*
  UTILITY
*/
/**
 * Функция для получения полного имени
 * @param {string} firstName 
 * @param {string} lastName 
 * @return {string} 
 */
function getFullName (firstName, lastName) {
  return (firstName || lastName) ? `${firstName} ${lastName}`.trim() : '';
}
/**
 * Функция получения инициалов
 * @param {string} firstName 
 * @param {string} lastName 
 * @return {string} Инициалы или пустая строка
 */
function getAbbr (firstName, lastName) {
  return firstName && lastName? `${firstName.trim().charAt(0)} ${lastName.trim().charAt(0)}` : '';
}

/**
 * Функция создания связи между соц сетями и классами её гиперссылок 
 * @param {Array} contacts массив с ссылками соц-сеть
 * @param {Map} savedSocialSites ключ - домен соц-сети, значение - массив со строками классов
 * @return {Map} ключ - гиперссылка на соц-сеть, значение - массив со строками классов
 */
function getSocialSites (contacts, savedSocialSites) {
  const socialSites = new Map();
  for(const link of contacts) {
    const socialLink = new URL(link);
    if(socialSites.get(socialLink)) {
      continue;
    }

    for(const [hostname, faStyles] of  savedSocialSites) {
      if(socialLink.hostname === hostname) {
        socialSites.set(socialLink, faStyles);
        break;
      }
    }
  }
  return socialSites;
}

function stringToColour(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let colour = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

/*
  HANDLERS
*/
function handleImageError({ target }) {
  target.remove();
}

function handleImageLoad({target,target: {dataset: { id },},}) {
  document.getElementById(`wrapper${id}`).append(target);
}

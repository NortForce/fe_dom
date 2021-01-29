new URL('https://www.facebook.com/JasonStatham/');
new Map()
  .set('www.facebook.com', 'src_to_icon')
  .set('www.facebook.com', 'src_to_icon')
  .set('www.facebook.com', 'src_to_icon');

  const socialSites = new Map([[1, 'www.facebook.com'],[2, 'twitter.com'],[3, 'www.instagram.com']]);

  const container = document.getElementById('root');
  const cards = responseData.map((data) => createCard(data));
  container.append(...cards);

  function createCard(data) {
    const {firstName, lastName, profilePicture, contacts: {}} = data;

    const abbr = createElement('div', {classNames: ['initials']});
    abbr.append(document.createTextNode(getAbbr(firstName, lastName)));
    const picture = createImage({firstName, lastName, profilePicture, classNames: ['cardImage']});
    const h3 = createElement('h3', {classNames: ['cardName'], textData: `${firstName} ${lastName}`});
    const p = createElement('p', {classNames: ['cardDescription'], textData: `Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam quis risus eget urna mollis ornare vel eu leo.`});

    
    const contacts = createElement('div', {classNames: ['contacts']});

    const cardImgWrap = createElement('div', {classNames: ['cardImageWrapper']},abbr, picture);

    // const article = createElement('article', {classNames:['cardContainer']}, cardImgWrap, h3, p, contacts);
    const article = createElement('article', {classNames:['cardContainer']}, cardImgWrap, h3, p);

    return createElement('li', {classNames: ["cardWrapper"]}, article);
  }

  /**
 *
 * @param {string} type
 * @param {object} options
 * @param {string[]} options.classNames - css classes
 * @param {function} options.onClick - click handler
 * @param {Node[]} children
 * @return {HTMLElement}
 */
  function createElement(elementType, {classNames, onClick, attributes, textData} , ...children) {
    const element = document.createElement(elementType);
    element.classList.add(...classNames);
    if(textData) {
      element.append(document.createTextNode(textData))
    };
    element.append(...children);
    return element;
  }

  // data и options одновременно не надо
  function createImage(options) {
    const {firstName, lastName, profilePicture, classNames, } = options;
    // const {classNames, onClick, src,} = options;
    const img = createElement('img', {classNames});
    img.src = profilePicture;
    img.alt = `${firstName} ${lastName}`;
    img.addEventListener('error', handleImageError);
    // img.addEventListener('load', handleImageLoad);
    return img;
  }

  function handleImageError({ target }) {
    target.remove();
  }

  function handleImageLoad({target,target: {dataset: { id },},}) {
    document.getElementById(`wrapper${id}`).append(target);
  }

  function getAbbr (firstName, lastName) {
    return `${firstName.trim().charAt(0)} ${lastName.trim().charAt(0)}`;
  }
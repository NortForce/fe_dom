function createCard(data) {
  const {id,firstName, lastName, profilePicture, contacts} = data;

  const fullName = getFullName(firstName, lastName);
  const abbr = createAbbr(fullName);

  const nPicture = createElement('img',{eventListeners:{'error': handleImageError, 'load': handleImageLoad},classNames: ['card-image'], attributes: {'src': profilePicture, 'alt': fullName, 'data-id': id}});
  const h3 = createElement('h3', {classNames: ['card-name'], },fullName);
  const h4 = createElement('h4', {classNames: ['job-position'] }, `Some important position, probably`);
  const p = createElement('p', {classNames: ['card-description'] }, `Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Nullam quis risus eget urna mollis ornare vel eu leo.`);
  
  const userContacts = createElement('div',{classNames: ['contacts']}, ...createSocialLinks(contacts));

  const cardImgWrap = createElement('div', {classNames: ['card-image-wrapper'], attributes: {id: `wrapper${id}`}},abbr, nPicture);
  cardImgWrap.style.backgroundColor = stringToColour(fullName);
  const article = createElement('article', {classNames:['card-container']}, cardImgWrap, h3, h4, p, userContacts);

  return createElement('li', {eventListeners: {'click':changeColor} ,classNames: ["card-wrapper"]}, article);
}

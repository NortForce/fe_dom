function handleImageError({ target }) {
  target.remove();
}

function handleImageLoad({target,target: {dataset: { id },},}) {
  document.getElementById(`wrapper${id}`).append(target);
}

function addCelebritySelection() {
  this.classList.toggle('card-selected');

  const celebrityFullName = this.children[0].children[1].textContent;
  const celebId = this.dataset.userId;
  if(!selectedCelebs.includes(celebId)) {
    selectedCelebs.push(celebId);
    selectedCelebsList.append(createElement('li',{classNames: ['celeb'],attributes:{'data-celeb-id':celebId}}, celebrityFullName));
  }
}

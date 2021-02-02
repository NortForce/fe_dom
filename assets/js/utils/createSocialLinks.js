  /**
   * Функция  для создания группы социальных ссылок
   * @param {string[]} contacts массив контактов
   * @return {HTMLElement} элемент div с ссылками на все полученные соц сети
   */
  function createSocialLinks (contacts) {
    const children =  contacts.map((contact)=>{
      const url = new URL(contact);
      
      if(SUPPORT_SOC_NET.has(url.hostname)) {
        const classes = SUPPORT_SOC_NET.get(url.hostname);

        return createElement('a', {classNames:['social-wrapper'], attributes : {href: contact}},
          createElement('span', {classNames: classes})
        )
      }
      return;

    })
    .filter(Boolean);
    return  createElement('div', {classNames: ['contacts']}, ...children);
  }
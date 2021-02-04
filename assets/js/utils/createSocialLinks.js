  /**
   * Функция  для создания группы социальных ссылок
   * @param {string[]} contacts массив контактов
   * @return {HTMLAnchorElement[]}массив с ссылками на все полученные соц сети
   */
  function createSocialLinks (contacts) {
    return contacts.map((contact)=>{
      const {hostname} = new URL(contact);
      
      if(SUPPORT_SOC_NET.has(hostname)) {
        const classes = SUPPORT_SOC_NET.get(hostname);

        return createElement('a', {classNames:['social-wrapper'], attributes : {href: contact}},
          createElement('span', {classNames: classes})
        )
      }
      return;

    })
    .filter(Boolean);
    // return  createElement('div', {classNames: ['contacts']}, ...children);
  }
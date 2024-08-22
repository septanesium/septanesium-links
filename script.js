function loadLinks() {
  let list = document.querySelector('ul#links');

  let jsonLinks = JSON_LINKS.map(value => value.split(' & '));

  for (let link of jsonLinks) {
    let listItem = document.createElement('li');
    let linkElement = document.createElement('button');

    let url = link[1];

    [linkElement.textContent, linkElement.onclick] =
    [link[0], () => open(url, '_blank').focus() ];

    listItem.appendChild(linkElement);
    list.appendChild(listItem);
  }
}

loadLinks();

let tab = 0;

let elementLists = [
  document.querySelector('ul#social-links'),
  document.querySelector('ul#project-links')
];

function loadLinks() {
  let linkLists = [ SOCIAL_LINKS, PROJECT_LINKS ];
  let jsonLinks = linkLists[tab].map(value => value.split(' & '));

  for (let link of jsonLinks) {
    let listItem = document.createElement('li');
    let buttonElement = document.createElement('button');

    let url = link[1];

    [buttonElement.textContent, buttonElement.onclick] =
    [link[0], () => open(url, '_blank').focus()];

    listItem.appendChild(buttonElement);
    elementLists[tab].appendChild(listItem);
  }
}

function switchTabs(element) {
  let setTabSwitchCases = {
    'social-link-tab': 0,
    'project-link-tab': 1
  };

  
  document.querySelectorAll('.tab').forEach((e, index) => {
    if (e.id != elementLists[index].id) {
      elementLists[index].innerHTML = '';
    }

    e.classList
    .remove('selected');
  });

  document.querySelector(`#${element.id}`).classList
  .add('selected');

  tab = setTabSwitchCases[element.id];

  loadLinks();
}

loadLinks();

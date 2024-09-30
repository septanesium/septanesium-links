let tab = 0;

const DISCORD_NAME = 'solareclipseglasses';
const ERROR_CODE = -449;

// Stores the newly fetched link cases so we don't have to call
// a GET request every time the user switches tabs
let cache = {
  socialLinks: null,
  projectLinks: null
};

let switchCases = [
  {
    url: 'https://api.npoint.io/3a5497dfbdf08f120bab',
    cacheName: 'socialLinks',
    id: '#social-links',
    tabID: '#social-link-tab'
  },
  {
    url: 'https://api.npoint.io/14594675278a58f5a7fa', 
    cacheName: 'projectLinks',
    id: '#project-links',
    tabID: '#project-link-tab'
  }
];

const getLinks = link => link.map(v => v.split(' & '));

async function loadLinkFromTab(selectCase, id) {
  let result = cache[selectCase.cacheName] ?? await fetch(selectCase.url).then(r => r.json().catch(e => {
    $(switchCases[tab].id).append(`<p>An error occured parsing the json: </br>${e} </br></br>Most likely the backend returned empty or binary data. Report this to me on discord at "${DISCORD_NAME}" and I'll investigate the bug.</p>`);
  }
  )).catch(e => {
    $(switchCases[tab].id).append(`<p>An error occured fetching social links: </br>${e}</p>`);
  }) ?? ERROR_CODE;

  if (result === ERROR_CODE) {
    console.error('An error occured fetching.');
    return;
  }

  if (result !== cache[selectCase.cacheName]) {
    cache[selectCase.cacheName] = result;
  }

  let links = getLinks(result);

  for (let link of links) {
    $(id).append(`
      <li>
        <button onclick="window.open('${link[1]}', '_blank');">${link[0]}</button>
      </li>`
    );
  }
}

function newTab(tabIndex) {
  tab = tabIndex;
  loadLinks();
}

function loadLinks() {
  for (let switchCase of switchCases) {
    $(switchCase.id).html('');
    $(switchCase.tabID).removeClass('selected');
  }

  let selectedCase = switchCases[tab];
  $(selectedCase.tabID).addClass('selected');

  if (typeof selectedCase === 'undefined') {
    console.error('Invalid tab variable lol %cdon\'t play with it again', 'color:black;');
    tab = 0;
    return loadLinks();
  }

  loadLinkFromTab(selectedCase, selectedCase.id);

} loadLinks();

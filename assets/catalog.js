'use strict';

const searchPanel = document.getElementById('catalog-search');
const searchInput = document.getElementById('find-work');
const status = document.getElementById('find-status');
const collections = [...document.querySelectorAll('.collection')];

function normalize(text) {
  return text.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}

function filterCatalogue() {
  const terms = normalize(searchInput.value).trim().split(/\s+/).filter(Boolean);
  let matches = 0;
  for (const collection of collections) {
    let remaining = 0;
    for (const item of collection.querySelectorAll('.work-list > li')) {
      const title = normalize(item.textContent);
      const shown = terms.every(term => title.includes(term));
      item.hidden = !shown;
      if (shown) remaining++;
    }
    collection.hidden = !remaining;
    matches += remaining;
  }
  status.textContent = terms.length
    ? matches ? `${matches} ${matches === 1 ? 'text' : 'texts'} found` : 'No titles match your search.'
    : '';
}

searchPanel.hidden = false;
searchInput.addEventListener('input', filterCatalogue);
for (const link of document.querySelectorAll('.masthead nav a[href^="#"]')) {
  link.addEventListener('click', () => {
    if (document.getElementById(link.hash.slice(1))?.hidden) {
      searchInput.value = '';
      filterCatalogue();
    }
  });
}
filterCatalogue();

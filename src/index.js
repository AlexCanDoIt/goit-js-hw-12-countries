import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error, defaultModules } from '@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '@pnotify/mobile/dist/PNotifyMobile.js';
defaultModules.set(PNotifyMobile, {});

import './sass/styles.scss';
var debounce = require('lodash.debounce');

import countriesListTpl from './templates/country-list.hbs';
import countriesCardTpl from './templates/country-card.hbs';

const refs = {
  searchInput: document.querySelector('.input'),
  container: document.querySelector('.countries'),
};

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch({ target: { value } }) {
  fetchCountry(value)
    .then(response => {
      refs.container.innerHTML = '';

      if (response.length === 1) {
        refs.container.insertAdjacentHTML(
          'beforeend',
          countriesCardTpl(response),
        );
      } else if (response.length >= 2 && response.length <= 10) {
        refs.container.insertAdjacentHTML(
          'beforeend',
          countriesListTpl(response),
        );
      } else if (response.length > 10) {
        error({
          text: 'Too many matches found. Please enter a more specific query!',
        });
      }
    })
    .catch();
}

function fetchCountry(country) {
  return fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(
    response => {
      return response.json();
    },
  );
}

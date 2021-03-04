import './sass/styles.scss';
var debounce = require('lodash.debounce');

const refs = {
  searchInput: document.querySelector('.input-js'),
};

refs.searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch({ target: { value } }) {
  fetchCountry(value)
    .then(response => {
      console.log(
        PNotify.error({
          title: response.length,
          text: 'Something terrible happened.',
        }),
      );
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

let countryCodes = {};

function getCountryCodes() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://date.nager.at/api/v3/AvailableCountries');
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      const countries = xhr.response;

      countryCodes = {};
      for (let i = 0; i < countries.length; i++) {
        const countryCode = countries[i].countryCode;
        const countryName = countries[i].name;
        countryCodes[countryName] = countryCode;
      }
      console.log('Country Codes:', countryCodes);
    }
  });

  xhr.send();
}

getCountryCodes();

function capitalizeFirstLetter(input) {
  const words = input.split(' ');
  const capitalizeWords = [];
  for (const word of words) {
    const capitalizedWord =
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    capitalizeWords.push(capitalizedWord);
  }
  return capitalizeWords.join(' ');
}

function ajaxRequest() {
  const $countryInput = document.getElementById('country-input');
  const selectedCountryName = capitalizeFirstLetter($countryInput.value);
  console.log(selectedCountryName);

  const selectedCountryCode = countryCodes[selectedCountryName];

  if (!selectedCountryCode) {
    console.log('Country not found');
    return;
  }
  console.log('selected country code:', selectedCountryCode);

  const xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    `https://date.nager.at/api/v3/NextPublicHolidays/${selectedCountryCode}`,
  );
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      const holidays = xhr.response;
      const $holidayList = document.getElementById('holiday-list');

      const $newList = document.createElement('ul');

      for (let i = 0; i < holidays.length; i++) {
        const holiday = holidays[i];
        const $listItem = document.createElement('li');
        $listItem.textContent = holiday.name;

        $listItem.addEventListener('click', function () {
          storeSelectedCountry(selectedCountryName, holiday.name, holidays);
          console.log('stored data:', storedDate);
        });
        $newList.appendChild($listItem);
      }

      const $holidayListContainer = document.querySelector(
        '#holiday-list-container',
      );
      $holidayListContainer.appendChild($newList);
    }
  });
  xhr.send();
}

const $getHolidaysButton = document.getElementById('get-holidays-button');
$getHolidaysButton.addEventListener('click', ajaxRequest);

const $countryForm = document.getElementById('country-form');

if ($countryForm) {
  $countryForm.addEventListener('submit', function (event) {
    event.preventDefault();
  });
}

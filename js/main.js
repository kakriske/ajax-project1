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
    } else {
      console.log('No country codes:', xhr.status, xhr.statusText);
    }
  });

  xhr.send();
}

getCountryCodes();

function capitalizeFirstLetter(input) {
  return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
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
      if (
        $holidayList &&
        $holidayList.dataset.country !== selectedCountryName
      ) {
        $holidayList.innerHTML = '';
        $holidayList.dataset.country = selectedCountryName;
      }
      const $newList = document.createElement('ul');
      for (let i = 0; i < holidays.length; i++) {
        const holiday = holidays[i];
        const $listItem = document.createElement('li');
        $listItem.textContent = holiday.name;
        $newList.appendChild($listItem);
      }

      const $holidayListContainer = document.querySelector(
        '#holiday-list-container',
      );
      $holidayListContainer.appendChild($newList);
    } else {
      console.error('Failed to get holiday:', xhr.status, xhr.statusText);
    }
  });
  xhr.send();
}

const getHolidaysButton = document.getElementById('getHolidaysButton');
getHolidaysButton.addEventListener('click', ajaxRequest);

const $countryForm = document.getElementById('countryForm');

if ($countryForm) {
  $countryForm.addEventListener('submit', function (event) {
    event.preventDefault();
  });
} else {
  console.log('Form element not found');
}

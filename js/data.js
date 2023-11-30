/* exported data */
let storedDate = {
  selectedCountry: '',
  selectedHolidays: [],
};

window.addEventListener('beforeunload', function (event) {
  const serializeData = JSON.stringify(storedDate);
  localStorage.setItem('storedDate', serializeData);
});

const dataInStorage = localStorage.getItem('storedDate');
if (dataInStorage) {
  storedDate = JSON.parse(dataInStorage);
}

function storeSelectedCountry(country, holiday, allHolidays) {
  storedDate.selectedCountry = country;
  storedDate.selectedHolidays.push(holiday);
  storedDate.allHolidays = allHolidays;
}

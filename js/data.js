/* exported data */
let data = {
  view: 'country-entry',
  selectedCountry: '',
  selectedHolidays: [],
};

const dataInStorage = localStorage.getItem('data');
if (dataInStorage) {
  data = JSON.parse(dataInStorage);
} else {
  saveDataToLocalStorage();
}

window.addEventListener('beforeunload', function (event) {
  const serializeData = JSON.stringify(data);
  localStorage.setItem('data', serializeData);
});

function saveDataToLocalStorage() {
  const serializeData = JSON.stringify(data);
  localStorage.setItem('data', serializeData);
}

function storeSelectedCountry(country, holiday, allHolidays, clickListItem) {
  const entryId = data.selectedHolidays.length + 1;
  data.selectedCountry = country;

  // check for duplicate countries
  let holidayExists = false;
  for (let i = 0; i < data.selectedHolidays.length; i++) {
    if (data.selectedHolidays[i].holiday === holiday) {
      holidayExists = true;
      break;
    }
  }
  if (!holidayExists) {
    data.selectedHolidays.push({
      entryId,
      country,
      holiday,
      allHolidays,
      clickListItem,
      notes: '',
    });

    //trying to remove the selected list from the original list
    const originalList = data.allHolidays || [];
    const updatedList = [];
    // console.log('Original List:', originalList);
    for (let i = 0; i < originalList.length; i++) {
      console.log('checking:', originalList[i].name);
      if (originalList[i].name !== holiday) {
        updatedList.push(originalList[i]);
      }
    }
    // console.log('updated list:', updatedList);
    data.allHolidays = updatedList;
    updateSelectedHolidaysView();
  }
}

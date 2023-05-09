let myChart;

async function mainEvent() {
  const loadDataButton = document.querySelector('.data_load');
  const filterDataButton = document.querySelector('.filterData');
  const chart = document.getElementById('myChart');
  const clearDataButton = document.querySelector('.data_clear');

  let bData; 

  
  const storedData = localStorage.getItem('storedData');
  const storedDataArray = localStorage.getItem('storedDataArray');

  if (storedData && storedDataArray) {
    console.log('Using data from local storage');
    bData = JSON.parse(storedData); // Update bData with stored data
    initChart(storedDataArray.split(','), chart);
  } else {
    console.log('Data not in local storage, press load data button');
    await loadData(); // Call loadData function if data is not in local storage
  }


  loadDataButton.addEventListener('click', async () => {
    await loadData(); // Call loadData function when loadDataButton is clicked
  });

  async function loadData() {
    console.log("load data");
    const url = 'https://haveibeenpwned.com/api/v2/breaches';
    const data = await fetch(url);
    bData = await data.json();
  
    const dataArray = await countDataClasses(bData);
  
    /* Local Storage */
    localStorage.setItem('storedData', JSON.stringify(bData));
    localStorage.setItem('storedDataArray', dataArray);
  
    initChart(dataArray, chart);
  }


  filterDataButton.addEventListener('click', (event) => {
    var temp = document.querySelector("select");
    const year = temp.options[temp.selectedIndex].value;
    console.log('filter clicked')
    const newData = filterYear(bData,year);
    const filteredArray = countDataClasses(newData);

    /* Filtered Local Storage */
    localStorage.setItem('storedFilter', filteredArray);
    const storedFilter = localStorage.getItem('storedFilter');
    console.log(storedFilter.split(','));
    //console.log(filteredArray);
    initChart(storedFilter.split(','),chart);
  });

  clearDataButton.addEventListener("click", (event) => {
    console.log('clear data');
    localStorage.clear();
    console.log('localStorage Check', localStorage.getItem("storedData"))
  });

}

function filterYear(bData,year){

  newData = [];

  console.log(year);

  bData.forEach(element =>{
    if(element.BreachDate.includes(year)){
      newData.push(element);
    }
  })
  console.log(newData);
  return newData;
}

function countDataClasses (bData){
let countClasses = {
  "emailAddresses" : 0,
  "passwords": 0,
  "phoneNumbers" : 0,
  "ipAddresses" : 0,
  "names": 0,
  "physicalAddress": 0
}
bData.forEach(element => {
  if (element.DataClasses.includes("Email addresses")){
    countClasses.emailAddresses += 1
  }
  if (element.DataClasses.includes("Passwords")){
    countClasses.passwords += 1
  }
  if (element.DataClasses.includes("Phone numbers")){
    countClasses.phoneNumbers += 1
  }
  if (element.DataClasses.includes("IP addresses")){
    countClasses.ipAddresses += 1
  }
  if (element.DataClasses.includes("Names")){
    countClasses.names += 1
  }
  if (element.DataClasses.includes("Physical addresses")){
    countClasses.physicalAddress += 1
  }

});
  //console.log(countClasses)
  const dataArray = Object.values(countClasses);
  console.log(dataArray);
  return dataArray;

//return an array of numbers
}


async function initChart(dataArray, chart) {
  const labels = [
    'Email Addresses',
    'Passwords',
    'Phone Numbers',
    'IP Addresses',
    'Names',
    'Physical Addresses'
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'Number of Breaches',
      data: dataArray,
    }]
  };

  const config = {
    type: 'pie',
    data: data,
  };

  if (myChart) {
    myChart.destroy();
  }
  myChart = new Chart(chart, config);

}


document.addEventListener('DOMContentLoaded', async () => mainEvent());
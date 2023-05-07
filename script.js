let myChart;

async function mainEvent() {
  const loadDataButton = document.querySelector('.data_load');
  const filterDataButton = document.querySelector('.filterData');


  const chart = document.getElementById('myChart');

  let bData = [];


  loadDataButton.addEventListener('click', async () => {
    console.log("load data");
    const url = 'https://haveibeenpwned.com/api/v2/breaches';
    const data = await fetch(url);
    bData = await data.json();
    
    const dataArray = await countDataClasses(bData);
    initChart(dataArray, chart);
  });


  filterDataButton.addEventListener('click', (event) => {
    var temp = document.querySelector("select");
    const year = temp.options[temp.selectedIndex].value;
    console.log('filter clicked')
    //filterYear(bData,year);
    const newData = filterYear(bData,year);
    const filteredArray = countDataClasses(newData);
    console.log(filteredArray);
    //chart.destroy();
    initChart(filteredArray,chart);
  })
}

function filterYear(bData,year){
  //let year1 = "2022";
  newData = [];
  //console.log(year); 
  //const nYear = JSON.stringify(year);
  //console.log('type of nYear is ',typeof nYear);
  //console.log(isNaN(nYear))
  console.log(year);

  //console.log('filter data')
  bData.forEach(element =>{
    if(element.BreachDate.includes(year)){
      newData.push(element);
      //console.log('element',element);
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
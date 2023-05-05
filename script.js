//async function getWebsiteBreachData (){
  //const chart = document.querySelector('#myChart');
  //const url = 'https://haveibeenpwned.com/api/v2/breaches';
  //const data = await fetch (url);
  //const bData = await data.json();

  //console.log(bData);
  //console.log("loaded data")
  //countDataClasses(bData);
  //initChart(chart);
//}




async function mainEvent() {
  const loadDataButton = document.querySelector('.data_load');
  const filterDataButton = document.querySelector('.filterData');
  const year = document.querySelector('.year');
  loadDataButton.addEventListener('click', async () => {
    console.log("load data");
    const url = 'https://haveibeenpwned.com/api/v2/breaches';
    const data = await fetch(url);
    const bData = await data.json();
    const dataArray = await countDataClasses(bData);
    const chart = document.getElementById('myChart');
    initChart(dataArray, chart);
  });


  filterDataButton.addEventListener('click', async() => {
    console.log('filter data')
    bData.forEach(element =>{
      if(element.BreachDate.match(year)){
        bData.pop()
      }
    })
  })
}

async function countDataClasses (bData){
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

  return new Chart(
    chart,
    config
  );
}

document.addEventListener('DOMContentLoaded', async () => mainEvent());

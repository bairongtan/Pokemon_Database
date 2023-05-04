async function getWebsiteBreachData (){
  const chart = document.querySelector('#myChart');
  const url = 'https://haveibeenpwned.com/api/v2/breaches';
  const data = await fetch (url);
  const bData = await data.json();

  console.log(bData);
  console.log("loaded data")
  countDataClasses(bData);
  initChart(chart);
}

async function test(){
  const testButton = document.querySelector('#filterData');
  testButton.addEventListener('click', async ()=>{
    console.log('test');
  });
}

//async function mainEvent(){
  //const loadDataButton = document.querySelector('#data_load');
  //loadDataButton.addEventListener('click', async (submitEvent) =>{
    //console.log('load data');
    //const url = 'https://haveibeenpwned.com/api/v2/breaches';
    //const data = await fetch (url);
    //const bData = await data.json();
    //countDataClasses(bData);
    //initChart(bData);
  //});
//}

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


async function initChart(chart){
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
    datasets: dataArray,
    borderWidth: 2
  };

  const config = {
    type: 'bar',
    data: data,
    options:{},
  };

  return new Chart(
    chart,
    config
  );

}

//new Chart(ctx, {
//type: 'bar',
//data: {
  //labels: ['Email Addresses', 'Passwords', 'Phone Numbers', 'IP Addresses', 'Names', 'Physical Addresses'],
  //datasets: [{
    //label: '# of Votes',
    //data: dataArray,
    //data: [1,2,3,4,5],
    //borderWidth: 2
  //}]
//},
//options: {
  //scales: {
    //y: {
      //beginAtZero: true
    //}
  //}
//}
//});

async function getWebsiteBreachData (){
  const url = 'https://haveibeenpwned.com/api/v2/breaches';
  const data = await fetch (url);
  const bData = await data.json();
  //const storedBData = JSON.stringify(bData)
  //console.log(bData);
  console.log("loaded data")
  countDataClasses(bData);
}

//async function getWebsiteBreachData (){
//const loadDataButton = document.querySelector('#data_load');

//loadDataButton.addEventListener('click', async (SubmitEvent) => {
  //console.log("loaded data");
  //const url = 'https://haveibeenpwned.com/api/v2/breaches';
  //const data = await fetch (url);
  //const bData = await data.json();
  //countDataClasses(bData);
//});

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
  console.log(countClasses)
  return countClasses;
//return an array of numbers
}

const ctx = document.getElementById('myChart');

new Chart(ctx, {
type: 'bar',
data: {
  labels: ['Email Addresses', 'Passwords', 'Phone Numbers', 'IP Addresses', 'Names', 'Physical Addresses'],
  datasets: [{
    label: '# of Votes',
    data: countDataClasses(bData),
    //data: [1,2,3,4,5],
    borderWidth: 2
  }]
},
options: {
  scales: {
    y: {
      beginAtZero: true
    }
  }
}
});

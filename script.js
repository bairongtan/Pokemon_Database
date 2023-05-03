async function getWebsiteBreachData (){
  const url = 'https://haveibeenpwned.com/api/v2/breaches';
  const data = await fetch (url);
  const bData = await data.json();
  const storedBData = JSON.stringify(bData)
  console.log(storedBData);
  console.log("loaded data")
}



const ctx = document.getElementById('myChart');

new Chart(ctx, {
type: 'scatter',
data: {
  labels: ['Email Addresses', 'IP Addresses', 'Names', 'Passwords', 'Phone Numbers', 'Genders'],
  datasets: [{
    label: '# of Votes',
    data: [12, 19, 3, 5, 2, 3],
    borderWidth: 1
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

const searchHistory=document.getElementById('search-history');
const searchButton=document.getElementById('submitButton');
const possibleCity=document.getElementById('city-search')
const upcomingWeather=document.getElementById('upcoming-Forcast')
const APIkey="3aac3cf73f731021f6d17319dbe4445e";
let city='';
const today=dayjs().format('DD/MM/YYYY');
let pastSearch=[];

function addToSearchHistory(cityN){
    cityN=cityN.toLowerCase();
 if (pastSearch.includes(cityN))
 {
    return;
 }

else
 {  
    pastSearch.push(cityN);
    pastCity=document.createElement('button');
    pastCity.setAttribute('class','align-self-start w-75 my-2 mx-5');
    pastCity.textContent=cityN;
    pastCity.addEventListener('click',function(){weatherReport(cityN)});
    searchHistory.appendChild(pastCity);
    
 }
}

function weatherReport(cityname){
    errorFlag=false;
    // city=(possibleCity.value);
    
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${APIkey}`)

    .then(function (response) {

        if (response.status==404){
            alert("Invalid city name. Check spelling or location.");
            errorFlag=true;
        }
        else{
       return response.json()};
    })

    .then(function (data) {
        addToSearchHistory(data.name);
        $('#today-city').text(`${data.name} (${today})`);
        $('#today-temp').text(`Temp: ${data.main.temp} degrees Farenheight`);
        $('#today-wind').text(`Wind: ${data.wind.deg} at ${data.wind.speed} MPH`);
        $('#today-humidity').text(`Humidty: ${data.main.humidity}`);
        
     });

     for (let index = 1; index < 6; index++) {
        console.log(upcomingWeather.children[index]);
        
     }
}

searchButton.addEventListener('click',function(){weatherReport(possibleCity.value)});




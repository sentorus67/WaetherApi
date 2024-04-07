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
    
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&cnt=6&appid=${APIkey}`)

    .then(function (response) {

        if (response.status==404){
            alert("Invalid city name. Check spelling or location.");
            errorFlag=true;
        }
        else{
       return response.json()};
    })

    .then(function (data) {
        const weatherToday=data.list[0];
        addToSearchHistory(data.city.name);
        console.log(weatherToday);
        $('#today-city').text(`${data.city.name} (${today})`);
        $('#today-temp').text(`Temp: ${weatherToday.main.temp} degrees Farenheight`);
        $('#today-wind').text(`Wind: ${weatherToday.wind.deg} at ${weatherToday.wind.speed} MPH`);
        $('#today-humidity').text(`Humidty: ${weatherToday.main.humidity}%`);

        for (let index = 1; index < 6; index++) {
            const nextDay=upcomingWeather.children[index];
            const nextForcast= data.list[index];
            nextDay.children[0].textContent=`On ${dayjs().add(index,'day').format('DD/MM/YYYY')}`;
            nextDay.children[1].textContent=`Overhead will be ${nextForcast.weather[0].description}`;
            nextDay.children[2].textContent=`Average temp of ${nextForcast.main.temp} degrees farenheight`;
            nextDay.children[3].textContent=`Wind speeds of ${nextForcast.wind.speed} at ${nextForcast.wind.deg} degrees`;
            nextDay.children[4].textContent=`Humidity of ${nextForcast.main.humidity}%`;
        }
        
     });

 

   
}


searchButton.addEventListener('click',function(){weatherReport(possibleCity.value)});




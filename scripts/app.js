import { APIKEY } from "./key.js";
import { saveToLocalFav, getFromLocalFav, removeFromLocalFav, saveToLocalSeen, getFromLocalSeen, removeFromLocalSeen } from "./localStorage.js";

let myDropdown = document.getElementById('myDropdown');
let dropdownBtn = document.getElementById('dropdownBtn');

let day = document.getElementById('day');
let date = document.getElementById('date');
let currentTime = document.getElementById('currentTime');

let searchBar = document.getElementById('searchBar');
let navCurrent = document.getElementById('navCurrent');

let favBtn = document.getElementById('favBtn');
let favContainer = document.getElementById('favContainer');

let currentIcon1 = document.getElementById('currentIcon1');
let currentIcon2 = document.getElementById('currentIcon2');
let currentTemp = document.getElementById('currentTemp');
let maxTemp = document.getElementById('maxTemp');
let minTemp = document.getElementById('minTemp');
let description1 = document.getElementById('description1');
let description2 = document.getElementById('description2');
let deegreeHere1 = document.getElementById('deegreeHere1');
let deegreeHere2 = document.getElementById('deegreeHere2');
let deegreeHere3 = document.getElementById('deegreeHere3');

let forecast1Day = document.getElementById('forecast1Day');
let forecastImg1 = document.getElementById('forecastImg1');
let forcastMax1 = document.getElementById('forcastMax1');
let forcastMin1 = document.getElementById('forcastMin1');
let forecast2Day = document.getElementById('forecast2Day');
let forecastImg2 = document.getElementById('forecastImg2');
let forcastMax2 = document.getElementById('forcastMax2');
let forcastMin2 = document.getElementById('forcastMin2');
let forecast3Day = document.getElementById('forecast3Day');
let forecastImg3 = document.getElementById('forecastImg3');
let forcastMax3 = document.getElementById('forcastMax3');
let forcastMin3 = document.getElementById('forcastMin3');
let forecast4Day = document.getElementById('forecast4Day');
let forecastImg4 = document.getElementById('forecastImg4');
let forcastMax4 = document.getElementById('forcastMax4');
let forcastMin4 = document.getElementById('forcastMin4');
let forecast5Day = document.getElementById('forecast5Day');
let forecastImg5 = document.getElementById('forecastImg5');
let forcastMax5 = document.getElementById('forcastMax5');
let forcastMin5 = document.getElementById('forcastMin5');

// for testing
// let lat = "52.3676";
// let lon = "4.9041";
// let userSearch = "Amsterdam"

let timeSinceEpoch = 0;

// data fetches
let lat = "";
let lon = "";
let userSearch = ""
let placeName = "";


async function CurrentWeather(){

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
    const data = await promise.json();
    console.log(data)
    // if you are gonna use data outside of this function remember to do the return
    return data;
    
}

async function forecastWeather(){

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
    const data = await promise.json();
    console.log(data)
    return data;
  
}

async function getName(){

    const promise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userSearch}&limit=1&appid=${APIKEY}`);
    const data = await promise.json();
    console.log(data)
    return data;
    
}


// dropdown
function dropdown(){
    myDropdown.classList.toggle("show")

}

dropdownBtn.addEventListener('click', function(){
    dropdown()
})




async function currentInfo(){
let data = await CurrentWeather()
console.log(data);

// Time and date part
timeSinceEpoch = data.dt 

let startDay = new Date('January 2, 2024 00:00:00');
let getDay = startDay.getDay()
let currentDay = ["Sunday, ", "Monday, ", "Tuesday, ", "Wednesday, ", "Thursday, ", "Friday, ", "Saturday, "]

day.innerText = currentDay[getDay]

// I used Chat GPT to help me translate the time from seconds to the 12 hour, I wasnt able to find the answer trugh google. I was able to understand how the other methods on my own tho
let millisecondsSinceEpoch = timeSinceEpoch * 1000;
let date2 = new Date(millisecondsSinceEpoch);
let dayOfMonth = date2.getDate();
let year = date2.getFullYear();
let month = date2.getMonth();


let months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]

let timeZone = data.timezone

let timeRn = date2.toLocaleTimeString('timeZone', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
});

currentTime.innerText = timeRn;
date.innerText = `${months[month]}/${dayOfMonth}/${year}`;


// the actual weather part

currentIcon1.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
currentIcon2.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
description1.innerText = data.weather[0].description
description2.innerText = data.weather[0].description
let temperature = (data.main.temp - 273.15) * 9/5 + 32;
let temperatureMax = (data.main.temp_max - 273.15) * 9/5 + 32;
let temperatureMin = (data.main.temp_min - 273.15) * 9/5 + 32;

currentTemp.innerText = `${temperature.toFixed()}°F`
maxTemp.innerText = `${temperatureMax.toFixed()}°F`
minTemp.innerText = `${temperatureMin.toFixed()}°F`


navCurrent.innerText = `${placeName} ${temperature.toFixed()}°`

}



// SearchBar
searchBar.addEventListener('keydown', function(event){
    if(event.key === "Enter")
    {
    removeFromLocalSeen(userSearch)
     userSearch = searchBar.value;
     getCityName()
     .then(() => {
     currentInfo() 
     forecastFunc()})
    }

})


// translating the search bar value onto a location
async function getCityName() {
    let data = await getName();
   
    lat = data[0].lat;
    lon = data[0].lon;
    placeName = data[0].name;
    saveToLocalSeen(placeName)
        
}

// forecast Function
async function forecastFunc(){
    let data = await forecastWeather();
    // Getting the average for the min and max temperatures
    let minAve1 = (((data.list[0].main.temp_min + data.list[1].main.temp_min + data.list[2].main.temp_min + data.list[3].main.temp_min + data.list[4].main.temp_min + data.list[5].main.temp_min + data.list[6].main.temp_min + data.list[7].main.temp_min) / 8) - 273.15) * 9/5 + 32;
    let minAve2 = (((data.list[8].main.temp_min + data.list[9].main.temp_min + data.list[10].main.temp_min + data.list[11].main.temp_min + data.list[12].main.temp_min + data.list[13].main.temp_min + data.list[14].main.temp_min + data.list[15].main.temp_min) / 8) - 273.15) * 9/5 + 32;
    let minAve3 = (((data.list[16].main.temp_min + data.list[17].main.temp_min + data.list[18].main.temp_min + data.list[19].main.temp_min + data.list[20].main.temp_min + data.list[21].main.temp_min + data.list[22].main.temp_min + data.list[23].main.temp_min) / 8) - 273.15) * 9/5 + 32;
    let minAve4 = (((data.list[24].main.temp_min + data.list[25].main.temp_min + data.list[26].main.temp_min + data.list[27].main.temp_min + data.list[28].main.temp_min + data.list[29].main.temp_min + data.list[30].main.temp_min + data.list[31].main.temp_min) / 8) - 273.15) * 9/5 + 32;
    let minAve5 = (((data.list[32].main.temp_min + data.list[33].main.temp_min + data.list[34].main.temp_min + data.list[35].main.temp_min + data.list[36].main.temp_min + data.list[37].main.temp_min + data.list[38].main.temp_min + data.list[39].main.temp_min) / 8) - 273.15) * 9/5 + 32;

    let maxAve1 = (((data.list[0].main.temp_max + data.list[1].main.temp_max + data.list[2].main.temp_max + data.list[3].main.temp_max + data.list[4].main.temp_max + data.list[5].main.temp_max + data.list[6].main.temp_max + data.list[7].main.temp_max) / 8) - 273.15) * 9/5 + 32;
    let maxAve2 = (((data.list[8].main.temp_max + data.list[9].main.temp_max + data.list[10].main.temp_max + data.list[11].main.temp_max + data.list[12].main.temp_max + data.list[13].main.temp_max + data.list[14].main.temp_max + data.list[15].main.temp_max) / 8) - 273.15) * 9/5 + 32;
    let maxAve3 = (((data.list[16].main.temp_max + data.list[17].main.temp_max + data.list[18].main.temp_max + data.list[19].main.temp_max + data.list[20].main.temp_max + data.list[21].main.temp_max + data.list[22].main.temp_max + data.list[23].main.temp_max) / 8) - 273.15) * 9/5 + 32;
    let maxAve4 = (((data.list[24].main.temp_max + data.list[25].main.temp_max + data.list[26].main.temp_max + data.list[27].main.temp_max + data.list[28].main.temp_max + data.list[29].main.temp_max + data.list[30].main.temp_max + data.list[31].main.temp_max) / 8) - 273.15) * 9/5 + 32;
    let maxAve5 = (((data.list[32].main.temp_max + data.list[33].main.temp_max + data.list[34].main.temp_max + data.list[35].main.temp_max + data.list[36].main.temp_max + data.list[37].main.temp_max + data.list[38].main.temp_max + data.list[39].main.temp_max) / 8) - 273.15) * 9/5 + 32;

    forcastMin1.innerText = `${minAve1.toFixed()}°`;
    forcastMin2.innerText = `${minAve2.toFixed()}°`;
    forcastMin3.innerText = `${minAve3.toFixed()}°`;
    forcastMin4.innerText = `${minAve4.toFixed()}°`;
    forcastMin5.innerText = `${minAve5.toFixed()}°`;

    forcastMax1.innerText = `${maxAve1.toFixed()}°`;
    forcastMax2.innerText = `${maxAve1.toFixed()}°`;
    forcastMax3.innerText = `${maxAve1.toFixed()}°`;
    forcastMax4.innerText = `${maxAve1.toFixed()}°`;
    forcastMax5.innerText = `${maxAve1.toFixed()}°`;

    forecastImg1.src = `http://openweathermap.org/img/wn/${data.list[4].weather[0].icon}@2x.png`
    forecastImg2.src = `http://openweathermap.org/img/wn/${data.list[12].weather[0].icon}@2x.png`
    forecastImg3.src = `http://openweathermap.org/img/wn/${data.list[20].weather[0].icon}@2x.png`
    forecastImg4.src = `http://openweathermap.org/img/wn/${data.list[28].weather[0].icon}@2x.png`
    forecastImg5.src = `http://openweathermap.org/img/wn/${data.list[36].weather[0].icon}@2x.png`


    // Getting the dates
    let seconds1 = new Date((data.list[4].dt * 1000));
    let seconds2 = new Date((data.list[12].dt * 1000));
    let seconds3 = new Date((data.list[20].dt * 1000));
    let seconds4 = new Date((data.list[28].dt * 1000));
    let seconds5 = new Date((data.list[36].dt * 1000));

    let day1 = seconds1.getDate();
    let day2 = seconds2.getDate();
    let day3 = seconds3.getDate();
    let day4 = seconds4.getDate();
    let day5 = seconds5.getDate();

    let dayName1 = seconds1.getDay();
    let dayName2 = seconds2.getDay();
    let dayName3 = seconds3.getDay();
    let dayName4 = seconds4.getDay();
    let dayName5 = seconds5.getDay();
   
    let futureDay = ["Sun ", "Mon ", "Tue ", "Wed ", "Thu ", "Fri ", "Sat "]

    forecast1Day.innerText = `${futureDay[dayName1]} ${day1}`
    forecast2Day.innerText = `${futureDay[dayName2]} ${day2}`
    forecast3Day.innerText = `${futureDay[dayName3]} ${day3}`
    forecast4Day.innerText = `${futureDay[dayName4]} ${day4}`
    forecast5Day.innerText = `${futureDay[dayName5]} ${day5}`

}





let favorite = false

favBtn.addEventListener('click', function(){
    if (!favorite)
    {
        favBtn.src = "../assets/filledStar.png"
        favorite = true;
        saveToLocalFav(placeName);
    }
    else
    {
        favBtn.src = "../assets/star.png"
        favorite = false
    }

    

})



// Commented out so it doesnt eat up all my fetches

// window.addEventListener('load', function() {
//     let lastPlaceVisited = getFromLocalSeen()
//     if (!lastPlaceVisited || lastPlaceVisited.length === 0)
//     {
//         console.log("this is your first time here!")
//     }
//     else
//     {
//     userSearch = lastPlaceVisited[0]
//     getCityName()
//     .then(() => {
//     currentInfo() 
//     forecastFunc()
    
//     })
//     }


// })
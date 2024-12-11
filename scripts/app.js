import { APIKEY } from "./key.js";

let myDropdown = document.getElementById('myDropdown');
let dropdownBtn = document.getElementById('dropdownBtn');

let day = document.getElementById('day');
let date = document.getElementById('date');
let currentTime = document.getElementById('currentTime');

let searchBar = document.getElementById('searchBar');

let currentIcon = document.getElementById('currentIcon');
let maxTemp = document.getElementById('maxTemp');
let minTemp = document.getElementById('minTemp');

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
let lat = "52.3676";
let lon = "4.9041";
let userSearch = ""

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

//Date and Time



async function currentInfo(){
let data = await CurrentWeather()
console.log(data);

// Time and date part
timeSinceEpoch = data.dt 

let startDay = new Date('January 2, 2024 00:00:00');
let getDay = startDay.getDay()
let currentDay = ["Sunday, ", "Monday, ", "Tuesday, ", "Wednesday, ", "Thursday, ", "Friday, ", "Saturday, "]

day.innerText = currentDay[getDay]

// I used Chat GPT to help me translate the time from seconds to the 12 hour, I wasnt able to find the answer trugh google.
let millisecondsSinceEpoch = timeSinceEpoch * 1000;
let date2 = new Date(millisecondsSinceEpoch);
let dayOfMonth = date2.getDate();

let timeRn = date2.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
});

currentTime.innerText = timeRn;
date.innerText = dayOfMonth;

}













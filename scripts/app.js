import { APIKEY } from "./key.js";

let myDropdown = document.getElementById('myDropdown');
let dropdownBtn = document.getElementById('dropdownBtn');

let day = document.getElementById('day')
let date = document.getElementById('date')
let currentTime = document.getElementById('currentTime')

let searchBar = document.getElementById('searchBar');


// for testing
// let lat = "52.3676";
// let lon = "4.9041";
// let userSearch = "Amsterdam"

let timeSinceEpoch = 0;

// data fetches
let lat = "";
let lon = "";
let userSearch = ""

async function CurrentWeather(){

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
    const data = await promise.json();
    console.log(data.dt)
}

async function forecastWeather(){

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
    const data = await promise.json();
    console.log(data)
}

async function getName(){

    const promise = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userSearch}&limit=1&appid=${APIKEY}`);
    const data = await promise.json();
    console.log(data)
}


// dropdown
function dropdown(){
    myDropdown.classList.toggle("show")
}

dropdownBtn.addEventListener('click', function(){
    dropdown()
})

//Date and Time



function dateNTime(){
// FOR SOME REASON IT CANT READ DATA.DT REMEMBER TO ASK A TEACEHR FOR HELP LATER
CurrentWeather().then( data => {
timeSinceEpoch = data.dt 

let startDay = new Date('January 2, 2024 00:00:00');
let getDay = startDay.getDay()
let currentDay = ["Sunday, ", "Monday, ", "Tuesday, ", "Wednesday, ", "Thursday, ", "Friday, ", "Saturday, "]

day.innerText = currentDay[getDay]

// I used Chat GPT to help me translate the time from seconds to the 12 hour, I wasnt able to find the answer trugh google.
let millisecondsSinceEpoch = timeSinceEpoch * 1000;
let date2 = new Date(millisecondsSinceEpoch);
let timeRn = date2.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
});


currentTime.innerText = timeRn

})}



// dateNTime()








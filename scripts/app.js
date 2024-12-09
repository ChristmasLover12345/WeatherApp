import { APIKEY } from "./key.js";

let myDropdown = document.getElementById('myDropdown');
let dropdownBtn = document.getElementById('dropdownBtn');

let searchBar = document.getElementById('searchBar');


// for testing
// let lat = "52.3676";
// let lon = "4.9041";
// let userSearch = "Amsterdam"

let lat = "";
let lon = "";
let userSearch = ""

async function CurrentWeather(){

    const promise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}`);
    const data = await promise.json();
    console.log(data)
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

function dropdown(){
    myDropdown.classList.toggle("show")
}

dropdownBtn.addEventListener('click', function(){
    dropdown()
})




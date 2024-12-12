



function saveToLocalFav(place){
    let placeArr = getFromLocalFav();
    if (!placeArr.includes(place)){
        nameArr.push(place);
    }
    localStorage.setItem('Favorites', JSON.stringify(placeArr));
}

function getFromLocalFav(){
    let localStorageData = localStorage.getItem('Favorites');
    if (localStorageData == null){
        return [];
    }
    return JSON.parse(localStorageData);
}


function removeFromLocalFav(place){
    let localStorageData = getFromLocalFav();
    let placeIndex = localStorageData.indexOf(place);
    localStorageData.splice(placeIndex, 1);
    localStorage.setItem('Favorites', JSON.stringify(localStorageData));
}


export { saveToLocalFav, getFromLocalFav, removeFromLocalFav }
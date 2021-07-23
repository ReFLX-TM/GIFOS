import crear from "./crearHTML.js";

let storage = window.localStorage;
let idString = "";

let gifID = storage.getItem("0")


for (let counter = 0; counter < storage.length; counter++){
    if (counter == 0){
        idString += storage.getItem(`${counter}`);
    }
    else {
        idString += "," + storage.getItem(`${counter}`);
    }
}

const gifResponse = await fetch(`https://api.giphy.com/v1/gifs?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK&ids=${idString}`);
const gifJson = await gifResponse.json();
const favGif = gifJson.data;

crear.crearFavoritosGif(favGif);
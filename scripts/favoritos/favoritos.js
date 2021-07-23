import crear from "./crearHTML.js";

let storage = window.localStorage;
let idString = "";

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

let suma = 0;

crear.crearFavoritosGif(favGif, suma);

const verMas = document.getElementById("ver-mas");

if (favGif.length <= 12){
    verMas.className = "inactivo"
}

else {
    verMas.className = "";
}

verMas.addEventListener("click", (e) => {
    if (favGif.length >= 24 + suma){
        suma += 12;
        crear.crearFavoritosGif(favGif, suma);
    }
    else {
        verMas.className = "inactivo";
        suma += (favGif.length - (suma + 12));
        crear.crearFavoritosGif(favGif, suma);
    }
})
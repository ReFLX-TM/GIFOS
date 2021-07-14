import crear from "./crearHTML.js";

const trendingResponse = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK&limit=15");
const trendingJson = await trendingResponse.json();
const gifArray = trendingJson.data;

let indice = 0;

crear.crearTrendingGif(gifArray, indice);

const botonIzquierda = document.getElementById("boton-galeria-atras");
const botonDerecha = document.getElementById("boton-galeria-adelante");

botonIzquierda.addEventListener("click", () => {
    if (indice > 0) {
        indice -= 1;
        crear.crearTrendingGif(gifArray, indice);
    }
})

botonDerecha.addEventListener("click", () => {
    if (indice < 12) {
        indice += 1;
        crear.crearTrendingGif(gifArray, indice);
    }
})
import crear from "./crearHTML.js";
const galeria = document.getElementById("galeria-gif");
const trendingResponse = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK&limit=15");
const trendingJson = await trendingResponse.json();
const gifArray = trendingJson.data;

crear.crearTrendingGif(gifArray);

const botonIzquierda = document.getElementById("boton-galeria-atras");
const botonDerecha = document.getElementById("boton-galeria-adelante");

botonIzquierda.addEventListener("click", () => {
    galeria.scrollLeft -= 550;
})

botonDerecha.addEventListener("click", () => {
    galeria.scrollLeft += 550;
})
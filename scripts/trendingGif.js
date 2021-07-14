import crear from "./crearHTML.js";

const trendingResponse = await fetch("https://api.giphy.com/v1/gifs/trending?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK&limit=15");
const trendingJson = await trendingResponse.json();
const gifArray = trendingJson.data;


crear.crearTrendingGif(gifArray, 0);
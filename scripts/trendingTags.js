import crear from "./crearHTML.js";

const trendingResponse = await fetch("https://api.giphy.com/v1/trending/searches?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK");
const trendingJson = await trendingResponse.json();
const trendingArray = trendingJson.data;

crear.crearTrendings(trendingArray);
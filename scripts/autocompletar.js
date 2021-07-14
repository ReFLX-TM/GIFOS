import crear from "./crearHTML.js";

const inputText = document.getElementById("buscar")

inputText.addEventListener("keyup", async (e) => {
    if (e.target.value != ""){
        const autoResponse = await fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK&q=${e.target.value}`);
        const autoJson = await autoResponse.json();
        const autoArray = autoJson.data;
        crear.autocompletar(autoArray);
    }
    else {
        crear.autocompletar([])
    }
})


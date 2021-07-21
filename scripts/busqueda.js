import crear from "./crearHTML.js";

const inputText = document.getElementById("buscar")
const inputAuto = document.getElementById("autocompletar")
const resultado = document.getElementById("resultados")

inputText.addEventListener("keyup", async (e) => {
    if (e.keyCode == 13) {
        const buscarResponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK&q=${e.target.value}`)
        const buscarJson = await buscarResponse.json();
        const buscarArray = buscarJson.data;
        crear.busquedaGifs(e.target.value, buscarArray);
        resultado.className = "resultados-busqueda"
    }
    
    else if (e.target.value != ""){
        const autoResponse = await fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK&q=${e.target.value}`);
        const autoJson = await autoResponse.json();
        const autoArray = autoJson.data;
        crear.autocompletar(autoArray);
        e.target.className = "buscando";
        inputAuto.className = "autocompletar";
    }

    else {
        e.target.className = "";
        inputAuto.className = "inactivo";
        crear.autocompletar([])
    }
})
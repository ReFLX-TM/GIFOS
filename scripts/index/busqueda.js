import crear from "./crearHTML.js"

const inputText = document.getElementById("buscar");
const inputAuto = document.getElementById("autocompletar");
const resultado = document.getElementById("resultados");
const buscar = document.getElementById("boton-busqueda");
const cancelar = document.getElementById("boton-cancelar");
const mas = document.getElementById("ver-mas");
let suma = 0;
let busqueda = "";
let buscarArray = [];

/*Creacion de tags en trending y su busqueda*/

const trendingResponse = await fetch("https://api.giphy.com/v1/trending/searches?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK");
const trendingJson = await trendingResponse.json();
const trendingArray = trendingJson.data;
if (trendingArray != []){
    crear.crearTrendings(trendingArray);
    let tags = document.querySelectorAll(".tag")
    for (let tag of tags){
        tag.addEventListener("click", async (e) => {
            inputText.className = "";
            inputAuto.className = "inactivo"
            buscar.className = "boton-busqueda";
            cancelar.className = "boton-cancelar";
            suma = 0;
            inputText.value = `${e.target.innerHTML}`;
            const buscarResponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK&q=${e.target.innerHTML}`)
            const buscarJson = await buscarResponse.json();
            buscarArray = buscarJson.data;
            crear.busquedaGifs(e.target.innerHTML, buscarArray, 12 + suma);
            resultado.className = "resultados-busqueda";
        })
    }
}

/*EventListeners de las busquedas*/


inputText.addEventListener("keyup", async (e) => {
    suma = 0;
    busqueda = e.target.value;

    if (e.keyCode == 13) {
        e.target.className = "";
        inputAuto.className = "inactivo"
        buscar.className = "boton-busqueda";
        cancelar.className = "boton-cancelar";
        const buscarResponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK&q=${busqueda}&limit=48`)
        const buscarJson = await buscarResponse.json();
        buscarArray = buscarJson.data;
        crear.busquedaGifs(busqueda, buscarArray, 12 + suma);
        resultado.className = "resultados-busqueda";
    }
    
    else if (e.target.value != ""){
        const autoResponse = await fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK&q=${busqueda}`);
        const autoJson = await autoResponse.json();
        const autoArray = autoJson.data;
        crear.autocompletar(autoArray);
        e.target.className = "buscando";
        buscar.className = "buscar-activo";
        cancelar.className = "cancelar-activo";
        inputAuto.className = "autocompletar";

        let sugerenciasLink = document.querySelectorAll(".sugerencia a");
        for (let sugerencia of sugerenciasLink){
            sugerencia.addEventListener("click", async (e) => {  
            inputText.className = "";
            inputAuto.className = "inactivo"
            buscar.className = "boton-busqueda";
            cancelar.className = "boton-cancelar";
            inputText.value = `${sugerencia.innerText}`;
            busqueda = sugerencia.innerText; 
            suma = 0;
            const buscarResponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK&q=${busqueda}&limit=48`)
            const buscarJson = await buscarResponse.json();
            buscarArray = buscarJson.data;
            crear.busquedaGifs(busqueda, buscarArray, 12 + suma);
            resultado.className = "resultados-busqueda";

            })
        }
    }

    else {
        e.target.className = "";
        inputAuto.className = "inactivo";
        buscar.className = "boton-busqueda";
        cancelar.className = "boton-cancelar";
        crear.autocompletar([])
    }
})

buscar.addEventListener("click", async (e) => {
    if (busqueda != ""){
        inputText.className = "";
        inputAuto.className = "inactivo"
        buscar.className = "boton-busqueda";
        cancelar.className = "boton-cancelar";
        suma = 0;
        const buscarResponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK&q=${busqueda}&limit=48`)
        const buscarJson = await buscarResponse.json();
        buscarArray = buscarJson.data;
        crear.busquedaGifs(busqueda, buscarArray, 12 + suma);
        resultado.className = "resultados-busqueda";
    }
})

cancelar.addEventListener("click", (e) => {
    inputText.value = "";
    busqueda = "";
    inputText.className = "";
    inputAuto.className = "inactivo";
    buscar.className = "boton-busqueda";
    cancelar.className = "boton-cancelar";
    crear.autocompletar([])
})

mas.addEventListener("click", async (e) => {
    busqueda = `${inputText.value}`;
    suma += 12;
    if ((12 + suma) < buscarArray.length){
        crear.busquedaGifs(busqueda, buscarArray, 12 + suma);
    }
    else {
        crear.busquedaGifs(busqueda, buscarArray, 12 + suma);
        mas.className = "inactivo";
    }
})

const maximizar = document.getElementById("expandir");

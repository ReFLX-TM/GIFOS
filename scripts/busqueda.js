import crear from "./crearHTML.js";

const inputText = document.getElementById("buscar");
const inputAuto = document.getElementById("autocompletar");
const resultado = document.getElementById("resultados");
const galeria = document.getElementById("resultados-busqueda");
const buscar = document.getElementById("boton-busqueda");
const cancelar = document.getElementById("boton-cancelar");
const mas = document.getElementById("ver-mas");
let suma = 0;
let busqueda = "";
let buscarArray = [];

inputText.addEventListener("keyup", async (e) => {
    suma = 0;
    busqueda = e.target.value;

    if (e.keyCode == 13) {
        const buscarResponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK&q=${busqueda}&limit=40`)
        const buscarJson = await buscarResponse.json();
        buscarArray = buscarJson.data;
        crear.busquedaGifs(busqueda, buscarArray, 12 + suma);
        if (galeria.innerHTML != ""){
            resultado.className = "resultados-busqueda";
        }
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
        const buscarResponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK&q=${busqueda}&limit=40`)
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
    suma += 8;
    if ((12 + suma) < buscarArray.length){
        crear.busquedaGifs(busqueda, buscarArray, 12 + suma);
    }
})

/*Esto va en crearHTML en la funcion que crea los trendinng tags, aqui por alguna razón 
no esta tomando los anchors que necesitamos para obtener los tags en trending,
lo moviste de sitio haciendo pruebas para ver si arreglabas el botón de ver mas cuando hacias
la busqueda por los tags en trending*/


function crearTrendings(stringArray){
    const trendingTags = document.getElementById("trending-tags");
    trendingTags.innerHTML = `<a class="tag" href="#trending-tags">${stringArray[0]}</a>, <a class="tag" href="#trending-tags">${stringArray[1]}</a>, <a class="tag" href="#trending-tags">${stringArray[2]}</a>, <a class="tag" href="#trending-tags">${stringArray[3]}</a>, <a class="tag" href="#trending-tags">${stringArray[4]}</a>
    `;
}

function maximizar(gif, gifArray){
    const max = document.getElementById("max");
    max.className = "expandir"
    max.innerHTML = `
    <button class="max-cerrar" id="max-cerrar"><i class="fas fa-times"></i></button>
    <div class="max-galeria">
        <button id="max-izquierda"><</button>
        <div id="gif-max">
            <img src="${gifArray[gif].images.original.url}">
            <div class="max-info">
                <h3>${gifArray[gif].username}</h3>
                <h4>${gifArray[gif].title}</h4>
            </div>
            <div class="max-buttons">
                <button id="fav"><i class="far fa-heart"></i></button>
                <button id="descargar"><i class="fas fa-download"></i></button>
            </div>
        </div>
        <button id="max-derecha">></button>
    </div>
    `


    const maxCerrar = document.getElementById("max-cerrar");

    maxCerrar.addEventListener("click", (e) => {
        max.className = "inactivo"
    })
}

let guardados = 0;
let storage = window.localStorage;
storage.clear();

function favoritear(htmlString) {
    storage.setItem(`${guardados}`, `${htmlString}`)
    guardados += 1;
}

function crearTrendingGif(gifArray){
    if (gifArray != []) {
        const trendingGif = document.getElementById("galeria-gif");
        trendingGif.innerHTML = "";
        for (let counter = 0; counter < 10; counter++){
            trendingGif.innerHTML += `
            <div class="tarjeta trending" id="${counter}">
                <img src="${gifArray[counter].images.fixed_height.url}" class="gif" alt="gif">
                <div class="fondo-tarjeta">
                    <div class="contenedor-botones">
                        <div class="boton-tarjeta" name="${counter}" id="favoritos"><i class="far fa-heart"></i></div>
                        <div class="boton-tarjeta" name="${counter}" id="descargar"><i class="fas fa-download"></i></div>
                        <div class="boton-tarjeta" name="${counter}" id="expandir"><i class="fas fa-expand-alt"></i></div>
                    </div>
                
                    <h4 class="info-tarjeta">${gifArray[counter].username}</h4>
                    <h3 class="info-tarjeta">${gifArray[counter].title}</h3>
                </div>
            </div>
            ` 
        }
    }

    const gifExpandir = document.querySelectorAll("#expandir");

    for (let gif of gifExpandir){
        gif.addEventListener("click", (e) => {
            maximizar(gif.attributes.name.value, gifArray);
        })
    }

    const gifFavoritos = document.querySelectorAll("#favoritos");
    const gifEnTrending = document.querySelectorAll(".trending");

    for (let gif of gifFavoritos){
        gif.addEventListener("click", (e) => {
            favoritear(gifEnTrending[gif.attributes.name.value].innerHTML);
        })
    }
}

function autocompletar(autoArray){
    const auto = document.getElementById("autocompletar")
    auto.innerHTML = "";

    if (autoArray != []){
        auto.innerHTML = "<hr/>"
        for (const sugerencia of autoArray){
            auto.innerHTML +=
                `
                <div class="sugerencia">
                    <i class="fas fa-search"></i>
                    <li><a href="#buscar">${sugerencia.name}<a></li>
                </div>
                `;
        }
    }
}

function busquedaGifs(busqueda, gifArray, clave){
    const seccion = document.getElementById("resultados")
    const titulo = document.getElementById("titulo-busqueda");
    const noResult = document.getElementById("lo-sentimos")
    const resultados = document.getElementById("resultados-busqueda");
    const mas = document.getElementById("ver-mas");
    
    if (gifArray.length != 0){
        titulo.innerHTML = `${busqueda}`;
        resultados.innerHTML = "";
        for (let counter = 0; counter < clave; counter++){
            resultados.innerHTML += `
            <div class="tarjeta gif-busqueda" id="${counter}">
                <img src="${gifArray[counter].images.fixed_height.url}" class="gif" alt="gif">
                <div class="fondo-tarjeta">
                    <div class="contenedor-botones">
                        <div class="boton-tarjeta" name="${counter}" id="favoritos"><i class="far fa-heart"></i></div>
                        <div class="boton-tarjeta" name="${counter}" id="descargar"><i class="fas fa-download"></i></div>
                        <div class="boton-tarjeta" name="${counter}" id="expandir"><i class="fas fa-expand-alt"></i></div>
                    </div>
                
                    <h4 class="info-tarjeta">${gifArray[counter].username}</h4>
                    <h3 class="info-tarjeta">${gifArray[counter].title}</h3>
                </div>
            </div>
            ` 
        }
    }
    else {
        titulo.innerHTML = "Lorem Ipsum";
        seccion.className = "sin-resultados";
        noResult.className = "contenedor-noresult";
        resultados.className = "inactivo";
        mas.className = "inactivo";
    }
    
    const gifGaleria = document.querySelectorAll("#expandir");

    for (let gif of gifGaleria){
        gif.addEventListener("click", (e) => {
            maximizar(gif.attributes.name.value, gifArray);
        })
    }
}



export default {crearTrendings, crearTrendingGif, autocompletar, busquedaGifs, maximizar, favoritear};
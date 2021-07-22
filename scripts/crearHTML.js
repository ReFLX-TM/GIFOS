function crearTrendings(stringArray){
    const trendingTags = document.getElementById("trending-tags");
    trendingTags.innerHTML = `<a class="tag" href="#trending-tags">${stringArray[0]}</a>, <a class="tag" href="#trending-tags">${stringArray[1]}</a>, <a class="tag" href="#trending-tags">${stringArray[2]}</a>, <a class="tag" href="#trending-tags">${stringArray[3]}</a>, <a class="tag" href="#trending-tags">${stringArray[4]}</a>
    `;
}

function crearTrendingGif(gifArray){
    if (gifArray != []) {
        const trendingGif = document.getElementById("galeria-gif");
        trendingGif.innerHTML = "";
        for (let counter = 0; counter < 10; counter++){
            trendingGif.innerHTML += `
            <div class="tarjeta trending">
                <img src="${gifArray[counter].images.fixed_height.url}" class="gif" alt="gif">
                <div class="fondo-tarjeta">
                    <div class="contenedor-botones">
                        <div class="boton-tarjeta" id="favoritos"><i class="far fa-heart"></i></div>
                        <div class="boton-tarjeta" id="descargar"><i class="fas fa-download"></i></div>
                        <div class="boton-tarjeta" id="expandir"><i class="fas fa-expand-alt"></i></div>
                    </div>
                
                    <h4 class="info-tarjeta">${gifArray[counter].username}</h4>
                    <h3 class="info-tarjeta">${gifArray[counter].title}</h3>
                </div>
            </div>
            ` 
        }
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
            <div class="tarjeta gif-busqueda">
                <img src="${gifArray[counter].images.fixed_height.url}" class="gif" alt="gif">
                <div class="fondo-tarjeta">
                    <div class="contenedor-botones">
                        <div class="boton-tarjeta" id="favoritos"><i class="far fa-heart"></i></div>
                        <div class="boton-tarjeta" id="descargar"><i class="fas fa-download"></i></div>
                        <div class="boton-tarjeta" id="expandir"><i class="fas fa-expand-alt"></i></div>
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
}

export default {crearTrendings, crearTrendingGif, autocompletar, busquedaGifs};
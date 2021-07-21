function crearTrendings(stringArray){
    const trendingTags = document.getElementById("trending-tags");
    trendingTags.innerHTML = `<a href="#">${stringArray[0]}</a>, <a href="#">${stringArray[1]}</a>, <a href="#">${stringArray[2]}</a>, <a href="#">${stringArray[3]}</a>, <a href="#">${stringArray[4]}</a>
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
                <li>${sugerencia.name}</li>
                `;
        }
    }
}

function busquedaGifs(busqueda, gifArray){
    const titulo = document.getElementById("titulo-busqueda");
    const resultados = document.getElementById("resultados-busqueda");
    titulo.innerHTML = `${busqueda}`;
    resultados.innerHTML = "";
    for (let counter = 0; counter < 16; counter++){
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

export default {crearTrendings, crearTrendingGif, autocompletar, busquedaGifs};
function crearTrendings(stringArray){
    const trendingTags = document.getElementById("trending-tags");
    trendingTags.innerHTML = `${stringArray[0]}, ${stringArray[1]}, ${stringArray[2]}, ${stringArray[3]}, ${stringArray[4]}
    `;
}

function crearTrendingGif(gifArray, indice){
    console.log(gifArray)
    if (gifArray != []) {
        const trendingGif = document.querySelectorAll("#trend");
        trendingGif[0].innerHTML = `
        <img src="${gifArray[indice].images.fixed_height.url}" class="gif" alt="gif">
        <div class="fondo-tarjeta">
            <div class="contenedor-botones">
                <div class="boton-tarjeta" id="favoritos"><i class="far fa-heart"></i></div>
                <div class="boton-tarjeta" id="descargar"><i class="fas fa-download"></i></div>
                <div class="boton-tarjeta" id="expandir"><i class="fas fa-expand-alt"></i></div>
            </div>
        
            <h4 class="info-tarjeta">${gifArray[indice].username}</h4>
            <h3 class="info-tarjeta">${gifArray[indice].title}</h3>
        </div>
        `
        trendingGif[1].innerHTML = `
        <img src="${gifArray[indice + 1].images.fixed_height.url}" class="gif" alt="gif">
        <div class="fondo-tarjeta">
            <div class="contenedor-botones">
                <div class="boton-tarjeta" id="favoritos"><i class="far fa-heart"></i></div>
                <div class="boton-tarjeta" id="descargar"><i class="fas fa-download"></i></div>
                <div class="boton-tarjeta" id="expandir"><i class="fas fa-expand-alt"></i></div>
            </div>
        
            <h4 class="info-tarjeta">${gifArray[indice + 1].username}</h4>
            <h3 class="info-tarjeta">${gifArray[indice + 1].title}</h3>
        </div>
        `
        trendingGif[2].innerHTML = `
        <img src="${gifArray[indice + 2].images.fixed_height.url}" class="gif" alt="gif">
        <div class="fondo-tarjeta">
            <div class="contenedor-botones">
                <div class="boton-tarjeta" id="favoritos"><i class="far fa-heart"></i></div>
                <div class="boton-tarjeta" id="descargar"><i class="fas fa-download"></i></div>
                <div class="boton-tarjeta" id="expandir"><i class="fas fa-expand-alt"></i></div>
            </div>
        
            <h4 class="info-tarjeta">${gifArray[indice + 2].username}</h4>
            <h3 class="info-tarjeta">${gifArray[indice + 2].title}</h3>
        </div>
        `
    }
}

function autocompletar(autoArray){
    const auto = document.getElementById("autocompletar")
    auto.innerHTML = "";

    if (autoArray != []){
        for (const sugerencia of autoArray){
            auto.innerHTML +=
                `
                <li>${sugerencia.name}</li>
                `;
        }
    }
}

export default {crearTrendings, crearTrendingGif, autocompletar};
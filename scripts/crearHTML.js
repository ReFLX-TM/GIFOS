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
                    <li>${sugerencia.name}</li>
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

function crearTrendings(stringArray){
    const trendingTags = document.getElementById("trending-tags");
    trendingTags.innerHTML = `<a class="tag" href="#trending-tags">${stringArray[0]}</a>, <a class="tag" href="#trending-tags">${stringArray[1]}</a>, <a class="tag" href="#trending-tags">${stringArray[2]}</a>, <a class="tag" href="#trending-tags">${stringArray[3]}</a>, <a class="tag" href="#trending-tags">${stringArray[4]}</a>
    `;

    /*Falta arreglar que no funciona el botón de ver mas*/

    const buscar = document.getElementById("buscar");
    const resultado = document.getElementById("resultados")
    const tags = document.querySelectorAll(".tag")
    for (let tag of tags){
        tag.addEventListener("click", async (e) => {
            buscar.value = `${e.target.innerHTML}`;
            const buscarResponse = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK&q=${e.target.innerHTML}`)
            const buscarJson = await buscarResponse.json();
            const buscarArray = buscarJson.data;
            busquedaGifs(e.target.innerHTML, buscarArray, 12);
            resultado.className = "resultados-busqueda";
        })
    }
}

export default {crearTrendings, crearTrendingGif, autocompletar, busquedaGifs};
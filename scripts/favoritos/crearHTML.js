let storage = window.localStorage;
let guardados = storage.length;

function favoritear(gif, gifArray) {
    storage.setItem(`${guardados}`, `${gifArray[gif].id}`)
    guardados += 1;
}

function maximizar(gif, gifArray){
    const max = document.getElementById("max");
    let indice = parseInt(gif);
    max.className = "expandir"
    max.innerHTML = `
    <button class="max-cerrar" id="max-cerrar"><i class="fas fa-times"></i></button>
    <div class="max-galeria">
        <button id="max-izquierda"><</button>
        <div id="gif-max">
            <img id="gif-original" src="${gifArray[indice].images.original.url}">
            <div class="max-info">
                <h3 id="gif-max-user">${gifArray[indice].username}</h3>
                <h4 id="gif-max-title">${gifArray[indice].title}</h4>
            </div>
            <div class="max-buttons">
                <button id="max-fav"><i class="far fa-heart"></i></button>
                <button id="max-descargar"><i class="fas fa-download"></i></button>
            </div>
        </div>
        <button id="max-derecha">></button>
    </div>
    `


    const maxCerrar = document.getElementById("max-cerrar");

    maxCerrar.addEventListener("click", (e) => {
        max.className = "inactivo"
    })

    const maxFav = document.getElementById("max-fav");

    maxFav.addEventListener("click", (e) => {
        favoritear(indice, gifArray);
    })

    const img = document.getElementById("gif-original");
    const usuario = document.getElementById("gif-max-user");
    const titulo = document.getElementById("gif-max-title");
    const maxIzquierda = document.getElementById("max-izquierda");
    const maxDerecha = document.getElementById("max-derecha");

    maxIzquierda.addEventListener("click", (e) => {
        if (indice > 0){
            indice -= 1;
            img.attributes.src.value = `${gifArray[indice].images.original.url}`;
            usuario.innerHTML = `${gifArray[indice].username}`;
            titulo.innerHTML = `${gifArray[indice].title}`;
        }
    })

    maxDerecha.addEventListener("click", (e) => {
        if (indice < gifArray.length - 1){
            indice += 1;
            img.attributes.src.value = `${gifArray[indice].images.original.url}`;
            usuario.innerHTML = `${gifArray[indice].username}`;
            titulo.innerHTML = `${gifArray[indice].title}`;
        }
    })
}

function maximizarFav(gif, gifArray){
    const max = document.getElementById("max");
    let indice = parseInt(gif);
    max.className = "expandir"
    max.innerHTML = `
    <button class="max-cerrar" id="max-cerrar"><i class="fas fa-times"></i></button>
    <div class="max-galeria">
        <button id="max-izquierda"><</button>
        <div id="gif-max">
            <img src="${gifArray[indice].images.original.url}">
            <div class="max-info">
                <h3>${gifArray[indice].username}</h3>
                <h4>${gifArray[indice].title}</h4>
            </div>
            <div class="max-buttons">
                <button id="max-fav"><i class="fas fa-heart"></i></button>
                <button id="max-descargar"><i class="fas fa-download"></i></button>
            </div>
        </div>
        <button id="max-derecha">></button>
    </div>
    `


    const maxCerrar = document.getElementById("max-cerrar");

    maxCerrar.addEventListener("click", (e) => {
        max.className = "inactivo"
    })

    const img = document.getElementById("gif-original");
    const usuario = document.getElementById("gif-max-user");
    const titulo = document.getElementById("gif-max-title");
    const maxIzquierda = document.getElementById("max-izquierda");
    const maxDerecha = document.getElementById("max-derecha");

    maxIzquierda.addEventListener("click", (e) => {
        if (indice > 0){
            indice -= 1;
            img.attributes.src.value = `${gifArray[indice].images.original.url}`;
            usuario.innerHTML = `${gifArray[indice].username}`;
            titulo.innerHTML = `${gifArray[indice].title}`;
        }
    })

    maxDerecha.addEventListener("click", (e) => {
        if (indice < gifArray.length - 1){
            indice += 1;
            img.attributes.src.value = `${gifArray[indice].images.original.url}`;
            usuario.innerHTML = `${gifArray[indice].username}`;
            titulo.innerHTML = `${gifArray[indice].title}`;
        }
    })
}

function crearFavoritosGif(gifArray, suma){
    if (gifArray.length != 0) {
        const favoritosGif = document.getElementById("favoritos-guardados");
        let limite = 0;
        favoritosGif.innerHTML = "";

        if (suma == 0){
            if (gifArray.length < 10){
                limite = gifArray.length;
            }
            else {
                limite = 12
            }
        }
        else {
            limite = 12 + suma;
        }

        for (let counter = 0; counter < limite; counter++){
            favoritosGif.innerHTML += `
            <div class="tarjeta gif-favoritos" id="${counter}">
                <img src="${gifArray[counter].images.fixed_height.url}" class="gif" alt="gif">
                <div class="fondo-tarjeta">
                    <div class="contenedor-botones">
                        <div class="boton-tarjeta" name="${counter}" id="favoritos-fav"><i class="fas fa-heart"></i></div>
                        <div class="boton-tarjeta" name="${counter}" id="descargar-fav"><i class="fas fa-download"></i></div>
                        <div class="boton-tarjeta" name="${counter}" id="expandir-fav"><i class="fas fa-expand-alt"></i></div>
                    </div>
                
                    <h4 class="info-tarjeta">${gifArray[counter].username}</h4>
                    <h3 class="info-tarjeta">${gifArray[counter].title}</h3>
                </div>
            </div>
            ` 
        }
        
    }

    const gifExpandir = document.querySelectorAll("#expandir-fav");

    for (let gif of gifExpandir){
        gif.addEventListener("click", (e) => {
            maximizarFav(gif.attributes.name.value, gifArray);
        })
    }
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
                        <div class="boton-tarjeta" name="${counter}" id="favoritos-trending"><i class="far fa-heart"></i></div>
                        <div class="boton-tarjeta" name="${counter}" id="descargar-trending"><i class="fas fa-download"></i></div>
                        <div class="boton-tarjeta" name="${counter}" id="expandir-trending"><i class="fas fa-expand-alt"></i></div>
                    </div>
                
                    <h4 class="info-tarjeta">${gifArray[counter].username}</h4>
                    <h3 class="info-tarjeta">${gifArray[counter].title}</h3>
                </div>
            </div>
            ` 
        }
    }

    const gifExpandir = document.querySelectorAll("#expandir-trending");

    for (let gif of gifExpandir){
        gif.addEventListener("click", (e) => {
            maximizar(gif.attributes.name.value, gifArray);
        })
    }

    const gifFavoritos = document.querySelectorAll("#favoritos-trending");

    for (let gif of gifFavoritos){
        gif.addEventListener("click", (e) => {
            favoritear(gif.attributes.name.value, gifArray);
        })
    }
}



export default {crearTrendingGif, maximizar, favoritear, crearFavoritosGif};
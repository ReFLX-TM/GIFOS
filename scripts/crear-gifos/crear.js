function conteo (){
    let s = 0;
    let m = 0;
    let h  = 0;
    let reloj = "";
    intervalo = setInterval(function () {
        s++
        let horas = "";
        let minutos = "";
        let segundos = "";
        
        if(s == 60) {
            s = 0
            m++
            grabando = false
        }

        if (m == 60) {
            m = 0
            h++
        }

        if (s < 10){
            segundos = `0${s}`;
        }
        else {
            segundos = `${s}`
        }

        if (m < 10){
            minutos = `0${m}`;
        }
        else {
            minutos = `${m}`
        }

        if (h < 10){
            horas = `0${h}`;
        }
        else {
            horas = `${h}`
        }

        reloj = `${horas}:${minutos}:${segundos}`;
        contador.innerHTML = `${reloj}`
    }, 1000)
}

function detener(){
    clearInterval(intervalo);
    contador.innerHTML = "00:00:00"
}

function getStreamAndRecord () { 
    comenzar.className = "inactivo";
    titulo.innerHTML = `¿Nos das acceso<br/>a tu cámara?`;
    info.innerHTML = `El acceso a tu camara será válido sólo<br/>por el tiempo en el que estés creando el GIFO.`;
    uno.className += " actual";
    navigator.mediaDevices.getUserMedia({audio: false, video: {height: 320, width: 480}})
    .then(function(stream) {
        video.srcObject = stream;
        video.play();    
        video.className = "";
        titulo.className = "inactivo";
        info.className = "inactivo";
        grabar.className = "control";
        let recorder = RecordRTC(stream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 480,
            hidden: 240,
            onGifRecordingStarted: function() {
             console.log('iniciado')
           },
        });

        grabar.addEventListener("click", (e) => {
            recorder.startRecording();
            grabar.className = "inactivo"
            contador.className = "contador"
            finalizar.className = "control"
            conteo();
        })

        finalizar.addEventListener("click", (e) => {
            recorder.stopRecording();
            console.log("finalizado");
            finalizar.className = "inactivo"
            contador.className = "inactivo"
            repetir.className = "repetir"
            subir.className = "control"
            detener();
        })

        repetir.addEventListener("click", (e) => {
            recorder.reset();
            repetir.className = "inactivo"
            subir.className = "inactivo"
            grabar.className = "control"
        })

        subir.addEventListener("click", async (e) => {
            subir.className = "inactivo"
            repetir.className = "inactivo"
            let form = new FormData();
            form.append('file', recorder.getBlob(), 'myGif.gif');
            const subirResponse = await fetch(`https://upload.giphy.com/v1/gifs?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK&file=${JSON.stringify(form.get('file'))}`, {method: 'POST'});
            const subirJson = await subirResponse.json();
            console.log(subirJson);
        })
    })
}


const comenzar = document.getElementById("comenzar");
const grabar = document.getElementById("grabar");
const contador = document.getElementById("contador");
const finalizar = document.getElementById("finalizar");
const repetir = document.getElementById("repetir");
const subir = document.getElementById("subir-gif");
const titulo = document.getElementById("titulo");
const info = document.getElementById("info");
const video = document.getElementById("reproductor");
const uno = document.getElementById("1");
const dos = document.getElementById("2");
const tres = document.getElementById("3");
let intervalo = "";

comenzar.addEventListener("click", (e) => {
    getStreamAndRecord();
})


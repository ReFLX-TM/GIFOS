function conteo (){
    let s = 0;
    let m = 0;
    let h  = 0;
    let reloj;
    intervalo = setInterval(() => {
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

function getMediaRecord() { 
    navigator.mediaDevices.getUserMedia({audio: false, video: {height: 320, width: 480}})
    .then((mediaStream) => {
        stream = mediaStream
        video.srcObject = mediaStream;
        video.play();    
        video.className = "";
        titulo.className = "inactivo";
        info.className = "inactivo";
        grabar.className = "control";
        recorder = RecordRTC(mediaStream, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 480,
            hidden: 240,
            onGifRecordingStarted: function() {
             console.log('iniciado')
           },
        });
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
let recorder;
let stream;
let intervalo;
let gifId;

comenzar.addEventListener("click", (e) => {
    comenzar.className = "inactivo";
    titulo.innerHTML = `¿Nos das acceso<br/>a tu cámara?`;
    info.innerHTML = `El acceso a tu camara será válido sólo<br/>por el tiempo en el que estés creando el GIFO.`;
    uno.className += " actual";
    getMediaRecord();
})

grabar.addEventListener("click", (e) => {
    recorder.startRecording();
    grabar.className = "inactivo"
    contador.className = "contador"
    finalizar.className = "control"
    uno.className = "paso";
    dos.className += " actual";
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
    tres.className = "paso";
    uno.className += " actual";
})

subir.addEventListener("click", async (e) => {
    subir.className = "inactivo"
    repetir.className = "inactivo"
    dos.className = "paso";
    tres.className += " actual";
    let form = new FormData();
    form.append('file', recorder.getBlob(), 'myGif.gif');
    console.log()
    const subirResponse = await fetch(`https://upload.giphy.com/v1/gifs?api_key=EhKz1YoCvGNKu8jysQQw0rBVAlYgagwK`, {method: 'POST', body: form});
    const subirJson = await subirResponse.json();
    gifId = subirJson.data.id;
    console.log(gifId)
})
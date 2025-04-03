let tiempoConduccion = 0; 
let tiempoDescanso = 0; 
let tiempoRestanteConduccion = 14400; 
let conduccionInterval, descansoInterval;
let conduccionEnCurso = false;
let descansoEnCurso = false;

function actualizarTiempo() {
    let horasConduccion = Math.floor(tiempoConduccion / 3600);
    let minutosConduccion = Math.floor((tiempoConduccion % 3600) / 60);
    let segundosConduccion = tiempoConduccion % 60;

    let horasRestantes = Math.floor(tiempoRestanteConduccion / 3600);
    let minutosRestantes = Math.floor((tiempoRestanteConduccion % 3600) / 60);
    let segundosRestantes = tiempoRestanteConduccion % 60;

    document.getElementById("tiempoConduccion").innerText = 
        `${String(horasConduccion).padStart(2, '0')}:${String(minutosConduccion).padStart(2, '0')}:${String(segundosConduccion).padStart(2, '0')}`;
    document.getElementById("tiempoRestante").innerText = 
        `${String(horasRestantes).padStart(2, '0')}:${String(minutosRestantes).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
}

function iniciarConduccion() {
    if (conduccionEnCurso) {
        clearInterval(conduccionInterval);
        document.getElementById("startStopBtnConduccion").innerText = "Iniciar";
    } else {
        conduccionInterval = setInterval(function() {
            tiempoConduccion++;
            tiempoRestanteConduccion--;
            actualizarTiempo();
            if (tiempoRestanteConduccion <= 0) {
                clearInterval(conduccionInterval);
            }
        }, 1000);
        document.getElementById("startStopBtnConduccion").innerText = "Pausar";
    }
    conduccionEnCurso = !conduccionEnCurso;
}

function pausarConduccion() {
    clearInterval(conduccionInterval);
    document.getElementById("startStopBtnConduccion").innerText = "Reanudar";
    conduccionEnCurso = false;
}

function resetConduccion() {
    clearInterval(conduccionInterval);
    tiempoConduccion = 0;
    tiempoRestanteConduccion = 14400;
    actualizarTiempo();
    document.getElementById("startStopBtnConduccion").innerText = "Iniciar";
    conduccionEnCurso = false;
}

function iniciarDescanso() {
    if (descansoEnCurso) {
        clearInterval(descansoInterval);
        document.getElementById("startStopBtnDescanso").innerText = "Iniciar";
    } else {
        descansoInterval = setInterval(function() {
            tiempoDescanso++;
            document.getElementById("tiempoDescanso").innerText = 
                `${String(Math.floor(tiempoDescanso / 3600)).padStart(2, '0')}:${String(Math.floor((tiempoDescanso % 3600) / 60)).padStart(2, '0')}:${String(tiempoDescanso % 60).padStart(2, '0')}`;
        }, 1000);
        document.getElementById("startStopBtnDescanso").innerText = "Pausar";
    }
    descansoEnCurso = !descansoEnCurso;
}

function pausarDescanso() {
    clearInterval(descansoInterval);
    document.getElementById("startStopBtnDescanso").innerText = "Reanudar";
    descansoEnCurso = false;
}

function resetDescanso() {
    clearInterval(descansoInterval);
    tiempoDescanso = 0;
    document.getElementById("tiempoDescanso").innerText = "00:00:00";
    document.getElementById("startStopBtnDescanso").innerText = "Iniciar";
    descansoEnCurso = false;
}

document.getElementById("startStopBtnConduccion").addEventListener("click", iniciarConduccion);
document.getElementById("pauseStopBtnConduccion").addEventListener("click", pausarConduccion);
document.getElementById("resetStopBtnConduccion").addEventListener("click", resetConduccion);

document.getElementById("startStopBtnDescanso").addEventListener("click", iniciarDescanso);
document.getElementById("pauseStopBtnDescanso").addEventListener("click", pausarDescanso);
document.getElementById("resetStopBtnDescanso").addEventListener("click", resetDescanso);

// Inicialización del mapa
let map = L.map('mapa').setView([51.505, -0.09], 13); 

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        map.setView([lat, lon], 13);
        L.marker([lat, lon]).addTo(map)
            .bindPopup("Estás aquí")
            .openPopup();
    });
}
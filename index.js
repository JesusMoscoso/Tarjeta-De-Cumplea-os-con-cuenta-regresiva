let intervalID; // variable global para controlar el temporizador

// Validar el nombre
function EsNombreValido() {
    let nombre = document.getElementById('txtNombre').value.trim();

    if (nombre === "" || !isNaN(nombre)) {
        alert("El nombre no puede estar vacío ni ser solo números.");
        return false;
    }
    return true;
}


function EsFechaValida() {
    let fecha = document.getElementById('txtFecha').value.trim();

    if (fecha === "") {
        alert("la fecha no puede estar vacía");
        return false;
    }
    return true;
}


// mostrar la cuenta regresiva
function MostrarTiempo() {

    let fechaIngresada = new Date(document.getElementById('txtFecha').value + "T00:00:00"); //esto es por que si no me resta un dia a la fecha
    let fechaActual = new Date();

    // si la fecha ingresada es menor a la fecha actual entonces hay que sumarle al año
    if (fechaIngresada < fechaActual) {
        fechaIngresada.setUTCFullYear(fechaActual.getUTCFullYear() + 1); // si la fecha es pasada, sumamos un año
    }

    const diferencia = fechaIngresada - fechaActual; // diferencia en milisegundos

    console.log(diferencia);

    // si la fecha ya ha llegado, detener el temporizador y mostrar el mensaje de cumpleaños
    if (diferencia <= 0) {
        clearInterval(intervalID); 
        let nombre = document.getElementById('txtNombre').value.trim();
        document.getElementById('resultado').textContent = `¡Feliz cumpleaños, ${nombre}!`;
        return;
    }

    // Convertir la diferencia en días, horas, minutos y segundos
    const diasRestantes = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horasRestantes = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutosRestantes = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundosRestantes = Math.floor((diferencia % (1000 * 60)) / 1000);

    // Mostrar el resultado
    document.getElementById('resultado').textContent =
        `Faltan ${diasRestantes} días, ${horasRestantes} horas, ${minutosRestantes} minutos y ${segundosRestantes} segundos.`;
}

// Iniciar el temporizador
function iniciarTemporizador(event) {

    event.preventDefault();

    // Validar el nombre 
    if (!EsNombreValido()) {

        return;
    }

    if(!EsFechaValida()){

        return;
    }
    clearInterval(intervalID);

    intervalID = setInterval(MostrarTiempo, 1000);

    MostrarTiempo();
}


//funcion para reiniciar 
function reiniciar(){
    document.getElementById('txtNombre').value = "";
    document.getElementById('txtFecha').value ="";
    clearInterval(intervalID);
    document.getElementById('resultado').textContent = "";
}



//boton de reiniciar.
const btnReiniciar = document.getElementById('btnReiniciar');
btnReiniciar.addEventListener('click', reiniciar);



// Asignar evento al botón
const btnEnviarRespuesta = document.getElementById('btnEnviar');
btnEnviarRespuesta.addEventListener('click', iniciarTemporizador);

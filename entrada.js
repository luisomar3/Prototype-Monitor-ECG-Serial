var socket = io.connect('http://192.168.1.108:3000', { 'forceNew': true });
var sinred = [96, 95, 91, 88, 90, 91, 88, 136, 87, 86, 87, 93, 91, 91, 95, 97, 99, 96, 92, 91, 90, 89, 88, 92, 91];
// SinRed es la grabacion con el AD8221 y guardada en un vector. Sin la red electrica causando interferencia.
i = 0;
//enviado;
menucont = 0;
socket.emit("ESP", "ESP");

function valorActual() {

    socket.emit('valorActual', sinred[i]);
    i++
    if (i == sinred.length) {
        i = 0;
    }
    // console.log(enviado);
};

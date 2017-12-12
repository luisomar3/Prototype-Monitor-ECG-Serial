var socket = io.connect('http://192.168.1.108:3000', { 'forceNew': true });
var Valorisimo = [];
contador = 0;
var sinred = [91, 90, 93, 92, 92, 91, 93, 90, 90, 93, 94, 91, 90, 91, 89, 92, 94, 96, 96, 95, 91, 88, 90, 91, 88, 136, 128, 87, 88, 87, 86, 87, 93, 91, 91, 95, 97, 99, 96, 92, 91, 90, 89, 88, 92, 91, 89, 94, 93, 86, 92, 93, 89, 90, 90, 89];

x = document.getElementById("myAudio");

function iniciarS() {
    max = 160;
    min = 60;
    for (a = 0; a <= 1; a++) {
        inicio();

    }
}


function Aumentar() {
    max = max + 20;
    min = min - 20;
    for (a = 0; a <= 1; a++) {
        inicio();

    }
}

function Disminuir() {

    max = max - 20;
    min = min + 20;
    for (a = 0; a <= 1; a++) {
        inicio();

    }
}

function mute() {

    x = document.getElementById("myAudio");


}

socket.on('valorGrafica', function(data) {

    Valorisimo = data;
    if (Valorisimo >= 100) {
        x.play();
        x.pause();
    }
    console.log(Valorisimo);

});

socket.on("toClient", function(a) {

    console.log(a);


});

socket.emit("fromClient", 'Hola Amor');


var random = new TimeSeries();
var temperatura;
var Temperatura = [91, 87, 88, 95, 87, 94, 96, 91, 98, 90, 93, 94, 83, 94, 88, 81, 93, 80, 83, 89, 77, 87, 90, 79, 89, 85, 84, 90, 81, 87, 86, 87, 110, 119, 150, 127, 95, 83, 64, 83, 87, 75, 89, 84, 81, 90, 80, 86, 89, 81, 87, 85, 87, 89, 80, 92, 90, 83, 96, 84, 89, 99, 83];
var conred = [90, 127, 145, 108, 78, 109, 143, 116, 72, 87, 127, 130, 85, 66, 97, 130, 119, 72, 67, 105, 126, 90, 60, 75, 116, 122, 79, 59, 88, 123, 114, 69, 64, 103, 129, 95, 64, 76, 116, 123, 79, 58, 85, 122, 114, 68, 61, 100, 127, 92, 60, 71, 114, 125, 83, 60, 87, 122, 113, 65, 56, 94, 122, 102, 56, 64, 104, 114, 72, 48, 74, 112, 108, 62, 52, 89, 118, 97, 61, 51, 89, 118];
var sinred = [91, 90, 93, 92, 92, 91, 93, 90, 90, 93, 94, 91, 90, 91, 89, 92, 94, 96, 96, 95, 91, 88, 90, 91, 88, 136, 87, 88, 87, 86, 87, 93, 91, 91, 95, 97, 99, 96, 92, 91, 90, 89, 88, 92, 91, 89, 94, 93, 86, 92, 93, 89, 90, 90, 89];
i = 0;
var contador = 0;
var vecFiltrado = [];

socket.on('Frecuencia', function(F) {
    frecuenciaCardiaca = F.toFixed(2);
    document.getElementById("frecuencia").innerHTML = frecuenciaCardiaca;
});
socket.on("hAlarma", function(b) {
    document.getElementById("alarma").innerHTML = b;
});

function inicio() {
    frecuenciaCardiaca = 0;
    var chart = new SmoothieChart({ grid: { strokeStyle: '#808080', sharpLines: true, millisPerLine: 2000, verticalSections: 3 }, maxValue: max, minValue: min });
    chart.addTimeSeries(random, {
        strokeStyle: '#00ff00',
        lineWidth: 3
    });
    setInterval(function() {

        random.append(new Date().getTime(), sinred[i])
        i++;
        if (sinred[i] >= 100) {
            fecha = new Date();
            if (contador == 0) {

                contador++;
                t1 = fecha.getTime();
            } else {

                t2 = fecha.getTime();
                Tms = t2 - t1;
                Ts = Tms * 0.001;
                F = 60 / Ts;
                document.getElementById("frecuencia").innerHTML = F;
                if (F >= 100) {
                    document.getElementById("alarma").innerHTML = "TAQUICARDIA";
                    x.play();

                } else if (F <= 60) {
                    document.getElementById("alarma").innerHTML = "BRADICARDIA";
                    x.play();

                } else if (F > 60 && F < 100) {
                    document.getElementById("alarma").innerHTML = "NORMAL";
                    x.pause();
                }

                contador = 0;
            }
        }
        if (i >= sinred.length) { i = 0; }
    }, 1);




    chart.streamTo(document.getElementById("chart"), 1);



}

//    <script src="http://smoothiecharts.org/smoothie.js"></script>

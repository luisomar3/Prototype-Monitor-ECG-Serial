var express = require("express");
var app = express();
var server = require('http').createServer(app);
var router = express.Router();
var io = require('socket.io')(server);
var serialport = require("serialport");

var SerialPort = serialport;

var sp = new SerialPort("COM13", {
    //configuración del puerto serial
    baudRate: 57600,
    databits: 8,
    parity: 'none',
    parser: SerialPort.parsers.readline('\n')
});

var camino = app.use(express.static(__dirname + '/public')); // Servir archivos estaticos con xpress
users = [];
var variable1;
contador = 0;



io.on('connection', function(socket) {           //Verificar conexion de cliente
    console.log('Cliente Conectado');

    socket.on('disconnect', function() {
        console.log('Cliente Desconectado');
    });



    sp.open(function() {
        console.log("puerto abierto")                    //Abrir el puerto Serial
        sp.on("data", function(data) {

            console.log(data);
            io.sockets.emit("valorGrafica", data);   // Emitir por el socket la data del SP
        });
    });

    socket.emit('toClient', 'Gracias a mi esposa bella');
    socket.on("ESP", function() {

        console.log("ESP se ha conectado");
    });

    socket.on('fromClient', function(a) {

        console.log(a);
        socket.emit('holaAmor', a);

    });

    socket.on('valorActual', function(b) {
        io.sockets.emit('valorGrafica', b);

        if (b >= 100) {               // Las alarmas están hechas basadas en el tiempo entre picos, si se reconoce
            fecha = new Date();      // el pico se cuenta cuanto tiempo pasó hasta que se produce otro y así contabilizarlo
            if (contador == 0) {    // con la funcion getTime

                contador++;
                t1 = fecha.getTime();
            } else {

                t2 = fecha.getTime();
                Tms = t2 - t1;
                Ts = Tms * 0.001;
                F = 60 / Ts;
                io.sockets.emit('Frecuencia', F)
                if (F >= 100) {
                    io.sockets.emit("hAlarma", "TAQUICARDIA");
                } else if (F <= 60) {
                    io.sockets.emit("hAlarma", "BRADICARDIA");
                } else if (F > 60 && F < 100) {
                    io.sockets.emit("hAlarma", "Normal")
                }

                contador = 0;
            }
        }

        console.log(b + "REf");

    });


});





server.listen(3000, function(socket) {
    console.log('Servidor web iniciado')


});

//configuracion para trabajar con sockets
var express = require('express'); //modulo para manejar http
var app = express();
var server = require('http').Server(app); 
//var io = require('socket.io')(server);


var io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });
  

//midleware de express para cargar vista estatica
app.use(express.static('client')); //aqui van todos los htmls



app.get('/hola-mundo', function(req,res){
    res.status(200).send("Hola mundo desde una ruta");    
});

//mensajes que manda por defecto el bot
var messages = [
    {
        id: 1,
        text: 'Bienvenido al chat privado de Socket.io y NodeJS de Darnell...',
        nickname: 'Bot- darnellarmas.com'
    }
];


//evento para detectar cuando un cliente se conecte
io.on('connection', function(socket){
    //recoger ip de la persona que se conecta
    console.log("El nodo con IP: " + socket.handshake.address + " se ha conectado...");

    //cuando se conecte el cliente le emito el mensaje
    socket.emit('messages', messages);

    //cuando reciba mensaje
    socket.on('add-message', function(data){
            messages.push(data);
            //emitir los mensajes a todos los clientes
            io.sockets.emit('messages', messages);
    });
});

//crear el servidor http
server.listen(6677, function(){
    console.log('Servidor está funcionando al puritito vergazo en http://localhost:6677');
});


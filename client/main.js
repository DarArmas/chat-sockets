//aqui se van a configurar los sockets
var socket = io.connect('http://192.168.100.19:6677', {'forceNew': true});

//el cliente recoge los datos
socket.on('messages', function(data){
    console.log(data);
    render(data);
});

function render(data){
    var html = data.map(function(message, index){
        return (
            `
                <div class="message">
                    <strong>${message.nickname}</strong> dice:
                    <p>${message.text}</p>
                </div>
            
            `
            );
    }).join(' ');

        var div_msgs = document.getElementById('messages');
        div_msgs.innerHTML = html;
        div_msgs.scrollTop = div_msgs.scrollHeight;

}

//recibir evento desde el form
function addMessage(e) {
    var message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value
    };

    //document.getElementById('nickname'),style.display = 'none';
    socket.emit('add-message', message); //para que guarde la var message en el servidor

    return false; //para que pare la ejecucion de la funcion solamente
}
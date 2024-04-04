
//variables de 'joueurs' qui vont contenir sockets objects de chaque connection
let j1, j2, j3, j4;

// Use nodejs 'Net' module
const net = require('node:net');

//array to contain the socket obejct of each connection
//INDEXES ALSO AVAILABLE AS j1 TO j4
const clients = [];

// Creation of the server
const server = net.createServer(socket => {

    //on connection, store each socket in 'clients' array
    clients.push(socket);
    
    //Print data received from client
    socket.on('data', data => {
        console.log(' client(' + socket.clientIp + '): ' + data.toString().trim());

        //send back "recu" for test purposes ***(uncomment)***
        //socket.write('message: ' + data.toString().trim() + 'recu');
    })

    //Show that a client has disconnected(+ his ip)
    socket.on('end', () => {
        console.log('CLIENT DISCONNECTED ('+ socket.clientIp + ')');
    })

    //error logging
    socket.on('error', () => {
        console.log('AN ERROR MADE THE SERVER SHUT DOWN!');
        socket.write('AN ERROR MADE THE SERVER SHUT DOWN!');
    })
})

server.on('connection', socket => {

    // Store the client's IP address within the socket object
    socket.clientIp = socket.remoteAddress;

    //Send hello back to client on socket
    socket.write('\nWelcome to TCP Server!\n');

    //Show that a client has connected(+ his ip)
    console.log('CLIENT CONNECTED (' + socket.clientIp + ')');

    
});


//bind server to all available IP addresses on the server's network interfaces
// and listen on port 1647
const HOST = '0.0.0.0';
const PORT = 1647;
server.listen(PORT, HOST, () => {
    console.log(`${HOST} : ${PORT}`);
})

//associe variables joueurs au array de sockets
j1 = clients[0];
j2 = clients[1];
j3 = clients[2];
j4 = clients[3];

// Function to send a message to a specific client
//Use array index of the client you want to talk to in 'clients' array (use j1-4 variables ex: sendToClient(j1, 'alloTest'))
function sendToClient(clientSocket, message) {
    clientSocket.write(message);
}





//mettre dans connection event pour dire a tt monde quand nouvelle connection

// for(let k = 0 ; k < clients.length ; k++){
//     clients[k].write('CLIENT CONNECTED (' + socket.clientIp + ')');
//     clients[k].write('\n');
// }
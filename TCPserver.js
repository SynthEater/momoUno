
// Use nodejs 'Net' module
const net = require('node:net');

// Creation of the server
const server = net.createServer(socket => {


    //Show that a client has connected(+ his ip)
    console.log('CLIENT('+ socket.remoteAddress + ') CONNECTED');

    //Send hello back to client on socket
    socket.write('\nWelcome to TCP Server!\n');

    //Create a 'prompt' for client
    socket.write('$:');


    //Print data received from client
    socket.on('data', data => {
        console.log(' client(' + socket.remoteAddress + '): ' + data.toString());
    })

    //Show that a client has disconnected(+ his ip)
    socket.on('end', () => {
        console.log('CLIENT('+ socket.remoteAddress + ') DISCONNECTED');
    })
})


//accept all ip addresses on port 1647
const HOST = '0.0.0.0';
const PORT = 1647;
server.listen(PORT, HOST, () => {
    console.log(`${HOST} : ${PORT}`);
})


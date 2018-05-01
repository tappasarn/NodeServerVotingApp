import Server from 'socket.io';

export default function startServer(store) {
    // This creates a Socket.io server, as well as a regular HTTP server bound to port 8090
    const io = new Server().attach(8090);

    store.subscribe(
        // let socket know about state change in the store
        // we are currently sending full state to socket connectiion
        // it may cause a lot of data transfer
        // but it is good enough for this example
        () => io.emit('state', store.getState().toJS())
    );

    // each time there is a connection from client
    // send them the current state
    // so they will be in sync with the server
    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS());
    });
}
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

    // there is a connection from client
    io.on('connection', (socket) => {
        // send them the current state
        // so they will be in sync with the server
        socket.emit('state', store.getState().toJS());

        // get action from the client
        socket.on('action', store.dispatch.bind(store));
    });
}
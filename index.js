import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();

// also start the server once the app is start
startServer(store);
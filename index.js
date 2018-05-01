import makeStore from './src/store';
import startServer from './src/server';

export const store = makeStore();

// also start the server once the app is start
startServer(store);

// kick off the vote once we start the server
store.dispatch({
    type: 'SET_ENTRIES',
    entries: require('./entries.json')
});
store.dispatch({ type: 'NEXT' });

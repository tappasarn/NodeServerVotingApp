import { setEntries, next, vote, INITIAL_STATE } from './core';

// Reducer's job is to find out which core function to call 
// function will be called acording to action type
// it also need to be able to unpack aditional arg and pass it to core function as well
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);
        case 'NEXT':
            return next(state);
        case 'VOTE':
            return vote(state, action.entry)
    }
    // incase that reducer cant match any action 
    // return state w/o doing anything
    return state;
}
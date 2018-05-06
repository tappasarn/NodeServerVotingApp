import { setEntries, next, vote, INITIAL_STATE } from './core';

// Reducer's job is to find out which core function to call 
// function will be called acording to action type
// it also need to be able to unpack aditional arg and pass it to core function as well
// Every reducer is fired at least once when the store is initialized with action { type: "@@redux/INIT"}
// at that time state is undefined so we need default value for the first round
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_ENTRIES':
            return setEntries(state, action.entries);
        case 'NEXT':
            return next(state);
        case 'VOTE':
            // since vote function only take 'vote' part of the state
            // it is the job of the reducer to unpack the correct part
            // and pass it as an argument to the core function
            return state.update('vote',
            voteState => vote(voteState, action.entry));
    }
    // incase that reducer cant match any action 
    // return state w/o doing anything
    return state;
}
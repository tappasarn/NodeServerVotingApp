import {List} from 'immutable';

export function setEntries(state, entries) {
    // as a param entries can be any thing iterable
    // but once it gets added into state we need to make sure that it is immutable
    return state.set('entries', List(entries));
}
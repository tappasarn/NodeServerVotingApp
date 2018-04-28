import { List, Map } from 'immutable';

export function setEntries(state, entries) {
    // as a param entries can be any thing iterable
    // but once it gets added into state we need to make sure that it is immutable
    return state.set('entries', List(entries));
}

export function next(state) {
    const entries = state.get('entries');
    // put new object in to existing state
    return state.merge({
        vote: Map({ pair: entries.take(2) }),
        entries: entries.skip(2)
    });
}

export function vote(state, entry) {
    // update object by the following path (vote.tally.entryVariable)
    // if path is missing create a new Map()
    // if entryVariable does not yet have value init it with 0
    return state.updateIn(
        ['vote', 'tally', entry],
        0,
        tally => tally + 1
    );
}
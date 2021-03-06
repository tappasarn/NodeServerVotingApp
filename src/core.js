import { List, Map } from 'immutable';

// constant
export const INITIAL_STATE = Map();
// end constant

// public methods
export function setEntries(state, entries) {
    // as a param entries can be any thing iterable
    // but once it gets added into state we need to make sure that it is immutable
    return state.set('entries', List(entries));
}

export function next(state) {
    // if there is/are winner concat them to the entries list before starting next round
    const entries = state.get('entries')
        .concat(getWinners(state.get('vote')));
    if (entries.size === 1) {
        // we got winner
        // vote and entries can be remove out of state
        return state.remove('vote')
            .remove('entries')
            .set('winner', entries.first());
    } else {
        // start the next round
        return state.merge({
            vote: Map({ pair: entries.take(2) }),
            entries: entries.skip(2)
        });
    }
}

export function vote(voteState, entry) {
    // update object by the following path (tally.entryVariable)
    // if path is missing create a new Map()
    // if entryVariable does not yet have value init it with 0
    return voteState.updateIn(
        ['tally', entry],
        0,
        tally => tally + 1
    );
}
// end public methods

// private methods
function getWinners(vote) {
    if (!vote) return [];
    // destructuring values in pair
    const [a, b] = vote.get('pair');

    // get their scores
    const aVotes = vote.getIn(['tally', a], 0);
    const bVotes = vote.getIn(['tally', b], 0);

    // find winner
    if (aVotes > bVotes) return [a];
    else if (aVotes < bVotes) return [b];
    else return [a, b];
}
// end private methods
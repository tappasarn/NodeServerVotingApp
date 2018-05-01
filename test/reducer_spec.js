import { Map, fromJS } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {
    // Note : fromJs deeply convert js's {} and [] into immutable's Map and List
    it('handles SET_ENTRIES', () => {
        const initialState = Map();
        const action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            entries: ['Trainspotting']
        }));
    });

    it('handles NEXT', () => {
        const initialState = fromJS({
            entries: ['Trainspotting', '28 Days Later']
        });
        const action = { type: 'NEXT' };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        }));
    });

    it('handles VOTE', () => {
        const initialState = fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        });
        const action = { type: 'VOTE', entry: 'Trainspotting' };
        const nextState = reducer(initialState, action);

        expect(nextState).to.equal(fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later'],
                tally: { Trainspotting: 1 }
            },
            entries: []
        }));
    });
    it('has an initial state', () => {
        // negative test
        // state should at least be a defaul map
        const action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] };
        const nextState = reducer(undefined, action);
        expect(nextState).to.equal(fromJS({
            entries: ['Trainspotting']
        }));
    });
    it('can handle unknown action', () => {
        // negative test
        const initialState = fromJS({
            vote: {
                pair: ['Trainspotting', '28 Days Later']
            },
            entries: []
        });
        const action = { type: 'UNKNOWN', entries: ['Trainspotting'] };
        const nextState = reducer(initialState, action);
        expect(nextState).to.equal(
            fromJS({
                vote: {
                    pair: ['Trainspotting', '28 Days Later']
                },
                entries: []
            })
        );
    });
});
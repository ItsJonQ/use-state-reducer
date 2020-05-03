import { useRef, useReducer } from 'react';
import { combineStateReducers } from './combineStateReducers';

export function useStateReducer(
	initialReducer,
	initialState,
	stateReducers,
	init,
) {
	const combinedReducers = combineStateReducers(stateReducers);

	const reducer = useRef((state, action) => {
		return combinedReducers(initialReducer({ ...state }, action), action);
	}).current;

	return useReducer(reducer, initialState, init);
}

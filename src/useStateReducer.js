import { useRef, useReducer } from 'react';
import { combineStateReducers } from './combineStateReducers';

const defaultStateReducer = state => state;

export function useStateReducer(
	initialReducer,
	initialState,
	stateReducers = [defaultStateReducer],
) {
	const combinedReducers = combineStateReducers([stateReducers]);

	const reducer = useRef((state, action) => {
		let nextState = { ...state };
		nextState = initialReducer(nextState, action);
		nextState = combinedReducers(nextState, action);

		return nextState;
	}).current;

	return useReducer(reducer, initialState);
}

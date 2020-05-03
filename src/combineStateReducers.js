export function combineStateReducers(...fns) {
	const reducers = fns.flat(Infinity);

	return (...args) => {
		return reducers.reduceRight((state, fn) => {
			const nextState = typeof fn === 'function' ? fn(...args) : args[0];

			return { ...state, ...nextState };
		}, {});
	};
}

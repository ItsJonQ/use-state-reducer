import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { useStateReducer } from '../useStateReducer';

describe('useStateReducer', () => {
	const initialState = { count: 0 };
	const reducer = (state, action) => {
		if (action.type === 'up') {
			state.count = state.count + 1;
		}
		if (action.type === 'down') {
			state.count = state.count - 1;
		}
		return state;
	};

	const Example = ({ extraReducers }) => {
		const [state, dispatch] = useStateReducer(
			reducer,
			initialState,
			extraReducers,
		);

		return (
			<>
				<button onClick={() => dispatch({ type: 'up' })}>Up</button>
				<button onClick={() => dispatch({ type: 'down' })}>Down</button>
				<div>{state.count}</div>
			</>
		);
	};

	test('should modify state with dispatch with a single reducer', () => {
		const { container, getByText } = render(<Example />);
		const el = container.querySelector('div');

		expect(el).toHaveTextContent('0');

		fireEvent.click(getByText(/up/i));

		expect(el).toHaveTextContent('1');

		fireEvent.click(getByText(/up/i));

		expect(el).toHaveTextContent('2');

		fireEvent.click(getByText(/down/i));

		expect(el).toHaveTextContent('1');

		fireEvent.click(getByText(/down/i));

		expect(el).toHaveTextContent('0');

		fireEvent.click(getByText(/down/i));

		expect(el).toHaveTextContent('-1');
	});

	test('should modify state with dispatch with a external reducer', () => {
		const { container, getByText } = render(
			<Example extraReducers={[reducer]} />,
		);
		const el = container.querySelector('div');

		expect(el).toHaveTextContent('0');

		fireEvent.click(getByText(/up/i));

		expect(el).toHaveTextContent('2');

		fireEvent.click(getByText(/up/i));

		expect(el).toHaveTextContent('4');

		fireEvent.click(getByText(/up/i));

		expect(el).toHaveTextContent('6');

		fireEvent.click(getByText(/down/i));

		expect(el).toHaveTextContent('4');

		fireEvent.click(getByText(/down/i));

		expect(el).toHaveTextContent('2');

		fireEvent.click(getByText(/down/i));

		expect(el).toHaveTextContent('0');
	});

	test('should modify state with dispatch with several external reducer', () => {
		const { container, getByText } = render(
			<Example extraReducers={[reducer, reducer, reducer, reducer]} />,
		);
		const el = container.querySelector('div');

		expect(el).toHaveTextContent('0');

		fireEvent.click(getByText(/up/i));

		expect(el).toHaveTextContent('5');

		fireEvent.click(getByText(/up/i));

		expect(el).toHaveTextContent('10');

		fireEvent.click(getByText(/up/i));

		expect(el).toHaveTextContent('15');

		fireEvent.click(getByText(/down/i));

		expect(el).toHaveTextContent('10');

		fireEvent.click(getByText(/down/i));

		expect(el).toHaveTextContent('5');

		fireEvent.click(getByText(/down/i));

		expect(el).toHaveTextContent('0');
	});
});

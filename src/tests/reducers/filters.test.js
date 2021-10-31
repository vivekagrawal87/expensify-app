import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT'});
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT' });
    expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
    const currentSate = {
        text: '',
        startDate: undefined,
        endDate: undefined,
        sortBy: 'amount'
    };

    const action = {
        type: 'SORT_BY_DATE'
    };

    const state = filtersReducer(currentSate, action);
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const state = filtersReducer(undefined, {
        type: 'SET_TEXT_FILTER',
        text: 'hello'
    });

    expect(state.text).toBe('hello');
});

test('should set start date', () => {
    const startDate = moment();
    const action = {
        type: 'SET_START_DATE',
        date: startDate
    };
    const state = filtersReducer(undefined, action);

    expect(state.startDate).toEqual(startDate);
});

test('should set end date', () => {
    const endDate = moment();
    const action = {
        type: 'SET_END_DATE',
        date: endDate
    };
    const state = filtersReducer(undefined, action);

    expect(state.endDate).toEqual(endDate);
});
import expenseReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should setup default expense values', () => {
    const state = expenseReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };

    const state = expenseReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id is not found', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: -1
    };

    const state = expenseReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should edit expense if id is found', () => {
    const amount = 45000;
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates: {
            amount
        }
    };

    const state = expenseReducer(expenses, action);
    expect(state[1].amount).toBe(amount);
});

test('should not edit expense if id is not found', () => {
    const amount = 45000;
    const action = {
        type: 'EDIT_EXPENSE',
        id: -1,
        updates: {
            amount
        }
    };

    const state = expenseReducer(expenses, action);
    expect(state[1].amount).toBe(expenses[1].amount);
});

test('should add new expense', () => {
    const newExpense = {
        id: '4',
        description: 'Internet',
        note: '',
        amount: 100000,
        createdAt: 0
    }

    const action = { 
        type: 'ADD_EXPENSE',
        expense: newExpense
    };
    const state = expenseReducer(expenses, action);
    expect(state).toEqual([...expenses, newExpense]);
});

test ('should set expenses', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[1]]
    }
    const state = expenseReducer(expenses, action);
    expect(state).toEqual([expenses[1]]);
});
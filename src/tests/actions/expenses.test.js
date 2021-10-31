import { addExpense, removeExpense, editExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' });
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should setup edit expense action object', () => {
    const action = editExpense('123xyz', {note: 'Rent'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123xyz',
        updates: { note: 'Rent' }
    });
});

test('should setup add expense action object with input', () => {
    const expenseData = {
        id: '123',
        description: 'Rent',
        note: 'October',
        amount: 100000,
        createdAt: 1000
    };

    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('should setup add expense action object with default', () => {
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            description: '',
            note: '',
            amount: 0,
            createdAt: 0
        }
    });
});
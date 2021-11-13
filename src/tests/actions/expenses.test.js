import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, removeExpense, editExpense, startAddExpense } from '../../actions/expenses';
import db from '../../firebase/firebase';
import { ref, onValue } from 'firebase/database';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);

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
    const action = addExpense(expenses[0]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[0]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({});//initilize mock store with empty state
    const expenseData = {
        description: 'Keypad',
        amount: 15000,
        note: 'New keypad',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() =>{
        const actions = store.getActions();
        const expectedPayload = {
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData,
            }
        }
        expect(actions[0]).toEqual(expectedPayload);
        onValue(ref(db, `expenses/${actions[0].expense.id}`), (snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        }, {
            onlyOnce: true
        });
        
    });

});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({});//initilize mock store with empty state
    const expenseData = {
        description: '',
        amount: 0,
        note: '',
        createdAt: 0
    };

    store.dispatch(startAddExpense(expenseData)).then(() =>{
        const actions = store.getActions();
        const expectedPayload = {
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        }
        expect(actions[0]).toEqual(expectedPayload);

        onValue(ref(db, `expenses/${actions[0].expense.id}`), (snapshot) => {
            expect(snapshot.val()).toEqual(expenseData);
            done();
        }, {
            onlyOnce: true
        });
        
    });
});
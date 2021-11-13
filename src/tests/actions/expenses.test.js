import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { addExpense, 
    removeExpense, 
    editExpense, 
    startAddExpense, 
    setExpenses, 
    startSetExpenses, 
    startRemoveExpense,
    startEditExpense } from '../../actions/expenses';
import db from '../../firebase/firebase';
import { ref, get, set } from 'firebase/database';
import expenses from '../fixtures/expenses';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expenseData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expenseData[id] = { description, note, amount, createdAt };
    });
    set(ref(db, 'expenses'), expenseData).then(() => done());
});

test('should setup remove expense action object', () => {
    const id = '123abc';
    const action = removeExpense(id);
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should remove expense from database and store', (done) => {
    const store = createMockStore({});
    const id = expenses[1].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });

        return get(ref(db, `expenses/${id}`));
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    }).catch((e) => console.log('Error: ' + e));
});

test('should setup edit expense action object', () => {
    const action = editExpense('123xyz', {note: 'Rent'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123xyz',
        updates: { note: 'Rent' }
    });
});

test('should edit expense in database and store', (done) => {
    const store = createMockStore({});
    const id = expenses[0].id;
    const updates = { note: 'Indore Home Rent'};
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        });
        return get(ref(db, `expenses/${id}`));
    }).then((snapshot) => {
        expect(snapshot.val().note).toEqual(updates.note);
        done();
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
        return get(ref(db, `expenses/${actions[0].expense.id}`));
        
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
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

        return get(ref(db, `expenses/${actions[0].expense.id}`));
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    });
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore({});
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done();
    });
});
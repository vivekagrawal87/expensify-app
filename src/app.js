import React from 'react';
import ReactDOM from 'react-dom';
import { addExpense } from './actions/expenses';
import AppRouter from './routes/AppRouter';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses'
import { setTextFilter } from './actions/filters';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';


const store = configureStore();

store.dispatch(addExpense({ description : 'Water Bill', amount : 5000 }));
store.dispatch(addExpense({ description : 'Gas Bill', amount : 2500, createdAt : 1000 }));
store.dispatch(addExpense({ description : 'Rent', amount : 120000 }));

const state = store.getState()
console.log(getVisibleExpenses(state.expenses, state.filters));

const jsx = (
    <div>
        <Provider store={store} >
            <AppRouter />
        </Provider>
    </div>
);

ReactDOM.render(jsx, document.getElementById('app'));
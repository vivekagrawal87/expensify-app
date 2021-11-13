import React from 'react';
import ReactDOM from 'react-dom';
import { startSetExpenses } from './actions/expenses';
import AppRouter from './routes/AppRouter';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses'
import { setTextFilter } from './actions/filters';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';
import './firebase/firebase';

const store = configureStore();

const jsx = (
    <div>
        <Provider store={store} >
            <AppRouter />
        </Provider>
    </div>
);

ReactDOM.render(<p>Loading...</p>, document.getElementById('app'));

store.dispatch(startSetExpenses()).then(() => {
    ReactDOM.render(jsx, document.getElementById('app'));
});
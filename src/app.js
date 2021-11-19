import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { getAuth } from 'firebase/auth';

import { login, logout } from './actions/auth';
import { startSetExpenses } from './actions/expenses';
import AppRouter, { history } from './routes/AppRouter';
import configureStore from './store/configureStore';
import getVisibleExpenses from './selectors/expenses';
import LoadingPage from './components/LoadingPage';
import { setTextFilter } from './actions/filters';
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

let hasRendered = false;

const renderApp = () => {
    if(!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('app'));
        hasRendered = true;
    }
};

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

getAuth().onAuthStateChanged((user) => {
    if(user) {
        store.dispatch(login(user.uid));
        store.dispatch(startSetExpenses()).then(() => {
            renderApp();
            if(history.location.pathname === '/') {
                history.push('/dashboard');
            }
        });
    } else {
        store.dispatch(logout())
        renderApp();
        history.push('/');
    }
});
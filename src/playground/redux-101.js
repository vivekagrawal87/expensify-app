import { createStore } from "redux";

const increatmentCount = ({increamentBy = 1} = {}) => ({
    type: 'INCREAMENT',
    increamentBy
});

const decreamentCount = ({ decreamentBy = 1 } = {}) => ({
    type: 'DECREAMENT',
    decreamentBy
});

const resetCount = () => ({
    type: 'RESET'
});

const setCount = ({ count }) => ({
    type: 'SET',
    count
});

const countReducer = (state = { count : 0 }, action) => {
    switch(action.type) {
        case 'INCREAMENT':
            return {
                count: state.count + action.increamentBy
            };
        case 'DECREAMENT':
            return {
                count: state.count - action.decreamentBy
            };
        case 'RESET':
            return {
                count: 0
            };
        case 'SET':
            return {
                count: action.count
            }
        default:
            return state;

    }
};

const store = createStore(countReducer);

store.subscribe(() => {
    console.log(store.getState()); 
});

store.dispatch(increatmentCount({
    increamentBy: 5
}));

store.dispatch(increatmentCount());

store.dispatch(resetCount());

store.dispatch(decreamentCount({ decreamentBy: 10 }));

store.dispatch(setCount({ count : 101 }));
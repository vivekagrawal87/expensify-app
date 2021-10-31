import 
{   sortByDate, 
    sortByAmount, 
    setStartDate, 
    setEndDate, 
    setTextFilter 
} from '../../actions/filters';

import moment from 'moment';

test('should setup sortbydate action object', () => {
    const action = sortByDate();
    expect(action).toEqual({
        type: 'SORT_BY_DATE'
    });
});

test('should setup sortbyamount action object', () => {
    const action = sortByAmount();
    expect(action).toEqual({
        type: 'SORT_BY_AMOUNT'
    });
});

test('should setup setstartdate action object', () => {
    const action = setStartDate(moment(0));
    expect(action).toEqual({
        type: 'SET_START_DATE',
        date: moment(0)
    });
});

test('should setup setenddate action object', () => {
    const action = setEndDate(moment(0));
    expect(action).toEqual({
        type: 'SET_END_DATE',
        date: moment(0)
    });
});

test('should setup settextfilter action object with text', () => {
    const action = setTextFilter('hello');
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: 'hello'
    });
});

test('should setup settextfilter action object with default', () => {
    const action = setTextFilter();
    expect(action).toEqual({
        type: 'SET_TEXT_FILTER',
        text: ''
    });
});
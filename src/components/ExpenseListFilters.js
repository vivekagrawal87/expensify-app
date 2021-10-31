import React from 'react';
import { DateRangePicker } from 'react-dates';
import { connect } from 'react-redux';
import { setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate } from '../actions/filters';

export class ExpenseListFilters extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        calendarFocused: null
    };
    onDatesChange = ({ startDate, endDate }) => {
        this.props.setStartDate(startDate);
        this.props.setEndDate(endDate);
    };
    onFocusChange = (calendarFocused) => {
        this.setState(() => ({ calendarFocused }));
    };
    render() {
        return (
            <div>
        <input 
            type="text" 
            value={this.props.filters.text} 
            onChange={(e) => {
                this.props.setTextFilter(e.target.value);
            }} 
        />
        <select 
            value={this.props.filters.sortBy}
            onChange={(e) => {
                if(e.target.value === 'date') {
                    this.props.sortByDate();
                } else if (e.target.value === 'amount') {
                    this.props.sortByAmount();
                }
            }}
        >
            <option value='date' >Date</option>
            <option value='amount'>Amount</option>
        </select>
        <DateRangePicker
            startDate={this.props.filters.startDate}
            endDate={this.props.filters.endDate}
            onDatesChange={this.onDatesChange}
            focusedInput={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            showClearDates={true}
            numberOfMonths={1}
            isOutsideRange={() => false}
         />
    </div>
        );
    };
}

const mapStateToProps = (state) => ({
    filters: state.filters
});

const mapDispatchToProps = (dispatch) => ({
    setTextFilter: (text) => dispatch(setTextFilter(text)),
    setStartDate: (startDate) => dispatch(setStartDate(startDate)),
    setEndDate: (endDate) => dispatch(setEndDate(endDate)),
    sortByDate: () => dispatch(sortByDate()),
    sortByAmount: () => dispatch(sortByAmount())
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseListFilters);
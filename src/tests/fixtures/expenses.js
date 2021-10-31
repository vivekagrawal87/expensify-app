import moment from 'moment';

export default [{
    id: '1',
    description: 'Rent',
    note: '',
    amount: 300000,
    createdAt: 0
}, 
{
    id: '2',
    description: 'Water',
    note: '',
    amount: 40000,
    createdAt: moment(0).add(4, 'days').valueOf()
},
{
    id: '3',
    description: 'Gas',
    note: '',
    amount: 80000,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}];
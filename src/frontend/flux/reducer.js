import { combineReducers } from 'redux';
import department from '../modules/department/reducers/department';
import employee from '../modules/employee/reducers/employee';

export default combineReducers({
    department,
    employee
});
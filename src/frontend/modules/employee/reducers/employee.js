import { GET_EMPLOYEE_REQUEST, GET_EMPLOYEE_SUCCESS, GET_EMPLOYEE_ERROR, DISMISS_EMPLOYEE_ERROR } from '../constants';

const initialState = {
    data: [],
    errors: null,
    fetching: false
}

export default function employee(state = initialState, action) {
    switch (action.type) {
        case GET_EMPLOYEE_REQUEST:
            return { ...state, fetching: true }
        case GET_EMPLOYEE_SUCCESS:
            return { ...state, data: action.employees, fetching: false, errors: null }
        case GET_EMPLOYEE_ERROR:
            return { ...state, errors: action.message, fetching: false }
        case DISMISS_EMPLOYEE_ERROR:
            return { ...state, errors: null }
        default:
            return state;
    }
}

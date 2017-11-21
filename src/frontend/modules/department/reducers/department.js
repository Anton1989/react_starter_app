import { GET_DEPARTMENTS_REQUEST, GET_DEPARTMENTS_SUCCESS, GET_DEPARTMENTS_ERROR, DISMISS_DEPARTMENTS_ERROR } from '../constants';

const initialState = {
    data: [],
    errors: null,
    fetching: false
}

export default function department(state = initialState, action) {
    switch (action.type) {
        case GET_DEPARTMENTS_REQUEST:
            return { ...state, fetching: true }
        case GET_DEPARTMENTS_SUCCESS:
            return { ...state, data: action.departments, fetching: false, errors: null }
        case GET_DEPARTMENTS_ERROR:
            return { ...state, errors: action.message, fetching: false }
        case DISMISS_DEPARTMENTS_ERROR:
            return { ...state, errors: null }
        default:
            return state;
    }
}

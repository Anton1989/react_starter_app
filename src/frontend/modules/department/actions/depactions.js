import { GET_DEPARTMENTS_REQUEST, GET_DEPARTMENTS_SUCCESS, DISMISS_DEPARTMENTS_ERROR } from '../constants';

const receiveSuccess = departments => ({ type: GET_DEPARTMENTS_SUCCESS, departments })

export function getDepartments() {
	return (dispatch) => {
		dispatch({
			type: GET_DEPARTMENTS_REQUEST
		});
	}
}
export function save(department) {
	return (dispatch, getState) => {
		const state = getState();
		dispatch(receiveSuccess( state.department.data.map(item => department.id == item.id ? department : item) ));
	}
}
export function dismissError() {
	return (dispatch) => {
		return dispatch({
			type: DISMISS_DEPARTMENTS_ERROR
		})
	}
}

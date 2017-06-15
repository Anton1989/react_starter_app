import { GET_EMPLOYEE_REQUEST, GET_EMPLOYEE_SUCCESS, DISMISS_EMPLOYEE_ERROR } from '../constants';
import fetch from 'isomorphic-fetch';
import config from '../../../config';
import { call } from 'redux-saga/effects';

const receiveSuccess = employees => ({ type: GET_EMPLOYEE_SUCCESS, employees })

export function getEmployees() {
	return (dispatch) => {
		dispatch({
			type: GET_EMPLOYEE_REQUEST
		});
	}
}
export function save(employee) {
	return (dispatch, getState) => {
		const state = getState();
		dispatch(receiveSuccess( state.employee.data.map(item => employee.id == item.id ? employee : item) ));
	}
}
export function dismissError() {
	return (dispatch) => {
		return dispatch({
			type: DISMISS_EMPLOYEE_ERROR
		})
	}
}

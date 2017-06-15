import { GET_EMPLOYEE_REQUEST, GET_EMPLOYEE_SUCCESS, GET_EMPLOYEE_ERROR } from '../constants';
import fetch from 'isomorphic-fetch';
import config from '../../../config';
import { call, put, takeEvery } from 'redux-saga/effects'

function* fetchEmployees(action) {
	try {
		const employees = yield call(getEmployees);
		yield put({type: GET_EMPLOYEE_SUCCESS, employees: employees.data});
	} catch (e) {
		yield put({type: GET_EMPLOYEE_ERROR, message: e.message});
	}
}
function* sagaEmployees() {
  	yield takeEvery(GET_EMPLOYEE_REQUEST, fetchEmployees);
}
function getEmployees() {
	return fetch(config.employeeURL, {
		method: 'get'
	})
	.then(response => {
		if( 200 == response.status ) {
			return response
		} else {
			throw new Error('Cannot load data from server. Response status ' + response.status)
		}
	})
	.then(response => response.json())
}
export default sagaEmployees;
import { GET_DEPARTMENTS_REQUEST, GET_DEPARTMENTS_SUCCESS, GET_DEPARTMENTS_ERROR } from '../constants';
import fetch from 'isomorphic-fetch';
import config from '../../../config';
import { call, put, takeEvery } from 'redux-saga/effects';

/* subscribe on actions */
function* sagaDepartments() {
	yield takeEvery(GET_DEPARTMENTS_REQUEST, fetchDepartments);
}

/* middlewares */
function* fetchDepartments(/* action */) {
	try {
		const departments = yield call(getDepartments);
		yield put({type: GET_DEPARTMENTS_SUCCESS, departments: departments.data});
	} catch (e) {
		yield put({type: GET_DEPARTMENTS_ERROR, message: e.message});
	}
}

/* queries */
function getDepartments() {
	return fetch(config.departmentURL, {
		method: 'get'
	})
	.then(response => {
		if( 200 == response.status ) {
			return response
		} else {
			throw new Error('Cannot load data from server. Response status ' + response.status);
		}
	})
	.then(response => response.json())
}
export default sagaDepartments;
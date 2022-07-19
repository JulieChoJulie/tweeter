import { all, fork, put, takeLatest, delay, call } from 'redux-saga/effects';
// import axios from 'axios';

function loginAPI(data) {
  //   return axios.post('/api/login', data);
}

function logoutAPI(data) {
  // return axios.post('/api/logout', data)
}

function* login(action) {
  try {
    yield delay(2000);
    // const result = yield call(loginAPI, action.data);
    yield put({
      type: 'LOG_IN_SUCCESS',
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_IN_FAILURE',
      data: err.response.data,
    });
  }
}

function* logout() {
  try {
    yield delay(2000);
    // const result = yield call(loginAPI);
    yield put({
      type: 'LOG_OUT_SUCCESS',
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      type: 'LOG_OUT_FAILURE',
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest('LOG_IN_REQUEST', login);
}

function* watchLogout() {
  yield takeLatest('LOG_OUT_REQUEST', logout);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout)]);
}

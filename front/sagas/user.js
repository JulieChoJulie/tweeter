import {
  all,
  fork,
  put,
  takeLatest,
  delay,
  call,
  take,
} from 'redux-saga/effects';
import {
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
} from '../reducers/user';
// import axios from 'axios';

function loginAPI(data) {
  //   return axios.post('/api/login', data);
}

function logoutAPI(data) {
  // return axios.post('/api/logout', data);
}

function signupAPI(data) {
  // return axios.post('/api/signup', data);
}

function* login(action) {
  try {
    yield delay(2000);
    // const result = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILURE,
      error: err.response.data,
    });
  }
}

function* logout() {
  try {
    yield delay(2000);
    // const result = yield call(logoutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
      //   data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILURE,
      error: err.response.data,
    });
  }
}

function* signup(action) {
  try {
    // const result = yield call(signupAPI, action.data);
    yield delay(2000);
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, login);
}

function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logout);
}

function* watchSignup() {
  yield take(SIGN_UP_REQUEST, signup);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchSignup)]);
}

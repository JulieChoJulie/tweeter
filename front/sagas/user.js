import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import {
  CHANGE_NICKNAME_FAILURE,
  CHANGE_NICKNAME_REQUEST,
  CHANGE_NICKNAME_SUCCESS,
  FOLLOW_FAILURE,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  GET_FOLLOWERS_FAILURE,
  GET_FOLLOWERS_REQUEST,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWINGS_FAILURE,
  GET_FOLLOWINGS_REQUEST,
  GET_FOLLOWINGS_SUCCESS,
  LOAD_MY_INFO_FAILURE,
  LOAD_MY_INFO_REQUEST,
  LOAD_MY_INFO_SUCCESS,
  LOAD_USER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOG_IN_FAILURE,
  LOG_IN_REQUEST,
  LOG_IN_SUCCESS,
  LOG_OUT_FAILURE,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  REMOVE_FOLLOWER_FAILURE,
  REMOVE_FOLLOWER_REQUEST,
  REMOVE_FOLLOWER_SUCCESS,
  SIGN_UP_FAILURE,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  UNFOLLOW_FAILURE,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
} from '../reducers/user';
import axios from 'axios';

function loginAPI(data) {
  return axios.post('/user/login', data);
}

function logoutAPI(data) {
  return axios.post('/user/logout');
}

function signupAPI(data) {
  return axios.post('/user', data);
}

function followAPI(data) {
  return axios.patch(`/user/${data}/follow`);
}

function getFollowingsAPI() {
  return axios.get('/user/followings');
}

function getFollowersAPI() {
  return axios.get('/user/followers');
}

function unfollowAPI(data) {
  return axios.delete(`/user/${data}/unfollow`);
}

function removeFollowerAPI(data) {
  return axios.delete(`/user/${data}/follower`);
}
function loadUserAPI(data) {
  return axios.get(`/user/${data}`);
}

function loadMyInfoAPI() {
  return axios.get('/user');
}

function changeNicknameAPI(data) {
  return axios.patch('/user/nickname', { nickname: data });
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
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
    const result = yield call(logoutAPI);
    yield put({
      type: LOG_OUT_SUCCESS,
      data: result.data,
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
    const result = yield call(signupAPI, action.data);
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

function* follow(action) {
  try {
    const result = yield call(followAPI, action.data);
    yield put({
      type: FOLLOW_SUCCESS,
      data: result.data.id,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* getFollowings(action) {
  try {
    const result = yield call(getFollowingsAPI, action.data);
    yield put({
      type: GET_FOLLOWINGS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: GET_FOLLOWINGS_FAILURE,
      error: err.response.data,
    });
  }
}

function* getFollowers(action) {
  try {
    const result = yield call(getFollowersAPI, action.data);
    yield put({
      type: GET_FOLLOWERS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: GET_FOLLOWERS_FAILURE,
      error: err.response.data,
    });
  }
}

function* unfollow(action) {
  try {
    const result = yield call(unfollowAPI, action.data);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: result.data.id,
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILURE,
      error: err.response.data,
    });
  }
}

function* removeFollower(action) {
  try {
    const result = yield call(removeFollowerAPI, action.data);
    yield put({
      type: REMOVE_FOLLOWER_SUCCESS,
      data: result.data.id,
    });
  } catch (err) {
    yield put({
      type: REMOVE_FOLLOWER_FAILURE,
      error: err.response.data,
    });
  }
}

function* loadUser(action) {
  try {
    const result = yield call(loadUserAPI, action.data);
    yield put({
      type: LOAD_USER_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_USER_FAILURE,
      error: err,
    });
  }
}

function* loadMyInfo(action) {
  try {
    const result = yield call(loadMyInfoAPI);
    yield put({
      type: LOAD_MY_INFO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_MY_INFO_FAILURE,
      error: err,
    });
  }
}

function* changeNickname(action) {
  try {
    const result = yield call(changeNicknameAPI, action.data);
    yield put({
      type: CHANGE_NICKNAME_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: CHANGE_NICKNAME_FAILURE,
      error: err,
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
  yield takeLatest(SIGN_UP_REQUEST, signup);
}

function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}

function* watchGetFollowings() {
  yield takeLatest(GET_FOLLOWINGS_REQUEST, getFollowings);
}

function* watchGetFollowers() {
  yield takeLatest(GET_FOLLOWERS_REQUEST, getFollowers);
}

function* watchUnfollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchRemoveFollower() {
  yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}

function* watchLoadUser() {
  yield takeLatest(LOAD_USER_REQUEST, loadUser);
}

function* watchLoadMyInfo() {
  yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* watchChangeNickname() {
  yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignup),
    fork(watchFollow),
    fork(watchUnfollow),
    fork(watchLoadUser),
    fork(watchLoadMyInfo),
    fork(watchChangeNickname),
    fork(watchGetFollowings),
    fork(watchGetFollowers),
    fork(watchRemoveFollower),
  ]);
}

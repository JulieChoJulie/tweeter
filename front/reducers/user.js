import produce from 'immer';
import shortId from 'shortid';

export const initialState = {
  isLoggedIn: false,
  isLoggingIn: false,
  isLoggingOut: false,
  logInError: null,
  logOutError: null,
  signUpLoading: false,
  signedUp: false,
  signUpError: null,
  changeNicknameLoading: false,
  changeNicknameUp: false,
  changeNicknameError: null,
  followLoading: false,
  followError: null,
  followed: false,
  unfollowLoading: false,
  unfollowError: null,
  unfollowed: false,
  me: null,
  signUpData: {},
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILURE = 'CHANGE_NICKNAME_FAILURE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILURE = 'FOLLOW_FAILURE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILURE = 'UNFOLLOW_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_TO_ME = 'REMOVE_POST_TO_ME';

// const dummyUser = (data) => ({
//   ...data,
//   nickname: 'julie',
//   id: 1,
//   Posts: [{ id: 1 }],
//   Followings: [
//     { nickname: 'simon', id: shortId.generate() },
//     { nickname: 'jane', id: shortId.generate() },
//     { nickname: 'mike', id: shortId.generate() },
//   ],
//   Followers: [{ nickname: 'simon' }, { nickname: 'jane' }],
// });

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};

export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

export const signupRequestAction = (data) => {
  return {
    type: SIGN_UP_REQUEST,
    data,
  };
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOG_IN_REQUEST:
        draft.me = action.data;
        draft.isLoggingIn = true;
        draft.logInError = null;
        break;
      case LOG_IN_SUCCESS:
        draft.isLoggedIn = true;
        draft.isLoggingIn = false;
        draft.me = action.data;
        break;
      case LOG_IN_FAILURE:
        draft.isLoggingIn = false;
        draft.logInError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.isLoggingOut = true;
        break;
      case LOG_OUT_SUCCESS:
        draft.isLoggedIn = false;
        draft.isLoggingOut = false;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.isLoggingOut = false;
        draft.changeNicknameError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signedUp = false;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signedUp = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameError = null;
        draft.changedNickname = false;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameError = false;
        draft.changedNickname = true;
        break;
      case CHANGE_NICKNAME_FAILURE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;
      case REMOVE_POST_TO_ME:
        draft.me.Posts = draft.me.Posts.filter((p) => p.id !== action.data);
        break;
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followed = false;
        draft.followError = null;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followed = true;
        draft.me.Followings.push({ id: action.data });
        break;
      case FOLLOW_FAILURE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowed = false;
        draft.unfollowError = null;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowed = true;
        draft.me.Followings = draft.me.Followings.filter(
          (y) => y.id !== action.data,
        );
        break;
      case UNFOLLOW_FAILURE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;
      default:
        break;
    }
  });

export default reducer;

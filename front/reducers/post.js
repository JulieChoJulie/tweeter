import produce from 'immer';

export const initialState = {
  hasMorePosts: true,
  isAddingPost: false,
  addedPost: false,
  addPostError: null,
  isRemovingPost: false,
  removedPost: false,
  removePostError: null,
  isAddingComment: false,
  addedComment: false,
  addCommentError: null,
  isLoadingPosts: false,
  loadedPosts: false,
  loadPostsError: null,
  mainPosts: [],
  imagePaths: [],
  postAdded: false,
  likePostLoading: false,
  likePostdone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostdone: false,
  unlikePostError: null,
  uploadImagesLoading: false,
  uploadImagesdone: false,
  uploadImagesError: null,
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
};

export const REMOVE_IMAGE = 'REMOVE_IMAGE';

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'UNLIKE_POST_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'UPLOAD_IMAGES_FAILURE';

export const RETWEET_REQUEST = 'RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'RETWEET_FAILURE';

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addedPost = false;
        draft.isAddingPost = true;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.isAddingPost = false;
        draft.addedPost = true;
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
        break;
      case ADD_POST_FAILURE:
        draft.isAddingPost - false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removedPost = false;
        draft.isRemovingPost = true;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.isRemovingPost = false;
        draft.removedPost = true;
        draft.mainPosts = draft.mainPosts.filter(
          (v) => v.id !== action.data.PostId,
        );
        break;
      case REMOVE_POST_FAILURE:
        draft.isAddingPost = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addedComment = false;
        draft.isAddingComment = true;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((p) => p.id === action.data.PostId);
        post.Comments.unshift(action.data);
        draft.addedComment = true;
        draft.isAddingComment = false;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.isAddingComment = false;
        draft.addCommentError = action.error;
        break;
      case LOAD_POSTS_REQUEST:
        draft.loadedPosts = false;
        draft.isLoadingPosts = true;
        draft.loadPostsError = null;
        break;
      case LOAD_POSTS_SUCCESS: {
        draft.mainPosts = draft.mainPosts.concat(action.data);
        draft.loadedPosts = true;
        draft.isLoadingPosts = false;
        draft.hasMorePosts = draft.mainPosts.length < 50;
        break;
      }
      case LOAD_POSTS_FAILURE:
        draft.isLoadingPosts = false;
        draft.loadPostsError = action.error;
        break;
      case LIKE_POST_REQUEST:
        draft.likePostdone = false;
        draft.likePostLoading = true;
        draft.likePostError = null;
        break;
      case LIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((p) => p.id === action.data.PostId);
        post.Likers.push({ id: action.data.UserId });
        draft.likePostDone = true;
        draft.likePostLoading = false;
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      case UNLIKE_POST_REQUEST:
        draft.unlikePostdone = false;
        draft.unlikePostLoading = true;
        draft.unlikePostError = null;
        break;
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((p) => p.id === action.data.PostId);
        post.Likers = post.Likers.filter((p) => p.id !== action.data.UserId);
        draft.unlikePostdone = true;
        draft.unlikePostLoading = false;
        break;
      }
      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesdone = false;
        draft.uploadImagesLoading = true;
        draft.uploadImagesError = null;
        break;
      case UPLOAD_IMAGES_SUCCESS: {
        draft.imagePaths = action.data;
        draft.uploadImagesdone = true;
        draft.uploadImagesLoading = false;
        break;
      }
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.error;
        break;
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v, i) => i !== action.data);
        break;
      case RETWEET_REQUEST:
        draft.retweetDone = false;
        draft.retweetLoading = true;
        draft.retweetError = null;
        break;
      case RETWEET_SUCCESS: {
        draft.mainPosts.unshift(action.data);
        draft.retweetDone = true;
        draft.retweetLoading = false;
        break;
      }
      case RETWEET_FAILURE:
        draft.retweetLoading = false;
        draft.retweetError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;

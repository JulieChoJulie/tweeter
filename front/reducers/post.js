import shortId from 'shortid';
import produce from 'immer';

export const initialState = {
  isAddingPost: false,
  addedPost: false,
  addPostError: null,
  isRemovingPost: false,
  removedPost: false,
  removePostError: null,
  isAddingComment: false,
  addedComment: false,
  addCommentError: null,
  mainPosts: [
    {
      id: 1,
      User: {
        nickname: 'julie',
      },
      createdAt: {},
      content: 'my first post #hashtag #express',
      Images: [
        {
          src: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Z4r5sQzaBUhn6Pp5g4NAUrlpTabped-mki-yjVmA1w&s=36`,
        },
        {
          src: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT62vFwrvocJ8ORkpsLrnq8-W6GSmkcpVpIxQ&usqp=CAU`,
        },
        {
          src: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Z4r5sQzaBUhn6Pp5g4NAUrlpTabped-mki-yjVmA1w&s=36`,
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'simon',
          },
          content: 'Hiiiiii~',
        },
        {
          User: {
            nickname: 'julie',
          },
          content: 'hey~',
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

const dummyPost = (data) => {
  return {
    id: data.id,
    content: data.content,
    User: {
      id: 1,
      nickname: 'julie',
    },
    Images: [],
    Comments: [],
  };
};

const dummyComment = (data) => ({
  id: shortId.generate(),
  User: {
    id: 1,
    nickname: 'simon',
  },
  content: data,
});

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
        draft.mainPosts.unshift(dummyPost(action.data));
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
          (v) => v.id !== action.data.id,
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
        const post = draft.mainPosts.find((p) => p.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addedComment = true;
        draft.isAddingComment = false;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.isAddingComment = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;

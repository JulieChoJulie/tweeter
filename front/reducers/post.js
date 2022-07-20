import shortId from 'shortid';

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
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addedPost: false,
        isAddingPost: true,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        isAddingPost: false,
        addedPost: true,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        isAddingPost: false,
        addPostError: action.error,
      };
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removedPost: false,
        isRemovingPost: true,
        removePostError: null,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        isRemovingPost: false,
        removedPost: true,
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data.id),
      };
    case REMOVE_POST_FAILURE:
      return {
        ...state,
        isAddingPost: false,
        removePostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addedComment: false,
        isAddingComment: true,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS: {
      const postIndex = state.mainPosts.findIndex(
        (y) => y.id === action.data.postId,
      );
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;

      return {
        ...state,
        isAddingComment: false,
        addedComment: true,
        mainPosts,
      };
    }
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        isAddingComment: false,
        addCommentError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;

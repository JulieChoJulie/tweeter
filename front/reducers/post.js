export const initialState = {
  isAddingPost: false,
  addedPost: false,
  addPostError: null,
  isAddingComment: false,
  addedComment: false,
  addCommentError: null,
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
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

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

const dummyPost = {
  id: 2,
  content: 'dummy',
  User: {
    id: 1,
    nickname: 'julie',
  },
  Images: [],
  Comments: [],
};

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
        mainPosts: [dummyPost, ...state.mainPosts],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        isAddingPost: false,
        addPostError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addedComment: false,
        isAddingComment: true,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        isAddingComment: false,
        addedComment: true,
        Comments: state.Comments,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        isAddingComment: false,
        addCommentError: action.error,
        addCommentError: action.error,
      };

    default:
      return state;
  }
};

export default reducer;

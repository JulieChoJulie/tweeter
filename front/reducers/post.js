export const initialState = {
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
          src: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Z4r5sQzaBUhn6Pp5g4NAUrlpTabped-mki-yjVmA1w&s=36`,
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

const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
};

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
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;

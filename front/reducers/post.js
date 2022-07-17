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
          src: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.princeton.edu%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fhalf_2x%2Fpublic%2Fimages%2F2022%2F02%2FKOA_Nassau_2697x1517.jpg%3Fitok%3DiQEwihUn&imgrefurl=https%3A%2F%2Fwww.princeton.edu%2Fnews%2F2022%2F02%2F02%2Fwhat-your-dogs-lifespan-you-might-be-surprised&tbnid=vEgZce8uNit9PM&vet=12ahUKEwjNu5CykPz4AhVjMH0KHYmgDJMQMygCegUIARDhAQ..i&docid=y-9b3DnaEkm6oM&w=1920&h=1080&q=dog&ved=2ahUKEwjNu5CykPz4AhVjMH0KHYmgDJMQMygCegUIARDhAQ',
        },
        {
          src: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.princeton.edu%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fhalf_2x%2Fpublic%2Fimages%2F2022%2F02%2FKOA_Nassau_2697x1517.jpg%3Fitok%3DiQEwihUn&imgrefurl=https%3A%2F%2Fwww.princeton.edu%2Fnews%2F2022%2F02%2F02%2Fwhat-your-dogs-lifespan-you-might-be-surprised&tbnid=vEgZce8uNit9PM&vet=12ahUKEwjNu5CykPz4AhVjMH0KHYmgDJMQMygCegUIARDhAQ..i&docid=y-9b3DnaEkm6oM&w=1920&h=1080&q=dog&ved=2ahUKEwjNu5CykPz4AhVjMH0KHYmgDJMQMygCegUIARDhAQ',
        },
        {
          src: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.princeton.edu%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fhalf_2x%2Fpublic%2Fimages%2F2022%2F02%2FKOA_Nassau_2697x1517.jpg%3Fitok%3DiQEwihUn&imgrefurl=https%3A%2F%2Fwww.princeton.edu%2Fnews%2F2022%2F02%2F02%2Fwhat-your-dogs-lifespan-you-might-be-surprised&tbnid=vEgZce8uNit9PM&vet=12ahUKEwjNu5CykPz4AhVjMH0KHYmgDJMQMygCegUIARDhAQ..i&docid=y-9b3DnaEkm6oM&w=1920&h=1080&q=dog&ved=2ahUKEwjNu5CykPz4AhVjMH0KHYmgDJMQMygCegUIARDhAQ',
        },
      ],
      Comments: [
        {
          User: {
            nicname: 'simon',
          },
          content: 'Hiiiiii~',
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

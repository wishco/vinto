const UPDATE_USERS = 'UPDATE_USERS'; //
const DELETE_USER = 'DELETE_USER'; //


let initialState = {
  users: [
    {
      id: "11",
      name: "Andrei",
      email: "wishco@yandex.ru",
    },
    {
      id: "21",
      name: "Tatjana",
      email: "kam.tan82@mail.ru",
    },
    {
      id: "31",
      name: "Pasha",
      email: "ffff.ffff@mail.ru",
    },
  ],
  tableUsers: [
    {
      Header: 'Номер',
      accessor: 'id', // accessor is the "key" in the data
    },
    {
      Header: 'Имя',
      accessor: 'name',
    },
    {
      Header: 'email',
      accessor: 'email',
    },
  ]
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_USERS: {
      return {...state, users: action.users}
    }
    case DELETE_USER: {
      return {...state, users: action.users}
    }

    default:
      return state;
  }
}


export const setUsers = (users) => ({type: UPDATE_USERS, users})

export default usersReducer;
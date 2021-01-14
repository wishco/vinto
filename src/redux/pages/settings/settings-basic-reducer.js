import {initializeStructure} from '../../modal-message-reducer';

const UPDATE_ITEM = 'UPDATE_ITEM'; //
const DELETE_ITEM = 'DELETE_ITEM'; //

const _deleteItem = (id) => (dispatch) => {
  console.log('---DELETE ACTION!---')
  console.log('---DELETE ACTION id ---: ' + id)
  // dispatch(setDeleteItem()); //

  // const item = getItem(this.state.list, item.id) // Method to get item in list through comparison (IE: find some item with item.id), it has to return ITEM and INDEX in array
  // const newlist = [].concat(list) // Clone array with concat or slice(0)
  // newlist.splice(item.index, 1);

}

// export const _setDeleteItem = (dispatch) => ({
//   type: DELETE_ITEM
// });

const _setDeleteItem = (v) => {
  console.log('DELETE_ITEM1')
  return {
    type: DELETE_ITEM,
    val: v
  }
}


let initialState = {
  data: [
    {
      id: "11",
      name: "Andrei",
      address: "Пермь!!",
    },
    {
      id: "21",
      name: "Tatjana",
      address: "тут же!!",
    },
    {
      id: "31",
      name: "Pasha",
      address: "мы вместе!!",
    },
  ],
  columns: [
    {
      Header: 'Номер',
      accessor: 'id', // accessor is the "key" in the data
    },
    {
      Header: 'Имя',
      accessor: 'name',
    },
    {
      Header: 'Адрес',
      accessor: 'address',
    },
  ],

  actions: {
    actionDelete: DELETE_ITEM
  }
};


const settingsBasicReducer = (state = initialState, action) => {

  switch (action.type) {

    // case UPDATE_ITEM: {
    //   return {...state, users: action.users}
    // }
    case DELETE_ITEM: {
      console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbb: ')
      return {...state,
        // data: state.data.filter(p => p.id != action.postId)
      }
    }

    default:
      return state;
  }
}






// function deleteItem1 () {
//   console.log('---DELETE ACTION!!!!---')
//   deleteItem(1)
// }



export const setSettingsBasic = (settingsBasic) => ({type: UPDATE_ITEM, settingsBasic})

export default settingsBasicReducer;
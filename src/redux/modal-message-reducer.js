const INITIALIZE_STRUCTURE = 'INITIALIZE_STRUCTURE'; // инициализация структуры программы
const UPDATE_STATUS = 'UPDATE_STATUS'; //
const CLOSE_MODAL_MESSAGE = 'CLOSE_MODAL_MESSAGE'; //
const UPDATE_TABLE_FIELD = 'UPDATE_TABLE_FIELD'; //
const UPDATE_TABLE_LIST = 'UPDATE_TABLE_LIST'; //


const BUTTON_ACCEPT = 'accept'; // в окне нажали применить
const BUTTON_CANCEL = 'cancel'; // в окне нажали отменить
const BUTTON_BREAK = 'break'; // в окне нажали прервать


let initialState = {

  table: { // для активной таблицы, заносим ввденные данные из модального окна inputs
     // tableXXX : {
     //   fieldXXX : 'XXX',
     //   fieldXXX2 : 'XXX',
     //   fieldXXX3 : 'XXX',
     // }

  },
  modalStatus: {
    // terminate: false, // прервать отображение модального окна сообщений
    onShow: false, // статус показа модального окна сообщений
    typeMess: null, // тип сообщения modalMessageType
    config: null, // конфиг сообщения (title text/input)
    table: null, // имя таблицы, если открытие было от имени таблицы
    button: null, // кнопка от пользователя при закрытии модального окна
  },
  modalMessageType: {
    info: {
      title: 'Информация',
      buttonsSelect: [{default: 'OK'}],
      image: {url: 'info.png'},
      color: 'info',
    },
    warning: {
      title: 'Внимание!',
      buttonsSelect: [{warm: 'OK'}],
      image: {url: 'warning.png', size: '48px'},
      color: 'warning',
    },
    alarm: {
      title: 'Тревога!',
      buttonsSelect: [{hot: 'OK'}],
      image: {url: 'alarm.png', size: '48px'},
      color: 'alarm',
    },
    remove: {
      title: 'Вы действительно хотите удалить запись из таблицы данную запись?',
      buttonsSelect: [{hot: 'Удалить'}, {cancel: 'Отмена'}],
      tooltip: ['Удалить: Удалить, текущую, выделенную запись в таблице.', ' Отмена: Закрыть окно, без внесений изменений.'],
      image: {url: 'delete.png', size: '48px'},
      color: 'alarm',
    },
    add: {
      title: 'Добавление новой записи в таблицу',
      buttonsSelect: [{cold: 'Добавить'}, {cancel: 'Отмена'}],
      tooltip: ['Добавить: Добавить, текущую запись.', ' Отмена: Закрыть окно, без внесений изменений.'],
      image: {url: 'add.png', size: '48px'},
      color: 'info',
    },
    change: {
      title: 'Изменение текущей записи',
      buttonsSelect: [{warm: 'Сохранить'}, {cancel: 'Отмена'}],
      tooltip: ['Сохранить: Применить изменения, внести текущие данные в таблицу.', ' Отмена: Закрыть окно, без внесений изменений.'],
      image: {url: 'edit.png', size: '48px'},
      color: 'warning',
    }
  }

};

// важно!!! в передающей фунции надо точно задавать имя передающего параметра 'NameXXX', это имя будет в 'action.NameXXX'
// Имя объекта данных должно совпадать в точности с именем
const modalMessagesReducer = (state = initialState, action) => {

  switch (action.type) {


    case INITIALIZE_STRUCTURE: // инициализация структуры модальных окон сообщений
      return {...state, modalMessageType: state.modalMessageType, modalStatus: state.modalMessageType};

    case UPDATE_STATUS: //
      return {
        ...state,
        modalStatus: action.modalStatus
      };


    case UPDATE_TABLE_LIST: //
      console.log('UPDATE_TABLE_LIST')
      console.log('UPDATE_TABLE_LIST')
      console.log('UPDATE_TABLE_LIST')
      return {
        ...state,
        table: {
          ...state.table,
          [action.table.tableName]: {
            'data': action.table.data,
            'columns': action.table.columns,
          }
        }};


    case UPDATE_TABLE_FIELD: //
      console.log('UPDATE_TABLE_FIELD')

      return {
        ...state,
        table: {
          ...state.table,
          [action.table.tableName]: {
            ...state.table[action.table.tableName],
            [action.table.fieldName]: {
              ...state.table[action.table.tableName][action.table.fieldName], ['fieldValue']: action.table.fieldValue
            }
          }

        }};

    case CLOSE_MODAL_MESSAGE: //
      return {
        ...state,
        modalStatus: {
          ...state.modalStatus,
          // config: action.config,
          button: action.button,
          onShow: false
        }
      };

    default:
      return state;
  }
};
// terminate: false, // прервать отображение модального окна сообщений
//onShow: false, // статус показа модального окна сообщений
//  typeMess: null, // тип сообщения modalMessageType
//  config: null, // конфиг сообщения
//  button: null // кнопка от пользователя при закрытии модального окна

const updateTableList = (table) => ({
  type: UPDATE_TABLE_LIST,
  table
});

const updateTableField = (table) => ({
  type: UPDATE_TABLE_FIELD,
  table
});

export const updateTable = ({tableName, fieldName, fieldValue}) => (dispatch) => {
  dispatch(updateTableField({tableName, fieldName, fieldValue}))
}


export const updateModalMessage = (modalStatus) => ({
  type: UPDATE_STATUS,
  modalStatus
});

export const closeModalMessage = ({button}) => ({
  type: CLOSE_MODAL_MESSAGE,
  button
});



export const showModalMessage = (propMain, propTitle, propType) => (dispatch) => {
  // Вызываем мадальное окно, через переменные propMain, propTitle, propType
  // или
  // Вызываем мадальное окно, через объект propMain (используем таблицу)
  let typeMess = null
  let config = null

  if (typeof propMain === 'object') { // если передаем объект (с массивом с строк/текстовых_полей text/inputs)
    typeMess = propMain.typeMess
    config = propMain.config
  } else { // если передаем просто текст
    typeMess = ( propType === 'info' || propType === 'alarm' || propType === 'warning')
      && propType || 'info'
    config = {
      text: propMain,
      title: propTitle
    }
  }

  const modalStatus = { // составляем данные для state: modalStatus
    onShow: true,
    typeMess: typeMess,
    config: config,
    button: null
  }

  if (config.tableName) { // если есть данные о таблице, создаем данные о ней в state
    dispatch(updateTableList({
      tableName: config.tableName,
      data: config.data,
      columns: config.columns
    }));
  }


  console.log('-----------------------')
  console.log(modalStatus)

  dispatch(updateModalMessage(modalStatus));
};


export const initializeStructure = () => ({type: INITIALIZE_STRUCTURE});

export const initializeModalMessages = () => (dispatch) => {
  dispatch(initializeStructure()); // инициализировать данные модальных окон сообщений

};



export default modalMessagesReducer;
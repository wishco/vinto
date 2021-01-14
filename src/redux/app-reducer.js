const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS'; // инициализация приложения успешна
const INITIALIZE_STRUCTURE = 'INITIALIZE_STRUCTURE'; // инициализация структуры программы
// const SAVE_ACTIVE_TAB = 'SAVE_ACTIVE_TAB' // сохранить номер активной вкладки навигации
const UPDATE_URI_STRUCTURE = 'UPDATE_URI_STRUCTURE' // получить URI структуру от текущего роута

let initialState = {
  initialized: false, globalError: null,
  currentLang: '',
  currentUriState: {
    uri: '',
    split: {
      nav: '',
      tab: ''
    }
  }
  ,
  navPagesUriState: {
    uri: '',
    split: {
      nav: '',
      tab: ''
    }
  },
  navPages: {
    user: {
      title: 'Настройка пользователя',
      tab: [
        {route: '/user/basic', text: 'Общие'},
        {route: '/user/auth', text: 'Аутентификация'},
        {route: '/user/options', text: 'Дополнительные опции'},
      ]
    }
    ,
    settings: {
      title: 'Опции программы',
      tab: [
        {route: '/settings/basic', text: 'Общие'},
        {route: '/settings/interface', text: 'Интерфейс'},
        {route: '/settings/options', text: 'Дополнительные опции'},
      ]
    }
    ,
    config: {
      title: 'Конфигуратор CRM',
      tab: [
        {route: '/config/users', text: 'Пользователи'},
        {route: '/config/professions', text: 'Профессии'},
        {route: '/config/tasks', text: 'Задачи'},
      ]
    }
  },

  dataBD: {
    superUsers: [
      {id: 1, name: 'superUser-7', pass: '1', rules: '7'}
    ],
    users: [
      {id: 2, name: 'Guest-01', pass: '1', rules: '1'},
      {id: 3, name: 'user-02', pass: '2', rules: '2'},
      {id: 3, name: 'user-special-03', pass: '3', rules: '3'},
      {id: 4, name: 'manager-04', pass: '4', rules: '4'},
      {id: 5, name: 'admin-05', pass: '5', rules: '5'},

    ],
    usersData: [
      {
        id: 2,
        name: 'Андрей',
        surname: 'Михайлов',
        thirdName: 'Валерьевич',
        dateBirth: '21.05.1979',
        dateReg: '10.08.2020',
        tel: '89028010594'
      },
      {id: 3, name: 'Паша', surname: 'Соин', thirdName: '', dateBirth: '21.05.1979', dateReg: '10.08.2020', tel: ''},
    ],
    firms: [
      {id: 1, name: 'НПО Искра', dateReg: '10.08.2020', dateBirth: '', lastCall: '10.08.2020'},
      {id: 2, name: 'Милев Иван', dateReg: '10.08.2020', dateBirth: '', lastCall: ''},
    ],
    firmsData: [
      {
        id: 1,
        name: 'НПО Искра',
        contacts: [{id: 1, Name: 'Вова', tel: '+7902121212', mail: '', comment: 'Уточнить размеры'}],
        mailFirm: 'test@mail.ru',
      }
    ]
  }
};

// важно!!! в передающей фунции надо точно задавать имя передающего параметра 'NameXXX', это имя будет в 'action.NameXXX'
// Имя объекта данных должно совпадать в точности с именем
const appReducer = (state = initialState, action) => {

  switch (action.type) {

    case INITIALIZE_STRUCTURE: // инициализация структуры приложения
      return {...state, navPages: state.navPages};

    case INITIALIZED_SUCCESS: // инициализация приложения успешна
      return {...state, initialized: true};

    case UPDATE_URI_STRUCTURE: // инициализация приложения успешна
      return {...state, currentUriState: action.currentUriState, navPagesUriState: action.navPagesUriState};

    default:
      return state;
  }
};

export const updateUriStructure = (currentUriState, navPagesUriState) => ({type: UPDATE_URI_STRUCTURE, ...currentUriState, ...navPagesUriState});

export const initializeStructure = () => ({type: INITIALIZE_STRUCTURE});
export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});
export const initializeApp = () => (dispatch) => {
  dispatch(initializeStructure()); //??? инициализировать данные программы (в будущем брать с сервера нужные данные)
  dispatch(initializedSuccess());
};


export default appReducer;
import headerReducer from './header-reducer';
import svgType from './svg-store';

const actionDelete = 'actionDelete';
const actionAdd = 'actionAdd';
const actionChange = 'actionChange';


let initialState = {
  styleButtonsDefault: {
      width: '15px',
      height: '15px'
  },
  actions: {
    actionAdd: {
      title: "Добавить запись",
      textHide: true,
      text: 'Добавить',
      svgType: svgType.svgTableAddMIC
    },
    actionChange: {
      title: "Редактировать запись",
      textHide: true,
      text: 'Редактировать',
      svgType: svgType.svgTableChangeMIC
    },
    actionDelete: {
      title: "Удалить запись",
      textHide: true,
      text: 'Удалить',
      svgType: svgType.svgTableDeleteMIC
    },
    actionDelete2: {
      title: "Удалить запись",
      textHide: true,
      text: 'Удалить',
      svgType: svgType.svgTableDeleteMIC
    },
    actionDelete3: {
      title: "Удалить запись",
      textHide: true,
      text: 'Удалить',
      svgType: svgType.svgTableDeleteMIC
    },
    actionDelete4: {
      title: "Удалить запись",
      textHide: true,
      text: 'Удалить',
      svgType: svgType.svgTableDeleteMIC
    },
    actionDelete5: {
      title: "Удалить запись",
      textHide: true,
      text: 'Удалить',
      svgType: svgType.svgTableDeleteMIC
    },
    actionDelete6: {
      title: "Удалить запись",
      textHide: true,
      text: 'Удалить',
      svgType: svgType.svgTableDeleteMIC
    },
    actionDelete7: {
      title: "Удалить запись",
      textHide: true,
      text: 'Удалить',
      svgType: svgType.svgTableDeleteMIC
    },
    actionDelete8: {
      title: "Удалить запись",
      textHide: true,
      text: 'Удалить',
      svgType: svgType.svgTableDeleteMIC
    },
  },
  tables: {
    users: {
      actions: { actionDelete, actionAdd, actionChange }
    }

  }
};

const buttonsReducer = (state = initialState, action) => {

  switch (action.type) {

    default:
      return state;
  }
};

export default buttonsReducer;
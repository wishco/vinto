import svgType from "./svg-store";

const SAVE_ACTIVE_TAB = 'SAVE_ACTIVE_TAB'; // сохранить номер активной вкладки навигации

let initialState = {
  headersNav: {
    settings: {
      title: "Опции программы",
      textHide: true,
      text: 'Опции',
      svgType: svgType.svgSettingsMIC,
      redirectTab: '/settings/basic'
    },
    user: {
      title: "Настройки пользователя",
      text: 'Пользователь',
      textHide: true,
      svgType: svgType.svgAccountMIC,
      redirectTab: '/user/basic'
    },
    config: {
      title: "Конфигурация CRM программы",
      text: 'Конфигуратор',
      svgHide: false,
      svgType: svgType.svgEmptyHeader,
      redirectTab: '/config/users'
    }
  }
};

// важно!!! в передающей фунции надо точно задавать имя передающего параметра 'NameXXX', это имя будет в 'action.NameXXX'
// Имя объекта данных должно совпадать в точности с именем
const headerReducer = (state = initialState, action) => {

  switch (action.type) {

    case SAVE_ACTIVE_TAB:
      let redirectTabCurrent = {...state.headersNav[action.headNavPage], redirectTab: action.redirectTab}
      let redirectTabCurrentPlus = {
        headersNav: {...state.headersNav, [action.headNavPage]: redirectTabCurrent}
      };
      return {
        ...state,
        ...redirectTabCurrentPlus
      };

    default:
      return state;
  }
};

export const saveActiveTabToHeaderNav = (headNavPage, redirectTab) => ({
  type: SAVE_ACTIVE_TAB,
  headNavPage,
  redirectTab
});

export default headerReducer;
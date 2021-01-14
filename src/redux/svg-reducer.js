
const UPDATE_STYLE_SVG_HEADER_ACCOUNT = 'UPDATE_STYLE_SVG_HEADER_ACCOUNT';
const UPDATE_STYLE_SVG_MAIN_NAVIGATION = 'UPDATE_STYLE_SVG_MAIN_NAVIGATION';


let initialState = {
  stylesSvg: {
    styleHeaderNav : {
      width: '15px',
      height: '15px',
      colorOn: 'red'
    },
    styleEmpty : {
      width: '5px',
      height: '5px'
    },
    styleTable : {
      width: '5px',
      height: '5px'
    }
  }
};

const svgReducer = (state = initialState, action) => {
  // console.log('---------svgReducer----------');
  // console.log(action.type);

  switch (action.type) {
    case UPDATE_STYLE_SVG_HEADER_ACCOUNT:
      return {
        ...state,
        svgStyleNameHeaderNav: action.svgStyleNameHeaderNav
      };

    case UPDATE_STYLE_SVG_MAIN_NAVIGATION:
      return {
        ...state,
        svgStyleMainNav: action.svgStyleMainNav
      };

    default:
      return state;
  }
};
//
export const updateStylesvgStyleNameHeaderNav = (newStyle) => {
  return ({type: UPDATE_STYLE_SVG_HEADER_ACCOUNT, newStyle});
};
export const updateStylesvgStyleMainNav = (newStyle) => {
  return ({type: UPDATE_STYLE_SVG_HEADER_ACCOUNT, newStyle});
};

export const updateStyleSvg = () => (dispatch) => {
  let testSvg = {width: '35px', height: '35px'};
  dispatch(updateStylesvgStyleNameHeaderNav(testSvg));
  dispatch(updateStylesvgStyleMainNav(testSvg));
};

export default svgReducer;
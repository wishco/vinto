const UPDATE_SIZE = 'UPDATE_SIZE'; // обновить данные ширины и высоты окна браузера
const UPDATE_MODAL_DRAG_START = 'UPDATE_MODAL_DRAG_START'; //
const UPDATE_MODAL_DRAG_CURR = 'UPDATE_MODAL_DRAG_CURR'; //
const UPDATE_MODAL_DRAG_END = 'UPDATE_MODAL_DRAG_END'; //
const UPDATE_MODAL_POSITION = 'UPDATE_MODAL_POSITION'; //

let initialState = {
  size: {
      width: window.innerWidth,
      height: window.innerHeight,
      preWidth: window.innerWidth,
      preHeight: window.innerHeight
    },
  drag: {
    start: {x: 1, y: 1}, // сохраняем координаты при dragAndDrop относительно положения курсора и положения модалки
    curr: {x: 1, y: 1}, // текущее положение курсора, при dragAndDrop модального окна
    end: {x: 1, y: 1} // конечное положение курсора, при dragAndDrop модального окна
  },
  modalPos: {
    left: 1,
    top: 1,
    init: false
  }
};

const windowReducer = (state = initialState, action) => {


  switch (action.type) {

    case UPDATE_SIZE: {
      return {...state, size: action.size}
    }

    case UPDATE_MODAL_DRAG_START: {
      return {
        ...state,
        drag: {...state.drag, start: action.drag.start}
      }
    }

    case UPDATE_MODAL_DRAG_CURR: {
      return {
        ...state,
        drag: {...state.drag, curr: action.drag.curr}
      }
    }

    case UPDATE_MODAL_DRAG_END: {
      return {
        ...state,
        drag: {...state.drag, end: action.drag.end}
      }
    }

    case UPDATE_MODAL_POSITION: {
      return {...state, modalPos: action.modalPos}
    }

    default: {
      return state;
    }

  }
}

export const setSize = (size) => ({type: UPDATE_SIZE, size})
export const setDragStart = (drag) => ({type: UPDATE_MODAL_DRAG_START, drag})
export const setDragCurr = (drag) => ({type: UPDATE_MODAL_DRAG_CURR, drag})
export const setDragEnd = (drag) => ({type: UPDATE_MODAL_DRAG_END, drag})
export const setModalPos = (modalPos) => ({type: UPDATE_MODAL_POSITION, modalPos})

export default windowReducer;
import React, {useContext, useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {setDragCurr, setDragEnd, setDragStart} from '../../../redux/window-reducer';
import {compose} from 'redux';
import {SWindowProvider} from '../SWindow/SWindowContext';
import {useToolTips} from '../../TooTips/ToolTipsContext';

const SDrag = React.createContext()
export const useSDrag = () => {
  return useContext(SDrag)
}

export const SDragProvider = ({children, ...props}) => {
  const mouseDownState = useRef(null)

  const handlerMouseDown = (e) => {
    props.setDragStart({
      start: {
        x: e.pageX - props.windowModalPos.left,
        y: e.pageY- props.windowModalPos.top
      }
    })

    mouseDownState.current = true
  }
  const handlerMouseMove = (e) => {
    if (!mouseDownState.current) return void 0
    props.setDragCurr({curr: {x: e.pageX, y: e.pageY}})
  }
  const handlerMouseUp = (e) => {
    if (mouseDownState.current) {
      mouseDownState.current = false
      props.setDragEnd({end: {x: e.pageX, y: e.pageY}})
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', handlerMouseMove);
    window.addEventListener('mouseup', handlerMouseUp);
    return () => {
      window.removeEventListener('mousemove', handlerMouseMove);
      window.removeEventListener('mouseup', handlerMouseUp);
    }
  }, [])
  return (
    <SDrag.Provider>
      <div
        style={{width: 'calc(100% - 4.5rem)'}} // заполним ширину, за которую будем цеплятся при DragAndDrop
        onMouseDown={(e) => handlerMouseDown(e)}
      >
        {children}
      </div>
    </SDrag.Provider>
  )
}

const mapStateToProps = (state) => {
  return {
    windowModalDrag: state.windowState.drag,
    windowModalPos: state.windowState.modalPos
  }
};

let SDragProviderContainer = compose(
  connect(mapStateToProps, {setDragStart, setDragCurr, setDragEnd})
)(SDragProvider)



export default SDragProviderContainer;
import React, {useContext, useEffect, useRef, useState} from 'react';
import ModalMessage from '../../ModalMessage/ModalMessage';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {closeModalMessage} from '../../../redux/modal-message-reducer';
import {setSize} from '../../../redux/window-reducer';


const SWindowContext = React.createContext()

export const useSWindow = () => {
  return useContext(SWindowContext)
}

export const SWindowProvider = ({children, ...props}) => {

  const preWindowSize = useRef(null)

  useEffect( () => {
    preWindowSize.current = {
      w: props.windowSize.width,
      h: props.windowSize.height
    }
  }, [props.windowSize])


  const handlerSWindow = () => {
    props.setSize({
      width: window.innerWidth,
      height: window.innerHeight,
      preWidth: preWindowSize.current.w,
      preHeight: preWindowSize.current.h
    })
  }

  const mouseDownState = useRef(null)

  useEffect(() => {
    handlerSWindow() // при инициализации эмулируюем событие resize (т.е. делаем инициализацию данных из window-reducer)
    window.addEventListener('resize', handlerSWindow);

    return () => {
      window.removeEventListener('resize', handlerSWindow);
    }
  }, [])
  return (
    <SWindowContext.Provider>
      {children}
    </SWindowContext.Provider>
  )
}

const mapStateToProps = (state) => {

  return {
    windowSize: state.windowState.size,
    windowModalDrag: state.windowState.size
  }
};

let SWindowProviderContainer =  compose(
  connect(mapStateToProps, {setSize})
)(SWindowProvider)



export default SWindowProviderContainer;
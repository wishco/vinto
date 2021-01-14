import React, {useContext, useState} from 'react';


const ModalMessageContext = React.createContext();

export const useModalMessage = () => {
  return useContext(ModalMessageContext)
}


export const ModalMessageProvider = ({children, ...props}) => {
  const [modalMessageShow, setModalMessageShow] = useState(false)
  const toggleShow = () => setModalMessageShow(prev => !prev)

  console.log('-ModalMessageProvider-')
  console.log(children)
  console.log(props)

  return (
    <ModalMessageContext.Provider value={{
      visible: modalMessageShow,
      toggleShow
    }}>
      {children}
    </ModalMessageContext.Provider>
  )

}


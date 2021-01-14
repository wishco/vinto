import React, {useEffect, useRef} from 'react';
import {updateModalMessage} from '../../../../redux/modal-message-reducer';
import ModalMessageContainer from '../../../ModalMessage/ModalMessageContainer';
import ShowModalMessageTest from '../../../TestsComponents/ShowModalMessageTest';


const PageSettingsInterface = ({modalStatus, modalMessageType, showModalMessage, modalTable}) => {

 // получение данных из модального окна
  useEffect( () => {
    console.log('modalStatus:')
    console.log(modalStatus)
    console.log('BTN:' + modalStatus.button)
    console.log(modalTable)
  }, [modalStatus.button])

  // получение данных из модального окна
  useEffect( () => {
    console.log('gogi?')
    if (modalTable.gogi) {
      console.log('gogi существует:')
      console.log(modalTable)
    }


  }, [modalTable])

  return (
    <>
      <div>PageSettingsInterface-------------</div>

      <ShowModalMessageTest
        modalStatus={modalStatus}
        modalMessageType={modalMessageType}
        showModalMessage={showModalMessage}
      />
      <ModalMessageContainer/>

    </>
  )
}

export default PageSettingsInterface;
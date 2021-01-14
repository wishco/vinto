import React from 'react';
import {ToolTipsProvider} from '../TooTips/ToolTipsContext';
import {ButtonsWindow} from '../single/buttons/ButtonsWindow';


const ModalQuestion = (props) => {

  console.log(props)

  return (
    <>

      <div className={`modal-question active`}>
        <div className={`modal-question__window`} >
          <div className={'modal-question__window-header-wrap flex-sb-c'}>

          </div>
        </div>
      </div>

    </>
  )
}

export default ModalQuestion;
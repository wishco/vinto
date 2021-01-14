import React from 'react';
import {useToolTips} from '../../TooTips/ToolTipsContext';

export const ButtonsWindow = ({type, fn}) => {

  const ToolTipsButton = useToolTips()
  let buttonEvent = null
  let typeWindow = null
  let titleButton = null

  if (ToolTipsButton) { // если кнопка вызывает TollTips
    buttonEvent = ToolTipsButton.toggle
    typeWindow = 'buttons-window_' + "tooltips"
    titleButton = 'Информация о данном сообшении...'
  }

  if (type === "close") { // если кнопка 'close'
    buttonEvent = fn
    typeWindow = 'buttons-window_' + "close"
    titleButton = 'Закрыть окно...'
  }


  return (
    <>
      <button
        tabIndex={2}
        type={'button'}
        title={titleButton}
        className={'buttons-window ' + typeWindow}
        onClick={buttonEvent}
      >
      </button>
    </>
  )
}

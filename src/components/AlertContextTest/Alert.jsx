import React, {useContext} from 'react';
import {useAlert} from './AlertContext';

export default function Alert() {

  const alert = useAlert()

  if (!alert.visible) return null

  return (
    <>
      <div onClick={alert.toggle}>
        Это очень и очень важное сообщение!
      </div>
    </>

  )
}
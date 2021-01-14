import React from 'react';
// import {showModalMessage} from '../../redux/modal-message-reducer';

const showModalMessageTest = ({modalStatus, modalMessageType, showModalMessage}) => {
  const contentText = 'Andrei111'
  const contentText2 = ['Andrei111', 'Andrei22222222222222']
  const contentText3 = ['Andrei111', 'Andrei22222222222222']

  return (
    <>
      <div>

        <div onClick={() => {
          showModalMessage({
            typeMess: 'info', config: {
              title: 'title->info',
              text: contentText
            }
          })
        }}>Info
        </div>

        <div onClick={() => {
          showModalMessage({
            typeMess: 'alarm', config: {
              title: 'title->alarm',
              text: contentText2
            }
          })
        }}>Alarm
        </div>

        <div onClick={() => {
          showModalMessage({
            typeMess: 'change',
            config: {
              title: 'Редактируем строку в таблице FIO',
              tableName: 'tableFio',
              tableFields: {
                fieldId: {fieldName: 'id', fieldValue: '1'},
                fieldFirstName: {fieldName: 'Имя', fieldValue: 'Андрей', fieldType: 'string'},
                fieldSecondName: {fieldName: 'Фамилия', fieldValue: 'Михайлов', fieldType: 'string'},
              }
            }
          })
        }}>Строка в таблице
        </div>

        <div onClick={() => {
          showModalMessage({
            typeMess: 'change', config: {
              title: 'Редактируем строку в таблице2',
              tableName: 'tableBorder',
              tableFields: {
                fieldId: {fieldName: 'id', fieldValue: '5'},
                fieldColor: {fieldName: 'Цвет', fieldValue: 'красный', fieldType: 'selectColor'},
                fieldWidth: {fieldName: 'Бордюр>', fieldValue: 'Да', fieldType: 'bool'},
              }
            }
          })
        }}>Строка в таблице2
        </div>


        {/*<div onClick={() => {*/}
        {/*  showModalMessage({typeMess: 'warning'})*/}
        {/*}}>Warning*/}
        {/*</div>*/}


        <div>----------------------</div>
        {/*<div onClick={() => {*/}
        {/*  showModalMessage({typeMess: 'remove'})*/}
        {/*}}>remove*/}
        {/*</div>*/}
        {/*<div onClick={() => {*/}
        {/*  showModalMessage({typeMess: 'add'})*/}
        {/*}}>add*/}
        {/*</div>*/}
        {/*<div onClick={() => {*/}
        {/*  showModalMessage({typeMess: 'change'})*/}
        {/*}}>change*/}
        {/*</div>*/}
        <div onClick={() => {
          showModalMessage('Привет лунатикамПривет ивет лунатет лунативет лует лунативет лует лунативет луивет лунативет лунатлунаивет лунативет лунативет лунативет лунаттикамПривет лунатикамПривет лунатикамПривет лунм', 'Тут отображается очень важная информация!!! Внимание!!!', 'alarm')
        }}>лунатикам
        </div>
      </div>
    </>
  )

}

export default showModalMessageTest;
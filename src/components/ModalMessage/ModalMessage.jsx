import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {ToolTipsProvider} from '../TooTips/ToolTipsContext';
import {ButtonsWindow} from '../single/buttons/ButtonsWindow';
import SWindowProviderContainer, {SWindowProvider} from '../services/SWindow/SWindowContext';
import SDragProviderContainer from '../services/SDrag/SDrag';

const ModalMessage = ({modalStatus, modalMessageType, closeModalMessage, windowSize, windowModalDrag, windowModalPos, setModalPos, updateTable, modalTable}) => {


  function objVal(_obj, _treeName1, _treeName2) {
    // получить значение в объекте, по пути в его дереве
    // если искомое свойства о объекте нет, возвращаем false
    // если искомое свойство есть, возращаем значение искомого свойства
    if ((_obj === void 0) || (_treeName1 === void 0)) return false
    if (_obj[_treeName1] === void 0) return false
    if (_treeName2 === void 0) return _obj[_treeName1]
    if (_obj[_treeName1][_treeName2] === void 0) return false
    return _obj[_treeName1][_treeName2]
  }

  const parentArea = useRef(null) // данные родителя
  const childArea = useRef(null)
  const [childShow, setChildShow] = useState(null)
  const inputsMessage = useRef(null)

  useEffect(() => {
    if (childArea.current)
      setChildShow(true)
    else
      setChildShow(false)
  }, [modalStatus.onShow])


  let currentType
  let bemWindowHeaderWrap
  let bemWindowHeaderTitle
  let textMessage
  let imageMessageUrl
  let imageMessageStyle
  let titleMessage
  let toolTipsMessage
  let buttonsForSelect
  const inputsMessageJSX = useRef(null)

  const buttonsForSelectJSX = () => {

    console.log('BBBBBBBBBBB')
    console.log(buttonsForSelect)
    const TAB_INDEX_NEXT = 12
    return buttonsForSelect.map((typeButton, index) => {
        const keyButton = Object.keys(typeButton)[0]
        const valButton = Object.values(typeButton)[0]
        return (
          <div key={keyButton}
               className={'modal-question__button-question '}
            // onClick={ () => {closeModalMessage ({button: 'Кнопка крутяк'})}}
               onClick={() => {

                 closeModalMessage({button: valButton})
                 console.log('AAAAAAAAAAAAAAAAAAAAAAAAA')
                 console.log('AAAAAAAAAAAAAAAAAAAAAAAAA:' + keyButton)
               }}
          >

            <button type="button" className={`button-question button-question_${keyButton}`}
                    tabIndex={TAB_INDEX_NEXT + index}>
              <div className="button-question__text ">{valButton}</div>
              <div className={`button-question__animate button-question__animate_${keyButton}`}></div>
            </button>
          </div>
        )
      }
    )
  }










  // изменяем положение модального окна при изменении размеров window
  useEffect(() => {
    if (!childArea.current) return void 0
    let newLeft;
    let newTop;

    if ((windowSize.width !== windowSize.preWidth) || (!windowModalPos.init)) { // если значение изменилось или не было инициализации
      newLeft = (parentArea.current.offsetWidth - childArea.current.offsetWidth) / 2
    } else {
      newLeft = windowModalPos.left
    }

    if ((windowSize.height !== windowSize.preHeight) || (!windowModalPos.init)) { // если значение изменилось или не было инициализации
      newTop = (parentArea.current.offsetHeight - childArea.current.offsetHeight) / 2
    } else {
      newTop = windowModalPos.top
    }

    setModalPos({left: newLeft, top: newTop, init: true}) // задаем позиционирование модалки при изменении window

  }, [windowSize])

  // устанавливаем координаты для позиционирования модального окна
  // при DragAndDrop учитывая текущие координаты курсора и координат модального окна перед перетаскиванием
  useEffect(() => {


    if (!windowModalPos.init) return void 0 // если еще координаты не проинициализировались выходим
    setModalPos({ // задаем позиционирование модалки при DragAndDrop
      left: windowModalDrag.curr.x - windowModalDrag.start.x,
      top: windowModalDrag.curr.y - windowModalDrag.start.y,
      init: true
    })
  }, [windowModalDrag.curr])


const getInputJSX = () => {

    if (!modalStatus.config) {
      inputsMessageJSX.current = null // очищаем, от старых значений
      return void 0
    }

    const currTable = modalStatus.config.table // имя текущей таблицы

    inputsMessageJSX.current =
      Object.entries(modalTable[currTable]).map((item, index) => {
        const fieldName = item[0]
        const fieldLabel = item[1].fieldName
        const fieldValue = item[1].fieldValue

        return (

          (fieldName !== 'fieldId') && // id не отображаем пользователю
          <div key={index} className={'input-box '}>
            <label className={'input-box__label flex-sb-c'}>{`${fieldLabel}: `}
              <input className={'input-box__input flex-sb-c'}
                     value={fieldValue || ''}
                     data-field-name={fieldName}
                     data-table={currTable}

                     onChange={(e) => {
                       updateTable({
                         tableName: e.currentTarget.attributes["data-TableMic"].value,
                         fieldName: e.currentTarget.attributes["data-field-name"].value,
                         fieldValue: e.currentTarget.value
                       })
                     }
                     }
              />

            </label>
          </div>
        )
      }
    )
  }



  // !!!
  // !!! ниже любого условия нельзя распологать хуки!!!
  // !!!


  if (!modalStatus.onShow) return null // если не нужно отображать компонент то выходим

  currentType = modalMessageType[modalStatus.typeMess]
  bemWindowHeaderWrap = 'modal-question__window-header-wrap' + '_' + currentType.color;
  bemWindowHeaderTitle = 'modal-question__header-title' + '_' + currentType.color;

  textMessage = objVal(modalStatus, 'config', 'text') || 'default content'
  inputsMessage.current = objVal(modalStatus, 'config', 'input') || null
  imageMessageUrl = objVal(currentType, 'image', 'url') || null
  imageMessageStyle = {width: objVal(currentType, 'image', 'size') || null}
  titleMessage = objVal(modalStatus, 'config', 'title') || (objVal(currentType, 'title') || null)
  toolTipsMessage = objVal(modalStatus, 'config', 'tooltip') || (objVal(currentType, 'tooltip') || null)
  buttonsForSelect = objVal(modalStatus, 'buttonsSelect') || (objVal(currentType, 'buttonsSelect') || [{attention: 'Ok'}])


  const textMessageJSX = () => {
    if (!(textMessage instanceof Array)) return textMessage
    return textMessage.map((val, index) =>
      <div key={index} className={'modal-question__text'}>
        {Object.values(val)}
      </div>
    )
  }

  if (inputsMessageJSX.current) {
    // console.log('inputsMessageJSX')
    // console.log(inputsMessageJSX.current)
  }


  return (
    <>
      <SWindowProviderContainer> {/* Передаем данные window в store, что бы потом реагировать на изменения в window (size) */}

        <div ref={parentArea} className={`modal-question ${childShow && 'active'}`}>
          <div className={`modal-question__window-wrap`}>

            <div ref={childArea} style={windowModalPos} className={`modal-question__window`}>


              <div className={`modal-question__window-header-wrap ${bemWindowHeaderWrap} flex-sb-c`}>

                <SDragProviderContainer> {/* Передаем данные window в store, информацию о DragAndDrop состоянии */}

                  <div title={titleMessage} className={`modal-question__header-title-wrap`}>
                    <div className={`modal-question__header-title ${bemWindowHeaderTitle}`}> {titleMessage} </div>
                  </div>
                </SDragProviderContainer>

                <div className={'modal-question__header-wrap-buttons flex-c-c'}>

                  {toolTipsMessage &&
                  <ToolTipsProvider pos={'bottom'} text={toolTipsMessage}>
                    <ButtonsWindow/>
                  </ToolTipsProvider>
                  }

                  <ButtonsWindow type={'close'} fn={() => {
                    closeModalMessage({button: 'break'})
                  }}/>

                </div>
              </div>


              <div className={'modal-question__content flex-sb-c'}>
                <img className={'modal-question__content-image'} style={imageMessageStyle}
                     src={imageMessageUrl && require(`./../../template/images/modal/${imageMessageUrl}`)}
                />
                <div className={'modal-question__content-text'}>
                  {inputsMessage &&
                  inputsMessageJSX.current || textMessageJSX() // отображаем либо Inputs либо текст
                  }
                </div>
              </div>


              <div className={'modal-question__buttons-wrap flex-e-e '}>
                {buttonsForSelectJSX()}

              </div>


            </div>


          </div>
        </div>

      </SWindowProviderContainer>
    </>
  )
}

export default ModalMessage;


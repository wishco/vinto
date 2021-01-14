import React, {createRef, useEffect, useRef, useState} from 'react';
import {v4 as uuidv4} from 'uuid';

import {useTable} from 'react-table';
import SvgContainer from '../basic/SvgContainer';
import ModalMessageContainer from '../ModalMessage/ModalMessageContainer';


const TableMic = ({
                    buttonsActions,
                    buttonsStyles,
                    showModalMessage, // запуск модального окна (необходимо задавать параметры, при вызове)
                    currTable,  // текущая таблица
                    modalStatus, // получение данных о modalStatus
                    ...props
                  }) => {

  const [buttonLastFocus, setButtonLastFocus] = useState(null); // последняя нажатая клавижа на toolbar

  const refContainer = useRef(null);


  const data = React.useMemo(
    () => currTable.data,
    []
  );

  const columns = React.useMemo(
    () => currTable.columns,
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({columns, data})


  const [modalWindowQuestion, setModalWindowQuestion] = useState(0);
  const [modalWindowQuestionActive, setModalWindowQuestionActive] = useState('');



  // получение данных из модального окна
  useEffect(() => {
    if (!modalStatus.button) return void 0
    console.log('BTN[]:' + modalStatus.button)
    console.log(modalStatus)
  }, [modalStatus.button])


  function taskModalWindowQuestion(task) {
    if (task === 1) {
      console.log('YES!');
      setModalWindowQuestion(null)
    } else if (task === 0) {
      console.log('NO!');
      setModalWindowQuestion(null)
    } else {
      console.log('SHOW!');
      setModalWindowQuestion(0)
    }
  }

  useEffect(() => {
    if (modalWindowQuestion === 0) return setModalWindowQuestionActive('active')
    else return setModalWindowQuestionActive('')
  }, [modalWindowQuestion])

  const [activeRow, setActiveRow] = useState(null);

  function updateActiveRow(row) {
    setActiveRow(row)
  }

  function toggleRow(row) {
    if (row.id === activeRow)
      updateActiveRow(null)
    else
      updateActiveRow(row.id);
  }

  function toggleActive(row) {
    if (row.id === activeRow) {
      return 'active'
    } else {
      return ''
    }
  }

  function getValueCell(cell) {
    if (cell.column.id === 'id')
      return (cell.row.index + 1) // формируем первую строку по индексам, а не по текущему состоянию значений в базе
    else
      return cell.render('Cell');
  }

  // создаем массив ссылок на кнопки от количества кнопок
  const refs = Array.from({length: Object.keys(buttonsActions).length}).map(() => createRef());
  // const refs = Array.from({length: Object.keys(currTable.actions).length}).map(() => createRef());



  function updateButtonLastFocus(buttonIndex) {
    setButtonLastFocus(buttonIndex);
  }

  const callButtonAction = (buttonName) => {
    switch (buttonName) {
      case 'actionAdd':
        showModalMessage({typeMess: 'add'})
        console.log('actionAdd');
        break;
      case 'actionChange':

        console.log('dddddddddddddddddddddddddddd')
        console.log(refs)
        // showModalMessage({
        //   typeMess: 'change', config: {
        //     title: 'Редактируем строку в таблице2',
        //     tableName: 'tableBorder',
        //     tableFields: {
        //       fieldId: {fieldName: 'id', fieldValue: '5'},
        //       fieldColor: {fieldName: 'Цвет', fieldValue: 'красный', fieldType: 'selectColor'},
        //       fieldWidth: {fieldName: 'Бордюр>', fieldValue: 'Да', fieldType: 'bool'},
        //     }
        //   }
        // })


        console.log('activeRow:' + activeRow);
        break;
      case 'actionDelete':
        // taskModalWindowQuestion(null)
        // showModalMessage({typeMess: 'remove'})

        showModalMessage({
          typeMess: 'remove', config: {
            title: 'Удаляем запись из таблицы пользователей',
            tableName: 'tableBorder',
            data: data[activeRow],
            columns: columns,
            actions: currTable.actions
          }
        })

        console.log('actionDelete');
        break;

      default:
        break;
    }
  }

  function clickToolbarButton(buttonName, buttonIndex) {
    console.log('clickToolbarButton:' + buttonName);
    updateButtonLastFocus(buttonIndex)
    callButtonAction(buttonName)
  }

  // получить JSX область кнопок управления таблицей, если actions для таблицы есть
  const buttonsArea = currTable.actions && Object.keys(buttonsActions).map((item, index) => { // перебираем все существующие buttonsActions

    const actionCurrButton = currTable.actions[item] // обработчик для текущей кнопки, если в currTable нет такой вернем undefined
      return (

        (actionCurrButton !== void 0) && // если обработчик текущей кнопки есть, то кнопку рисуем

        <button key={item} className={'toolbar__table'} title={buttonsActions[item].title} ref={refs[index]}
                onFocus={event => updateButtonLastFocus(index)}
                onChange={event => alert(1)}
                onClick={() => {

                  console.log('---DELETE ACTION!@@---')

                  actionCurrButton(27)  // при клике на кнопку вызывам обработчик, для каждой из таблицы свой
                  // clickToolbarButton(item, index)
                }} disabled={!activeRow}>
          <div className={'toolbar__box '}>
            <div className={' toolbar__text'}>{buttonsActions[item].text} </div>
            <SvgContainer action={clickToolbarButton} svgOptions={buttonsActions[item]} itemStyleSvg={buttonsStyles}/>
          </div>
        </button>
      )
    }
  )


  // устанавливаем фокус, на последней выбранной кнопке, при активности toolbar И если кнопку хоть раз задали
  useEffect(() => {
    if ((activeRow != null) && (buttonLastFocus !== null)) {
      refs[buttonLastFocus].current.focus();
    }
  }, [activeRow, modalWindowQuestionActive]) // фокус должен появится при разблокировки toolbar и при закрытии модалки


  return (
    <>

      <div className={'main__element'}>
        <div className={'main__title'}>Список пользователей</div>

        {/*кнопки таблицы*/}
        <div className={'toolbar flex-s-c wrap'}>
          {buttonsArea}
        </div>

        <table  {...getTableProps()} >
          <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()} > {column.render('Header')} </th>
              ))}
            </tr>
          ))}
          </thead>
          <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()} onClick={event => toggleRow(row)} className={toggleActive(row)}>
                {row.cells.map(cell => {
                  return (<td {...cell.getCellProps()} > {getValueCell(cell)} </td>)
                })}
              </tr>
            )
          })}
          </tbody>
        </table>
      </div>
      <ModalMessageContainer/>
    </>
  )


}

export default TableMic;
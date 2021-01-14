import React, {createRef, useEffect, useMemo, useRef, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {useTable} from 'react-table';
import SvgContainer from '../../../basic/SvgContainer';
import ToolTips from '../../../TooTips/ToolTips';
import {ToolTipsProvider} from '../../../TooTips/ToolTipsContext';
import {ButtonsWindow} from '../../../single/buttons/ButtonsWindow';

import ModalMessageContainer from '../../../ModalMessage/ModalMessageContainer';

const PageConfigUser = ({buttonsActions, buttonsStyles, users, tableUsers,
                          showModalMessage,
                          ...props}) => {

  const [buttonLastFocus, setButtonLastFocus] = useState(0); // последняя нажатая клавижа на toolbar

  const refContainer = useRef(null);

  const data = React.useMemo(
    () => users,
    []
  );

  const columns = React.useMemo(
    () => tableUsers,
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
  function updateActiveRow(row) { setActiveRow(row)}

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

  function updateButtonLastFocus(buttonIndex) {
    setButtonLastFocus(buttonIndex);
  }

  const callButtonAction = (buttonName) => {
    switch (buttonName) {
      case 'actionAdd':
        // showModalMessage({typeMess: 'add'})
        console.log('actionAdd');
        break;
      case 'actionChange':
        // showModalMessage({typeMess: 'change'})
        console.log('activeRow:' + activeRow);
        break;
      case 'actionDelete':
        // taskModalWindowQuestion(null)
        // showModalMessage({typeMess: 'remove'})

        showModalMessage({typeMess: 'remove', config: {
          title: 'Удаляем запись из таблицы пользователей',
          text: 'ряд:' + activeRow
        }})
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

  // получить область кнопок управления таблицей
  const buttonsArea = Object.keys(buttonsActions).map((item, index) => {
      return (
        <button key={item} className={'toolbar__table'} title={buttonsActions[item].title} ref={refs[index]}
                onFocus={event => updateButtonLastFocus(index)}
                onChange={event => alert(1)}
                onClick={() => {
                  clickToolbarButton(item, index)
                }} disabled={!activeRow}>
          <div className={'toolbar__box '}>
            <div className={' toolbar__text'}>{buttonsActions[item].text} </div>
            <SvgContainer action={clickToolbarButton} svgOptions={buttonsActions[item]} itemStyleSvg={buttonsStyles}/>
          </div>
        </button>
      )
    }
  )

  // устанавливаем фокус, на последней выбранной кнопке, при активности toolbar
  useEffect(() => {
    if (activeRow != null) {
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


};


export default PageConfigUser;



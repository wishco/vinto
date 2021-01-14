import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {getComponentPageFromNameAndArrayComponents} from '../../template/libs/libMIC';
import PageSettingsBasicContainer from './settings/Basic/PageSettingsBasicContainer';
import PageSettingsInterfaceContainer from './settings/Interface/PageSettingsInterfaceContainer';
import PageSettingsOptionsContainer from './settings/Options/PageSettingsOptionsContainer';
import PageUserBasicContainer from './user/Basic/PageUserBasicContainer';
import PageUserAuthContainer from './user/Auth/PageUserAuthContainer';
import PageUserOptionsContainer from './user/Options/PageUserOptionsContainer';
import PageConfigTasksContainer from './config/Tasks/PageConfigTasksContainer';
import PageConfigProfessionsContainer from './config/Professions/PageConfigProfessionsContainer';
import PageConfigUsersContainer from './config/Users/PageConfigUsersContainer';


// В файле [ModalMessage.jsx] задан RoutText, это значения роута
// combinePages - структура имени от роута переименовынный по правилу[пример]: /settings/basiс => PageSettingsBasiс
const combinePages = {
  components: {
    PageSettingsBasicContainer: PageSettingsBasicContainer,
    PageSettingsInterfaceContainer: PageSettingsInterfaceContainer,
    PageSettingsOptionsContainer: PageSettingsOptionsContainer,
    PageUserBasicContainer: PageUserBasicContainer,
    PageUserAuthContainer: PageUserAuthContainer,
    PageUserOptionsContainer: PageUserOptionsContainer,
    PageConfigTasksContainer: PageConfigTasksContainer,
    PageConfigProfessionsContainer: PageConfigProfessionsContainer,
    PageConfigUsersContainer: PageConfigUsersContainer,
  },
  errTextRoute: '[Pages.jsx] \'combinePages\': массив - ошибка! В массив не добавлена компонента: '
};

const Pages = ({routeText, ...props}) => {

  // const [currentPage, setCurrentPage] = useState( () => {
  //   return
  // })



  let currentPage = useRef()




  // const currentPage = getComponentPageFromNameAndArrayComponents(combinePages, routeText)

  const m =  getComponentPageFromNameAndArrayComponents(combinePages, routeText)
  // let m = <PageSettingsBasicContainer/>

  useEffect(()=>{
    console.log('9999999999999999')

  }, [routeText])

  console.log('88888888888888')
  return (
    <>
      <div className="main__element base">
        {m}
      </div>
    </>
  )
}

export default Pages;
import React, {useEffect, useState} from 'react';



import PageSettingsBasicContainer     from './../../components/pages/settings/Basic/PageSettingsBasicContainer';
import PageSettingsInterfaceContainer from './../../components/pages/settings/Interface/PageSettingsInterfaceContainer';
import PageSettingsOptionsContainer   from './../../components/pages/settings/Options/PageSettingsOptionsContainer';
import PageUserBasicContainer         from './../../components/pages/user/Basic/PageUserBasicContainer';
import PageUserAuthContainer          from './../../components/pages/user/Auth/PageUserAuthContainer';
import PageUserOptionsContainer       from './../../components/pages/user/Options/PageUserOptionsContainer';
import PageConfigTasksContainer       from './../../components/pages/config/Tasks/PageConfigTasksContainer';
import PageConfigProfessionsContainer from './../../components/pages/config/Professions/PageConfigProfessionsContainer';
import PageConfigUsersContainer       from './../../components/pages/config/Users/PageConfigUsersContainer';



// функция, отбрасывает символы текса из строки возвращает число... если итог не число, вернем ноль
export function getNumbersFromText(text) {
  if (!text) return 0;
  const textModified = text.replace(/\D+/g, '');
  if (!textModified) {
    return 0;
  } else {
    return parseInt(textModified);
  }

}

// добавить все личные prototype в проект
export function addAllPrototypesLibMIC() {

  // добавляем к String новый обработчик
  String.prototype.firstLetterCaps = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  }


}

// получить имя Компонеты по тексту роута
function getNamePageFromRouteText(routeText) {
  let str;
  // строку роута разбить в массив ('/settings/basic' к пимеру)
  // получить массив, каждый элемент с Заглавной буквы
  str = routeText.split('/').map(el => el.firstLetterCaps());
  // склеить в имя компонеты
  str = 'Page'.concat(...str).concat('Container');
  // console.log(str)
  return str;
}

// получить Компоненту по роуту из массива компонент
export function getComponentPageFromNameAndArrayComponents(ArrayObj, routeText) {
  console.log('ЭТОТ КОНСОЛЬ ЛОГ НЕ ДОЛЖЕН ОТРАБАТЫВАТЬ, rendrer только один раз при открытии текуцей Page!!!')
  const NameComponent = getNamePageFromRouteText(routeText); // по роуту получаем имя объекта

  const isExistNameInArray = Object.keys(ArrayObj.components).find(item => item === NameComponent);



  let outJSX;

  if (!isExistNameInArray) {
    throw new Error(`${ArrayObj.errTextRoute} ${NameComponent}`)
    outJSX = <div></div>;
  } else {

    outJSX = ArrayObj.components[NameComponent]();

  }
  console.log('666666666')
  return outJSX
}


// получить состояние объекта Uri, текст-роута из текущего роута (пример: pathname = '/user/basic')
export function getUriObjStateFromUri(objInsert, uri) {
  const splitMass = (uri.split('/')).filter(element => element); // разбить строку на массив и убрать пустые элементы
  if (!splitMass[0]) splitMass[0] = '';
  if (!splitMass[1]) splitMass[1] = '';

  return {
    [objInsert]: {
      uri: uri,
      split: {
        nav: splitMass[0],
        tab: splitMass[1]
      }
    }
  }
}

// функция поиска существующей страницы по совпадению роута в navPages и Url адреса
// функция возвращает головной Роут (user/admin => user), если был найден, а иначе пустую строку
export function getExistNavPageFromUri(navPages, pathName) {
  // console.log('getExistNavPageFromUri')
  // console.log(navPages)
  let notfoundPage = true;
  let iTab, PageFoundedNum = '';
  Object.keys(navPages).every(function (iPage) {
    iTab = navPages[iPage].tab;

    Object.keys(iTab).every(function (iRoute) {
      if (iTab[iRoute].route === pathName) { // если путь нашли, устанавливаем флаг выхода из цикла
        notfoundPage = false;
        PageFoundedNum = iPage;
      }
      return notfoundPage; // true - цикл продолжить false - выйти из цикла
    });
    return notfoundPage; // true - цикл продолжить false - выйти из цикла
  });
  return notfoundPage ? '' : PageFoundedNum;
}



// функция получения значения Int переменной CSS
export function getVarCssValue_MIC (varCss, type='') {
  const val = getComputedStyle(document.documentElement).getPropertyValue(varCss);

  if (type === '') // значит приводим к числу
    // return parseInt(val.replace(/\D/g,''))
    return getNumbersFromText(val)
  else if (type === 'str')
    return val;
  else
    return null;

  // let m2 = getComputedStyle(refParent.current.querySelector('.arrow__wrap'), ':after').height;
}
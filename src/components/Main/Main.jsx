import React, {useEffect} from "react";
import Navbar from "../Navbar/Navbar";
import {NavLink, Redirect, Route, Switch} from "react-router-dom";
import Home from "../pages/Home";
import Error404 from "../pages/Error404";
import {
  getExistNavPageFromUri,
  getUriObjStateFromUri
} from "../../template/libs/libMIC";
import PagesContainer from "../pages/PagesContainer";
import PageConfigUsersContainer from '../pages/config/Users/PageConfigUsersContainer';
import PageConfigProfessionsContainer from '../pages/config/Professions/PageConfigProfessionsContainer';
import PageConfigTasksContainer from '../pages/config/Tasks/PageConfigTasksContainer';
import PageSettingsBasicContainer from '../pages/settings/Basic/PageSettingsBasicContainer';
import PageSettingsInterfaceContainer from '../pages/settings/Interface/PageSettingsInterfaceContainer';
import PageSettingsOptionsContainer from '../pages/settings/Options/PageSettingsOptionsContainer';
import PageUserAuthContainer from '../pages/user/Auth/PageUserAuthContainer';
import PageUserBasicContainer from '../pages/user/Basic/PageUserBasicContainer';
import PageUserOptionsContainer from '../pages/user/Options/PageUserOptionsContainer';

// получаем массив редиректов и роутов из объекта navigationRoutes
function GetArrayRedirectAndRoutes(navigationRoutes, saveActiveTabUser2, props) {
  let arrayOut = [];


  Object.keys(navigationRoutes).forEach(function (page) {
    if (navigationRoutes[page].isRedirect === true) // если задан редирект для Page
      arrayOut.push( // то добавляем редирект в массив роутинга
        <Route key={`/${page}`} exact path={`/${page}`}
               render={() => <Redirect to={`/${page}/basic`}/>}/>
      );

    Object.keys(navigationRoutes[page].tab).forEach(function (tabItem) {
      let routePath = navigationRoutes[page].tab[tabItem].route;
      arrayOut.push(
        (<Route key={routePath} path={routePath}
                render={() => <Navbar pageHead={page} routePath={routePath} className="main__element"
                                      saveActiveTabUser2={saveActiveTabUser2} curPage={navigationRoutes[page]}/>}/>)
      );
    });
  });

  return arrayOut;
}



const Main = ({navPages, updateUriStructure, ...props}) => {
  // console.log('=========MainMainMainMain========')

  // запуск при смене роута (сохраняем для себя данные о URL)
  useEffect(() => {

    let pathName = props.location.pathname; // текущий url
    let currentUriState = getUriObjStateFromUri('currentUriState', pathName); // получить объект текущего url
    let currentHeadNavPage = getExistNavPageFromUri(navPages, pathName); // получить head роута, если текущий url и роут в navPage есть
    let navPagesUriState = getUriObjStateFromUri('navPagesUriState', (currentHeadNavPage ? pathName : '') ); // получить объект navPage если роут существует иначе, делаем пустой объект
    updateUriStructure(currentUriState , navPagesUriState); // сохраняем данные URL в STATE
  }, [props.location.pathname]
  );


  return (
    <>
      <div className="main container">
        <div className="main__box box">
          <div className="main__window">
            <div className="main__wrap flex-s wrap">

              <Switch>
                <Route exact path='/'
                       render={() => <Home/>}/>

                <Route key={`/user`} exact path={`/user`}
                       render={() => <Redirect to={`/user/basic`}/>}/>

                <Route key={`/user/basic`} path={`/user/basic`}
                       render={() => <Navbar path={`/user/basic`} page={navPages.user} className="main__element"/>}/>

                <Route key={`/user/auth`} path={`/user/auth`}
                       render={() => <Navbar path={`/user/basic`} page={navPages.user} className="main__element"/>}/>

                <Route key={`/user/options`} path={`/user/options`}
                       render={() => <Navbar path={`/user/options`} page={navPages.user} className="main__element"/>}/>


                <Route key={`/settings`} exact path={`/settings`}
                       render={() => <Redirect to={`/settings/basic`}/>}/>


                <Route key={`/settings/basic`} path={`/settings/basic`}
                       render={() => <Navbar path={`/settings/basic`} page={navPages.settings}
                                             className="main__element"/>}/>

                <Route key={`/settings/interface`} path={`/settings/interface`}
                       render={() => <Navbar path={`/settings/interface`} page={navPages.settings}
                                             className="main__element"/>}/>

                <Route key={`/settings/options`} path={`/settings/options`}
                       render={() => <Navbar path={`/settings/options`} page={navPages.settings}
                                             className="main__element"/>}/>


                <Route key={`/config`} exact path={`/config`}
                       render={() => <Redirect to={`/config/users`}/>}/>

                <Route key={`/config/users`} path={`/config/users`}
                       render={() => <Navbar path={`/config/users`} page={navPages.config}
                                             className="main__element"/>}/>

                <Route key={`/config/professions`} path={`/config/professions`}
                       render={() => <Navbar path={`/config/professions`} page={navPages.config}
                                             className="main__element"/>}/>

                <Route key={`/config/tasks`} path={`/config/tasks`}
                       render={() => <Navbar path={`/config/tasks`} page={navPages.config}
                                             className="main__element"/>}/>


                <Route path='*'
                       render={() => <Error404/>}/>}/>
              </Switch>



              <Route exact path='/settings/basic'
                     render={() => <PageSettingsBasicContainer/>}/>
              <Route exact path='/settings/interface'
                     render={() => <PageSettingsInterfaceContainer/>}/>
              <Route exact path='/settings/options'
                     render={() => <PageSettingsOptionsContainer/>}/>

              <Route exact path='/user/auth'
                     render={() => <PageUserAuthContainer/>}/>
              <Route exact path='/user/basic'
                     render={() => <PageUserBasicContainer/>}/>
              <Route exact path='/user/options'
                     render={() => <PageUserOptionsContainer/>}/>

              <Route exact path='/config/users'
                     render={() => <PageConfigUsersContainer/>}/>
              <Route exact path='/config/professions'
                     render={() => <PageConfigProfessionsContainer/>}/>
              <Route exact path='/config/tasks'
                     render={() => <PageConfigTasksContainer/>}/>

{/*
              <Route exact path='/settings/basic'
                     render={() => <PagesContainer routeText='/settings/basic'/>}/>
              <Route exact path='/settings/interface'
                     render={() => <PagesContainer routeText='/settings/interface'/>}/>
              <Route exact path='/settings/options'
                     render={() => <PagesContainer routeText='/settings/options'/>}/>

              <Route exact path='/user/basic'
                     render={() => <PagesContainer routeText='/user/basic'/>}/>
              <Route exact path='/user/auth'
                     render={() => <PagesContainer routeText='/user/auth'/>}/>
              <Route exact path='/user/options'
                     render={() => <PagesContainer routeText='/user/options'/>}/>

              <Route exact path='/config/users'
                     render={() => <PagesContainer routeText='/config/users'/>}/>
              <Route exact path='/config/professions'
                     render={() => <PagesContainer routeText='/config/professions'/>}/>
              <Route exact path='/config/tasks'
                     render={() => <PagesContainer routeText='/config/tasks'/>}/>*/}







            </div>
          </div>
        </div>
      </div>
    </>
  )

};


export default Main;
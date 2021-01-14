import React, {useEffect} from "react";
import Logo from "../single/Logo";
import {NavLink} from "react-router-dom";
import NavButton from "../single/NavButton";

const Header = ({headersNav, stylesSvg, navPagesUriState, saveActiveTabToHeaderNav, ...props}) => {

// запуск при смене роута (сохраняем URL redirectTab, в частности для кнопок Head)
  useEffect(() => {
      if (navPagesUriState.uri) {

        saveActiveTabToHeaderNav(navPagesUriState.split.nav, props.location.pathname); // сохраняем путь, если путь есть в navPage
      }
    }, [navPagesUriState]
  );

  return (
    <>
      <div className="header container">
        <div className="header__box box">
          <div className="header__wrap flex-sb-c">
            <Logo className="header__element logo flex-sb-c wrap"/>
            <div className="header__element flex-sb-c">

              <NavButton headerNav={headersNav.config} itemStyleSvg={stylesSvg.styleEmpty} />
              <NavButton headerNav={headersNav.user} itemStyleSvg={stylesSvg.styleHeaderNav} />
              <NavButton headerNav={headersNav.settings} itemStyleSvg={stylesSvg.styleHeaderNav} />

            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default Header;
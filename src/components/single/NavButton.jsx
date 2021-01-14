import React from "react";
import {NavLink} from "react-router-dom";
import SvgContainer from "../basic/SvgContainer";

const NavButton = ({headerNav, itemStyleSvg, ...props}) => {



  return (
    <>
      <NavLink to={headerNav.redirectTab} title={headerNav.title} className="action-item flex-sb-c" >
        {!headerNav.textHide ?
          <p className="action-item__text flex-c">{headerNav.text}</p>
          : <></>}

        {!headerNav.svgHide ?
          <div className="action-item__wrap-svg flex-c">
            <SvgContainer svgOptions={headerNav} itemStyleSvg={itemStyleSvg} />
          </div>
          : <></>}
      </NavLink>
    </>
  )
}

export default NavButton;
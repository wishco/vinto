import React from "react";
import logo from "../../template/images/logo.png";
import {NavLink} from "react-router-dom";

const Logo = ({className, ...props}) => {

  return (
    <NavLink exact to="/" className={`${className}`}>
      <img className="logo__image" src={logo} alt=""/>
      <p className="logo__text-under ">crm web-application</p>
    </NavLink>
  )
}

export default Logo;

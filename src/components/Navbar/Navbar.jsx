import React, {useEffect} from 'react';
import s from './Navbar.module.css';
import {NavLink} from "react-router-dom";

const Navbar = ({page, ...props}) => {

  let elementMenu = page.tab.map(
    p => <li key={p.route} className="navbar-mic__item">
      <NavLink to={p.route} className="navbar-mic__item-link">{p.text}</NavLink>
    </li>
  );

  return (
    <nav className={`${props.className} navbar-mic`}>
      <p className="navbar-mic__title">{page.title}</p>
      <ul className="navbar-mic__wrap">
        {elementMenu}
      </ul>

    </nav>
  )
}

export default Navbar;
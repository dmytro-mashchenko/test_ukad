import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/UKAD_logo.png';
import './Header.scss';

export function Header() {
  return (
    <div className="Header">
      <div className="Header__container container">
        <NavLink className="Header__logo" to="/">
          <img src={logo} alt="logo" />
        </NavLink>
        <nav className="Header__navigation">
          <NavLink className="Header__link" to="/">
            Home
          </NavLink>
          <NavLink className="Header__link" to="/products">
            Dogs
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

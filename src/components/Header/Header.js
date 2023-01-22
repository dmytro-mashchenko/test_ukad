import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/UKAD_logo.png';
import './Header.scss';

export function Header() {
  return (
    <div className="Header">
      <div className="Header__container container">
        <NavLink to="/">
          <img className="Header__logo" src={logo} alt="logo" />
        </NavLink>
        <nav className="Header__navigation">
          <NavLink className="Header__link" to="/">
            Home
          </NavLink>
          <NavLink className="Header__link" to="/products">
            Products
          </NavLink>
        </nav>
      </div>
    </div>
  );
}

import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Nav.css";

function Nav() {
  return (
    <nav className="Nav">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/dogs">Dogs</NavLink>
        </li>
        <li>
          <NavLink to="/dogs/whiskey">Whiskey</NavLink>
        </li>
        <li>
          <NavLink to="/dogs/duke">Duke</NavLink>
        </li>
        <li>
          <NavLink to="/dogs/perry">Perry</NavLink>
        </li>
        <li>
          <NavLink to="/dogs/tubby">Tubby</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;

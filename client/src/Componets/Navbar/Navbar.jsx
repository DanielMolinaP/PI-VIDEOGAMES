import React from "react";
// import { NavLink } from "react-router-dom";
import "../../Styles/Navbar.css";
import start from "../../img/pressStart.gif";

const Navbar = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={start} alt="Logo de la marca"className="ghost" />
      </div>
      <nav>
        <ul className="nav-links">
          <li>
            <a href="/" className="btn-neonN">
              <span id="span1"></span>
              <span id="span2"></span>
              <span id="span3"></span>
              <span id="span4"></span>
              Landing Page
            </a>
          </li>
          <li>
            <a href="/home" className="btn-neonN">
              <span id="span1"></span>
              <span id="span2"></span>
              <span id="span3"></span>
              <span id="span4"></span>
              Home
            </a>
          </li>
          <li>
            <a href="/createvideogame" className="btn-neonN">
              <span id="span1"></span>
              <span id="span2"></span>
              <span id="span3"></span>
              <span id="span4"></span>
              Create Videogame
            </a>
          </li>
          <li>
            <a href="/videogameFavorites" className="btn-neonN">
              <span id="span1"></span>
              <span id="span2"></span>
              <span id="span3"></span>
              <span id="span4"></span>
              Favorites Videogames
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;

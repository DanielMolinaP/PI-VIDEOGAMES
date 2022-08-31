import React from "react";
import imagen from "../../img/pressStart.gif"
//styles
import "../../Styles/Footer.css"
import linkin from "../../img/linkin.png"
import github from "../../img/github.png"
const Footer = () => {
  return (
    <footer className="pie-pagina">
      <div className="grupo-1">
        <div className="box">
          <figure>
            <a href="/">
              <img src={imagen} alt="Logo de start" />
            </a>
          </figure>
        </div>
        <div className="box">
          <h2>ABOUT ME</h2>
          <p>
            Hi! My name is Daniel Molina Pineda I'm 22 years old, I'm from Mexico City. This page was created by me. 
          </p>
          <p>
            If do you like and want more information about the tecnologies used to create this page, contact me at the links.
          </p>
        </div>
        <div className="box">
          <h2>FOLLOW ME</h2>
          <div className="red-social">
            <a href="https://www.linkedin.com/in/daniel-molina-a61b85236/" target="_blank"><img src={linkin} height="45px" width="45px"></img></a>
            <a href="https://github.com/masterchip14" target="_blank"><img src={github} height="45px" width="55px"></img></a>
          </div>
        </div>
      </div>
      <div className="grupo-2">
        <small>
          &copy; 2022 <b></b> - Todos los Derechos Reservados.
        </small>
      </div>
    </footer>
  );
};

export default Footer;

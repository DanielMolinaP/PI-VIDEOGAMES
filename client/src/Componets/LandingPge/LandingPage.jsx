import React from "react";
import "../../Styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="todoLA">
      <div className="landing">
        <h2 className="cambioh2" data-text="WORLD_GAMER">WORLD_GAMER</h2>
        <h3>By: Daniel Molina</h3>
        <br />
        <a href="/home" className="btn-neon">
          <span id="span1"></span>
          <span id="span2"></span>
          <span id="span3"></span>
          <span id="span4"></span>
          START
        </a>
      </div>
    </div>
  );
};

export default LandingPage;

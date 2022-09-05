import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getVideogameByName } from "../../Redux/Acctions/index.js";
import "../../Styles/SearchBar.css";

const SearchBar = ({ allVideogames }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };


  const verificate = () => {
    if (allVideogames.length < 1) {
      alert("Videogame does not exist");
    }
    console.log(allVideogames)
  };

  const handleSubmit = () => {
    dispatch(getVideogameByName(name));
    setTimeout(verificate, 1000);
  };
  return (
    <div className="arr">
      <input
        className="searchBox"
        type="text"
        placeholder="Search Videogame..."
        onChange={(e) => handleInputChange(e)}
      />
      <a onClick={(e) => handleSubmit(e)} className="linkk">
        Search
      </a>
    </div>
  );
};

export default SearchBar;

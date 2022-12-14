import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVideogames,
  getAllGeneres,
  getAllPlatforms,
  getByCreated,
  getByGenres,
  getByPlatforms,
  sortByName,
  sortByRating,
} from "../../Redux/Acctions/index";
import Navbar from "../Navbar/Navbar";
import Card from "../Card/Card";
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import Footer from "../Footer/Footer";

//STYLES
import "../../Styles/Home.css";

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllVideogames());
    dispatch(getAllGeneres());
    dispatch(getAllPlatforms());
  }, [dispatch]);
  const allVideogames = useSelector((state) => state.videogamesRender);
  const allPlatforms = useSelector((state) => state.platforms);
  const allGeneres = useSelector((state) => state.genres);
  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage] = useState(12);
  const [order, setOrder] = useState("");
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = allVideogames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCreated = (e) => {
    e.preventDefault();
    dispatch(getByCreated(e.target.value));
  };

  const handleGenres = (e) => {
    e.preventDefault();
    dispatch(getByGenres(e.target.value));
  };

  const handlePlatforms = (e) => {
    e.preventDefault();
    dispatch(getByPlatforms(e.target.value));
  };

  const handleOrder = (e) => {
    e.preventDefault();
    dispatch(sortByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Sorted ${e.target.value}`);
  };

  function handleSortByRating(e) {
    e.preventDefault();
    dispatch(sortByRating(e.target.value));
    setOrder(`Sorted ${e.target.value}`);
  }

  function deteleFilters(e) {
    e.preventDefault();
    dispatch(getAllVideogames());
    setOrder("delete");
  }

  return (
    <div className="Home_Principal">
      <div className="cuadro">
        <Navbar />
        {/* {console.log(allVideogames)} */}
        <SearchBar allVideogames={allVideogames} />
        <div className="selects">
          <select onChange={(e) => handleCreated(e)} className="sidebar-box">
            <option value="" disabled selected>
              Filter By Created
            </option>
            <option value="All">All</option>
            <option value="Created">My Videogames</option>
            <option value="Api">Api Videogames</option>
          </select>
          <select onChange={(e) => handleGenres(e)} className="sidebar-box">
            <option value="" disabled selected>
              Filter By Genres
            </option>
            <option value="All">All</option>
            {allGeneres.map((i, index) => (
              <option key={index} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
          <select onChange={(e) => handlePlatforms(e)} className="sidebar-box">
            <option value="" disabled selected>
              Filter By Platforms
            </option>
            <option value="All">All</option>
            {allPlatforms.map((i, index) => (
              <option key={index} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
          <select onChange={(e) => handleOrder(e)} className="sidebar-box">
            <option value="" disabled selected>
              Filter By Order Name
            </option>
            <option value="Asc">Asc [A-Z]</option>
            <option value="Desc">Desc [Z-A]</option>
          </select>
          <select
            onChange={(e) => handleSortByRating(e)}
            className="sidebar-box"
          >
            <option value="" disabled selected>
              Filter By Order Rating
            </option>
            <option value="Greater">Greater Rating</option>
            <option value="Lower">Lower Rating</option>
          </select>
          <br />
          <a onClick={(e) => deteleFilters(e)} className="btn-neonNH">
            <span id="span1"></span>
            <span id="span2"></span>
            <span id="span3"></span>
            <span id="span4"></span>
            Delete filters
          </a>
        </div>
        <Paginado
          videogamesPerPage={videogamesPerPage}
          allVideogames={allVideogames.length}
          paginado={paginado}
        />
        <div className="cards">
          {currentVideogames.length > 0 ? (
            currentVideogames.map((e) => {
              return (
                <Card
                  className="Card"
                  id={e.id}
                  key={e.id}
                  name={e.name}
                  image={e.image}
                  genreDb={e.createdAtDb ? e.genres : []}
                  genre={!e.createdAtDb ? e.genre : []}
                />
              );
            })
          ) : (
            <h1>loading</h1>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;

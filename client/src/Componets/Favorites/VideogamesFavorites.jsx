import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogamesFavs } from "../../Redux/Acctions/index.js";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
import Paginado from "../Paginado/Paginado.jsx";
import CardFavs from "../CardsFav/CardsFav.jsx";

//styles
import "../../Styles/VideogamesFavorites.css";

const VideogamesFavorites = () => {
  const videogamesFavorites = useSelector((state) => state.favorites);

  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPerPage] = useState(12);
  const indexOfLastVideogame = currentPage * videogamesPerPage;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage;
  const currentVideogames = videogamesFavorites.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllVideogamesFavs());
  }, [dispatch]);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // console.log(videogamesFavorites)
  return (
    <div>
      <Navbar />
      <div className="videogamesFavorites">
        <Paginado
          className="paginadoFavorites"
          videogamesPerPage={videogamesPerPage}
          allVideogames={videogamesFavorites.length}
          paginado={paginado}
        />
        <div className="cards">
          {currentVideogames.length > 0 ? (
            currentVideogames.map((e) => {
              return (
                <CardFavs
                  className="Card"
                  id={e.id}
                  key={e.id}
                  name={e.name}
                  image={e.image}
                  genreDb={e.videogameFav ? e.genres : []}
                />
              );
            })
          ) : (
            <h1>Loanding...</h1>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VideogamesFavorites;

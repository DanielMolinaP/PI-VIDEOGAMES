import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  detailVideogame,
  addFavorites,
  deleteVideogame,
} from "../../Redux/Acctions/index.js";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer.jsx";

//STYLES
import "../../Styles/VideogameDetail.css";

const VideogameDetail = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailVideogame(props.match.match.params.idVideogame));
  }, [props.match.match.params.idVideogame, dispatch]);

  const videogameDetail = useSelector((state) => state.detail);
  const [aux, setAux] = useState({
    deleteID: props.match.match.params.idVideogame,
  });

  // console.log(videogameDetail)

  const addFav = (e) => {
    e.preventDefault();
    const idParams = props.match.match.params.idVideogame;
    if (idParams.includes("-")) {
      const addToFavgenres = videogameDetail[0].genres.map((e) => {
        return e.name;
      });
      const addToFavplat = videogameDetail[0].platforms.map((e) => {
        return e.name;
      });
      const addToFavDb = {
        name: videogameDetail[0].name,
        image: videogameDetail[0].image,
        rating: videogameDetail[0].rating,
        description: videogameDetail[0].description,
        released: videogameDetail[0].released,
        genres: addToFavgenres,
        platforms: addToFavplat,
      };
      dispatch(addFavorites(addToFavDb));
      alert("videogame added to favorites successfully");
    } else {
      const addToFavApi = {
        name: videogameDetail[0].name,
        image: videogameDetail[0].image,
        rating: videogameDetail[0].rating,
        description: videogameDetail[0].description,
        released: videogameDetail[0].released,
        genres: videogameDetail[0].genres,
        platforms: videogameDetail[0].platforms,
      };
      // console.log(addToFavApi)
      dispatch(addFavorites(addToFavApi));
      alert("videogame added to favorites successfully");
    }
  };
  const deleteVideogamE = (e) => {
    e.preventDefault();
    dispatch(deleteVideogame(aux));
    alert("videogame was deleted");
  };

  return (
    <div className="Videogame_Detail">
      <Navbar />
      <div className="container">
        <div className="card">
          {videogameDetail.length > 0 ? (
            <div className="box">
              <div className="content">
                <h3>{videogameDetail[0].name}</h3>
                <img
                  src={videogameDetail[0].image}
                  alt="Not found"
                  className="Image"
                />
                <p className="generes">
                  Generes :
                  {!videogameDetail[0].createdAtDb
                    ? videogameDetail[0].genres.map((e) => {
                        return ` | ${e} | `;
                      })
                    : videogameDetail[0].genres.map((e) => {
                        return ` | ${e.name} | `;
                      })}
                </p>
                <p className="platform">
                  Platform :
                  {!videogameDetail[0].createdAtDb
                    ? videogameDetail[0].platforms.map((e) => {
                        return ` | ${e} | `;
                      })
                    : videogameDetail[0].platforms.map((e) => {
                        return ` | ${e.name} | `;
                      })}
                </p>
                <p className="released">
                  Released : {videogameDetail[0].released}
                </p>
                <p className="rating">Rating : {videogameDetail[0].rating}</p>
                <p>Description: {videogameDetail[0].description}</p>
                {videogameDetail[0].createdAtDb ? null : (
                  <p>
                    website:
                    <a href={videogameDetail[0].website} target="_blank">
                      {videogameDetail[0].website}
                    </a>
                  </p>
                )}
                <div>
                  <a onClick={(e) => addFav(e)}>Add to Favorites </a>
                </div>
                {videogameDetail[0].createdAtDb ? (
                  <div>
                    <a onClick={(e) => deleteVideogamE(e)}>Delete Videogame </a>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <h1 className="loadingGDT">Loading...</h1>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VideogameDetail;

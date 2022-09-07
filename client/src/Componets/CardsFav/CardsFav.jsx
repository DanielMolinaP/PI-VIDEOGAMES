import React, {useState } from "react";
import { useDispatch } from "react-redux";
import { deleteFavVideogame } from "../../Redux/Acctions/index.js";

//Styles
import "../../Styles/Card.css";

const CardFavs = ({ id, name, image, genreDb }) => {
  const dispatch = useDispatch();
  const [aux, setAux] = useState({ deleteId: id });

  const deleteFavs = (e) => {
    dispatch(deleteFavVideogame(aux));
    alert("videogame was deleted");
    e.reload();
  };

  return (
    <div>
      <div className="containerC">
        <div className="cardC">
          <div className="boxC">
            <div className="contentC">
              <img src={image} alt="imagen not found" className="Image" />
              <p>{name}</p>
              <p>
                Generes :
                {genreDb.map((e) => {
                  return ` | ${e.name} | `;
                })}
              </p>
              <a className="link" onClick={(e) => deleteFavs(e)}>
              Remove
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFavs;

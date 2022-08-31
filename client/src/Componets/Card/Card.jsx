import React from "react";
import "../../Styles/Card.css";

const Card = ({ id, name, image, genre, genreDb }) => {
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
                {genre.length > 0
                  ? genre.map((e) => {
                      return ` | ${e} | `;
                    })
                  : genreDb.map((e) => {
                      return ` | ${e.name} | `;
                    })}
              </p>
              <a className="link" href={`/videogameDetail/${id}`}>Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

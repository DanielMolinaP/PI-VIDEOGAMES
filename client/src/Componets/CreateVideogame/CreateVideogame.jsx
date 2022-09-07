import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllPlatforms,
  getAllGeneres,
  postVideogame,
} from "../../Redux/Acctions/index.js";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../Footer/Footer.jsx";
//styles
import "../../Styles/CreateVideogame.css";

const CreateVideogame = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    setErrors({
      name: "",
      released: "",
      description: "",
      rating: "",
      image: "",
      genre: [],
      platform: [],
    });
    dispatch(getAllPlatforms());
    dispatch(getAllGeneres());
  }, [dispatch]);
  const plat = useSelector((state) => state.platforms);
  const gen = useSelector((state) => state.genres);
  const [input, setInput] = useState({
    name: "",
    released: "",
    description: "",
    rating: "",
    image: "",
    genre: [],
    platform: [],
  });
  const [errors, setErrors] = useState({});
  function validate(input) {
    let errors = {};
    if (!input.name) {
      errors.name = "The name is required for created a videogame";
    }
    if (!input.released) {
      errors.released = "The released is requiere";
    }
    if (!input.description || input.description.length > 5000) {
      errors.description =
        "The description is requiere and less than 5000 characters ";
    }
    if (!input.rating || input.rating > 5 || input.rating < 0) {
      errors.rating = "Rating must be a number between 0.0 - 5.0";
    }
    if (!input.platform.length || input.platform.length > 5) {
      errors.platform = "The game requires at least one platform";
    }
    if (!input.genre.length) {
      errors.genre = "The game requires at least one genre";
    }
    if (!input.image || input.image.length > 300) {
      errors.image =
        "The url of image is required and it is length less than 300";
    }
    return errors;
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSelectPla(e) {
    setInput({
      ...input,
      platform: [...input.platform, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        platform: [...input.platform, e.target.value],
      })
    );
  }

  function handleSelectGen(e) {
    setInput({
      ...input,
      genre: [...input.genre, e.target.value],
    });
    setErrors(
      validate({
        ...input,
        genre: [...input.genre, e.target.value],
      })
    );
  }

  function handleDeletePlatforms(i) {
    setInput({
      ...input,
      platform: input.platform.filter((e) => e !== i),
    });
  }
  function handleDeleteGenres(i) {
    setInput({
      ...input,
      genre: input.genre.filter((e) => e !== i),
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(postVideogame(input));
    alert("videogame created successfully");
    setInput({
      name: "",
      released: "",
      description: "",
      rating: "",
      image: "",
      genre: [],
      platform: [],
    });
  }

  return (
    <div className="allCreate">
      <Navbar />
      <div className="superCard">
        <h1>Create Videogame</h1>
        <br />
        <div>
          <label>Nombre :</label>
          <input
            className="controls"
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
          {errors.hasOwnProperty("name") ? (
            <p className="error">{errors.name}</p>
          ) : null}
        </div>
        <div>
          <label>Released :</label>
          <input
            className="controls"
            type="date"
            value={input.released}
            name="released"
            onChange={(e) => handleChange(e)}
          />
          {errors.hasOwnProperty("released") ? (
            <p className="error">{errors.released}</p>
          ) : null}
        </div>
        <div>
          <label>Rating :</label>
          <input
            className="controls"
            type="number"
            value={input.rating}
            name="rating"
            onChange={(e) => handleChange(e)}
          />
          {errors.rating && <p className="error">{errors.rating}</p>}
        </div>
        <div>
          <label>Image :</label>
          <input
            className="controls"
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        {errors.hasOwnProperty("image") ? (
          <p className="error">{errors.image}</p>
        ) : null}
        <div>
          <label>Description :</label>
          <input
            className="controls"
            type="text"
            value={input.description}
            name="description"
            onChange={(e) => handleChange(e)}
          />
        </div>
        {errors.description && <p className="error">{errors.description}</p>}
        <div>
          Platforms:
          <select
            onChange={(e) => handleSelectPla(e)}
            className="sidebar-boxCREATE"
          >
            {plat.map((i, index) => (
              <option key={index} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
        {errors.platform && <p className="error">{errors.platform}</p>}
        <br />
        <div className="platform-genres">
          {input.platform.map((i, index) => (
            <div key={index} className="plat-gen-option">
              <button
                className="botonDelete"
                onClick={() => handleDeletePlatforms(i)}
              >
                x
              </button>
              <div>{i}</div>
            </div>
          ))}
        </div>
        <div>
          Genres:
          <select
            onChange={(e) => handleSelectGen(e)}
            className="sidebar-boxCREATE"
          >
            {gen.map((i, index) => (
              <option key={index} value={i.name}>
                {i.name}
              </option>
            ))}
          </select>
        </div>
        {errors.genre && <p className="error">{errors.genre}</p>}
        <br />
        <div className="platform-genres">
          {input.genre.map((i, index) => (
            <div key={index} className="plat-gen-option">
              <button
                className="botonDelete"
                onClick={() => handleDeleteGenres(i)}
              >
                x
              </button>
              <div>{i}</div>
            </div>
          ))}
        </div>
        <div className="botones">
          {Object.entries(errors).length > 0 ? (
            <button className="falso">Create Videogame</button>
          ) : (
            <button onClick={(e) => handleSubmit(e)} className="bueno">
              Create Videogame
            </button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateVideogame;

const axios = require("axios");
const { YOUR_API_KEY } = process.env;
const { Videogame, Genre, Platform, VideogameFav } = require("../db.js");

const getInfoApi = async () => {
  var gets = [1, 2, 3, 4].map(
    async (e) =>
      await axios.get(
        `https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page_size=25&page=${e}`
      )
  );
  let allGets = await Promise.all(gets);//Una Promise que se cumplirá cuando todas las promesas del argumento iterable hayan sido cumplidas, o bien se rechazará cuando alguna de ellas se rechace.
  let apiURL = allGets.reduce((prev, curr) => {
    return prev.concat(curr.data.results);
  }, []);//El método reduce ejecuta una función reductora sobre cada elemento de un array, devolviendo como resultado un único valor.

  const apiDATA = apiURL.map((el) => {
    return {
      id: el.id,
      name: el.name,
      image: el.background_image,
      rating: el.rating,
      released: el.released,
      genre: el.genres.map((el) => el.name),
      platform: el.platforms.map((el) => el.platform.name),
    };
  });
  return apiDATA;
};

const getInfoDb = async () => {
  return await Videogame.findAll({
    include: [
      {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Platform,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
};

const getVideogamesFavsDb = async () => {
  return await VideogameFav.findAll({
    include: [
      {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Platform,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
};

const getAllVideogames = async () => {
  const APIinfo = await getInfoApi();
  const DBinfo = await getInfoDb();
  const infoTotal = APIinfo.concat(DBinfo);
  return infoTotal;
};

module.exports = {
  getInfoApi,
  getInfoDb,
  getVideogamesFavsDb,
  getAllVideogames,
};

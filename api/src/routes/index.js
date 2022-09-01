const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require("axios");
const { Videogame, Genre, Platform, VideogameFav } = require("../db.js");
const { YOUR_API_KEY } = process.env;
const { getVideogamesFavsDb, getAllVideogames } = require("./utils");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/videogames", async (req, res) => {
  const { name } = req.query;
  let videogamesTotal = await getAllVideogames();
  if (name) {
    let videogameName = await videogamesTotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    ); //aqui traemos el personaje que en el juego incluya el nombre que se le pasan ej: http://localhost:3001/videogames?name=halo te traera a "Halo", "Halo infinite","Halo Wars" etc.
    videogameName.length
      ? res.status(200).send(videogameName)
      : res.status(404).send("Videogame not found.Sorry!");
  } else {
    res.status(200).send(videogamesTotal);
  }
});

router.get("/videogame/:idVideogame", async (req, res) => {
  // const { idVideogame } = req.params;
  // const allVideogames = await getAllVideogames();
  // if (idVideogame) {
  //   let videogameId = await allVideogames.filter((e) => e.id == idVideogame);
  //   videogameId.length
  //     ? res.status(200).json(videogameId)
  //     : res.status(404).send("Dog not found");
  // }

  // const { idVideogame } = req.params;
  // const videoGameUrl = await axios.get(
  //   `https://api.rawg.io/api/games/${idVideogame}?key=${YOUR_API_KEY}`
  // );
  // const array = [videoGameUrl.data]
  // if (idVideogame) {
  //   const videogameInfo = array.map((el) => {
  //     return {
  //       id: el.id,
  //       name: el.name,
  //       image: el.background_image,
  //       rating: el.rating,
  //       released: el.released,
  //       genres: el.genres.map((el) => el.name),
  //       platforms: el.platforms.map((el) => el.platform.name),
  //       description: el.description_raw,
  //     };
  //   });
  //   videogameInfo.length
  //     ? res.status(200).json(videogameInfo)
  //     : res.status(404).send("Dog not found");
  //}
  // const { idVideogame } = req.params;
  // const vamosss = getVideogameInfo(idVideogame);
  // res.send(vamosss);
  const { idVideogame } = req.params;
  if (!idVideogame.includes("-")) {
    const detail = await axios.get(
      `https://api.rawg.io/api/games/${idVideogame}?key=${YOUR_API_KEY}`
    );
    const dat = await detail.data;
    let formated = [
      {
        id: dat.id,
        name: dat.name,
        description: dat.description_raw,
        image: dat.background_image,
        released: dat.released,
        rating: dat.rating,
        genres: dat.genres.map((el) => el.name),
        platforms: dat.platforms.map((el) => el.platform.name),
        website: dat.website,
      },
    ];
    formated.length
      ? res.status(200).json(formated)
      : res.status(404).send("Did not find game by Id");
  } else {
    let gameFound = await Videogame.findByPk(idVideogame, {
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
    var arreglo = [];
    arreglo.push(gameFound);

    res.status(200).json(arreglo);
  }
});

router.get("/genres", async (req, res) => {
  const apiURL2 = await axios.get(
    `https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`
  );
  const apiGenre = await apiURL2.data.results.map((el) => el.name);
  const gene = apiGenre.toString().split(",");
  gene.forEach((el) => {
    Genre.findOrCreate({
      where: {
        name: el,
      },
    });
  });
  const allGenres = await Genre.findAll();
  res.status(200).send(allGenres);

  // const genresApi = await axios.get("http://localhost:3001/videogames");
  // const generes = genresApi.data.map((e) => e.genres);
  // const gene = generes.toString().split(",");
  // gene.forEach((el) => {
  //   Genre.findOrCreate({
  //     where: { name: el },
  //   });
  // });
  // const allGeneres = await Genre.findAll();
  // res.status(200).send(allGeneres);
});

router.get("/videogamesFavs", async (req, res) => {
  const { name } = req.query;
  let videogamesFavsTotal = await getVideogamesFavsDb();
  if (name) {
    let videogameFavName = await videogamesFavsTotal.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    ); //aqui traemos el personaje que en el juego incluya el nombre que se le pasan ej: http://localhost:3001/videogames?name=halo te traera a "Halo", "Halo infinite","Halo Wars" etc.
    videogameFavName.length
      ? res.status(200).send(videogameFavName)
      : res.status(404).send("Videogame Favorite not found.Sorry!");
  } else {
    res.status(200).send(videogamesFavsTotal);
  }
});

router.get("/platforms", async (req, res) => {
  const plataformApi = await axios.get("http://localhost:3001/videogames");
  const plataform = plataformApi.data.map((e) => e.platform);
  const plataf = plataform.toString().split(",");
  plataf.forEach((el) => {
    Platform.findOrCreate({
      where: { name: el },
    });
  });
  const allPlatforms = await Platform.findAll();
  res.status(200).send(allPlatforms);
});

router.post("/createvideogame", async (req, res) => {
  const { name, image, rating, description, released, platform, genre } =
    req.body;

  let videogameCreated = await Videogame.create({
    name,
    image,
    rating,
    description,
    released,
  });

  let createdGene = await Genre.findAll({
    where: {
      name: genre,
    },
  });

  let createdPlat = await Platform.findAll({
    where: {
      name: platform,
    },
  });
  videogameCreated.addGenre(createdGene);
  videogameCreated.addPlatform(createdPlat);
  res.send("Videogame created succesfuly");
});

router.post("/videogameDetail", async (req, res) => {
  const { name, image, rating, description, released, platforms, genres } =
    req.body;

  let videogameFavs = await VideogameFav.create({
    name,
    image,
    rating,
    description,
    released,
  });

  let favGene = await Genre.findAll({
    where: {
      name: genres,
    },
  });

  let favPlat = await Platform.findAll({
    where: {
      name: platforms,
    },
  });
  videogameFavs.addGenre(favGene);
  videogameFavs.addPlatform(favPlat);
  res.send("Videogame add favorites");
});

router.delete("/videogameFavorites", (req, res) => {
  const { deleteId } = req.body;
  VideogameFav.destroy({ where: { id: deleteId } })
    .then(() => {
      res.status(200).send("Removed Successfully");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send(err);
    });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const datos = req.body;
  try {
    Videogame.update(datos, { where: { id } });
    return res.send("change Successfully");
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;

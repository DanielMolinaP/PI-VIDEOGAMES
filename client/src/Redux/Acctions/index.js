import axios from 'axios'

export const GET_ALL_VIDEOGAMES = 'GET_ALL_VIDEOGAMES'
export const GET_ALL_VIDEOGAMESFAVS = 'GET_ALL_VIDEOGAMESFAVS'
export const GET_ALL_GENERES = 'GET_ALL_GENERES'
export const GET_ALL_PLATFORMS = 'GET_ALL_PLATFORMS'
export const GET_BY_NAME = 'GET_BY_NAME'
export const FILTER_BY_CREATED = 'FILTER_BY_CREATED'
export const FILTER_BY_GENRES = 'FILTER_BY_GENRES'
export const FILTER_BY_PLATFORMS = 'FILTER_BY_PLATFORMS'
export const FILTER_BY_SORT_NAME = 'FILTER_BY_SORT_NAME'
export const ORDER_BY_RATING = 'ORDER_BY_RATING'
export const VIDEOGAME_DETAIL = 'VIDEOGAME_DETAIL'
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME'
export const DELETE_FAV_VIDEOGAME = 'DELETE_FAV_VIDEOGAME'
export const ADD_FAVORITES = 'ADD_FAVORITES'
export const DELETE_VIDEOGAME = 'DELETE_VIDEOGAME'

export const getAllVideogames = () => {
  return function (dispatch) {
    axios
      .get('/videogames')
      .then((res) => res.data)
      .then((all) => dispatch({ type: GET_ALL_VIDEOGAMES, payload: all }))
  }

  // return async function (dispatch) {
  //   const response = await axios
  //     .get("http://localhost:3001/videogames")
  //     .then((res) => res.data);
  //   dispatch({
  //     type: GET_ALL_VIDEOGAMES,
  //     payload: response,
  //   });
  // };
}

export const getAllVideogamesFavs = () => {
  return function (dispatch) {
    axios
      .get('/videogamesFavs')
      .then((res) => res.data)
      .then((allFavs) =>
        dispatch({ type: GET_ALL_VIDEOGAMESFAVS, payload: allFavs }),
      )
  }

  // return async function (dispatch) {
  //   const response = await axios
  //     .get("http://localhost:3001/videogamesFavs")
  //     .then((res) => res.data);
  //   dispatch({
  //     type: GET_ALL_VIDEOGAMESFAVS,
  //     payload: response,
  //   });
  // };
}

export const getAllGeneres = () => {
  return function (dispatch) {
    axios
      .get('/genres')
      .then((res) => res.data)
      .then((allGeneres) =>
        dispatch({ type: GET_ALL_GENERES, payload: allGeneres }),
      )
  }

  // return async function (dispatch) {
  //   const response = await axios
  //     .get("http://localhost:3001/genres")
  //     .then((res) => res.data);
  //   dispatch({
  //     type: GET_ALL_GENERES,
  //     payload: response,
  //   });
  // };
}

export const getAllPlatforms = () => {
  return function (dispatch) {
    axios
      .get('/platforms')
      .then((res) => res.data)
      .then((allPlatforms) =>
        dispatch({ type: GET_ALL_PLATFORMS, payload: allPlatforms }),
      )
  }

  // return async function (dispatch) {
  //   const response = await axios.get("http://localhost:3001/platforms");
  //   dispatch({
  //     type: GET_ALL_PLATFORMS,
  //     payload: response.data,
  //   });
  // };
}

export const getVideogameByName = (name) => {
  return function (dispatch) {
    axios
      .get(`/videogames?name=${name}`)
      .then((res) => res.data)
      .then((videogameByName) =>
        dispatch({ type: GET_BY_NAME, payload: videogameByName }),
      )
  }

  // return async function (dispatch) {
  //   try {
  //     let response = await axios
  //       .get(`http://localhost:3001/videogames?name=${name}`)
  //       .then((res) => res.data);
  //     return dispatch({
  //       type: GET_BY_NAME,
  //       payload: response,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // return async function (dispatch) {
  //   try {
  //     let json = await axios("http://localhost:3001/videogames?name=" + name);
  //     return dispatch({
  //       type: "GET_NAME",
  //       payload: json.data,
  //     });
  //   } catch (error) {
  //     alert("Juego No Encontrado");
  //     console.log(error);
  //   }
  // };
}

export const getByCreated = (payload) => {
  return {
    type: FILTER_BY_CREATED,
    payload,
  }
}

export const getByGenres = (payload) => {
  return {
    type: FILTER_BY_GENRES,
    payload,
  }
}

export const getByPlatforms = (payload) => {
  return {
    type: FILTER_BY_PLATFORMS,
    payload,
  }
}

export const sortByName = (payload) => {
  return {
    type: FILTER_BY_SORT_NAME,
    payload,
  }
}

export function sortByRating(payload) {
  return {
    type: ORDER_BY_RATING,
    payload,
  }
}

export function addFavorites(payload) {
  return async function (dispatch) {
    const post = await axios.post('/videogameDetail', payload)
    return dispatch({
      type: ADD_FAVORITES,
      payload: post,
    })
  }
}

export function detailVideogame(idVideogame) {
  return async function (dispatch) {
    try {
      const res = await axios.get(`/videogame/${idVideogame}`)
      return dispatch({
        type: VIDEOGAME_DETAIL,
        payload: res.data,
      })
    } catch (err) {
      console.log(err)
    }
  }
}

export function postVideogame(payload) {
  return async function (dispatch) {
    const post = await axios.post('/createvideogame', payload)
    return dispatch({
      type: CREATE_VIDEOGAME,
      payload: post,
    })
  }
}
export function deleteFavVideogame(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.delete('/videogameFavorites', {
        data: payload,
      })
      return dispatch({
        type: DELETE_FAV_VIDEOGAME,
        payload: response,
      })
    } catch (error) {
      console.log(error)
    }

    // const deletE = await axios.delete(
    //   "http://localhost:3001/videogameFavorites",
    //   payload
    // );
    // return dispatch({
    //   type: DELETE_FAV_VIDEOGAME,
    //   payload: deletE,
    // });
  }
}

export function deleteVideogame(payload) {
  return async function (dispatch) {
    try {
      const response = await axios.delete('/videogameDetail', { data: payload })
      return dispatch({
        type: DELETE_VIDEOGAME,
        payload: response,
      })
    } catch (error) {
      console.log(error)
    }

    // const deletE = await axios.delete(
    //   "http://localhost:3001/videogameFavorites",
    //   payload
    // );
    // return dispatch({
    //   type: DELETE_FAV_VIDEOGAME,
    //   payload: deletE,
    // });
  }
}

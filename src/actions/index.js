import axios from 'axios';
import { 
  GET_VIDEOGAMES, 
  GET_GENRES,
  GET_PLATFORMS,
  GET_VIDEOGAME_BY_NAME, 
  GET_VIDEOGAME_BY_Id, 
  FILTER_BY_STATUS,  
  FILTER_BY_GENRES,
  ORDER_ALPHABETICALLY,
  ORDER_BY_RATING,
  LOADING
} from '../actions-types/types';

export function getVideogames() {

  return async function(dispatch) {
    dispatch({type: LOADING});
    let res = await axios.get('http://localhost:3001/videogames');
    return dispatch({
      type : GET_VIDEOGAMES,
      payload: res.data
    });
  }
}

export function getByName(name) {
  return async function(dispatch) {
    
    try {
      dispatch({type: LOADING});
      let res = await axios.get(`http://localhost:3001/videogames?name=${name}`);
      return dispatch({
        type : GET_VIDEOGAME_BY_NAME,
        payload: res.data
      });
    } catch (error) {
      console.log(error)
    }
  }
}

export function getById(id) {
  return async function(dispatch) {
    try {
      let res = await axios.get(`http://localhost:3001/videogames/${id}`);
      return dispatch({
        type: GET_VIDEOGAME_BY_Id,
        payload: res.data
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export function getGenres() {
  return async function(dispatch) {
    let res = await axios.get('http://localhost:3001/genres');
    return dispatch({
      type: GET_GENRES,
      payload: res.data
    });
  }
}

export function getPlatforms() {
  return async function(dispatch) {
    let res = await axios.get('http://localhost:3001/platforms');
    return dispatch({
      type: GET_PLATFORMS,
      payload: res.data
    })
  }
}

export function postVideogame(payload) {
  return async function(dispatch) {
    let res = await axios.post('http://localhost:3001/videogames', payload);
    return res;
  }
}

//Ordenamiento y Filtrado

export function filterByStatus(payload) {
  return {
    type: FILTER_BY_STATUS,
    payload
  }
}

export function filterByGenres(payload) {
  return {
    type: FILTER_BY_GENRES,
    payload
  }
}

export function orderAlphabetically(payload) {
  return {
    type: ORDER_ALPHABETICALLY,
    payload
  }
}

export function orderByRating(payload) {
  return {
    type: ORDER_BY_RATING,
    payload
  }
}
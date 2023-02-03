import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, getPlatforms } from "../actions";
import cg from "./CreateGame.module.css";

const formValidate = (form) => { 
  let errors = {};

  if(!form.name.length) errors.name = "Sorry!, name is required";
  if(!/^[a-zA-Z\s]*$/.test(form.name)){errors.name = "Pleace, enter only letters";}
  if(!form.description) errors.description = "Sorry!, description is required";
  if(!/^[a-zA-Z0-9][a-zA-Z0-9]+\s[a-zA-Z0-9]+\s[a-zA-Z0-9]+/.test(form.description)){errors.description = "Write minimum three words"}
  if(!/^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/.test(form.image)){errors.image = "Incorrect url format"}
  if(/^(?:0?[1-9]|1[1-2])([-/.])(3[01]|[12][0-9]|0?[1-9])\1\d{4}$/.test(form.released)){errors.released = "Incorrect date format"};
  if(form.rating < 0 || form.rating > 10) errors.rating = "Sorry!, enter a number from 0 to 10";
  if(!form.platforms.length) errors.platforms = "Sorry!, platforms is required";
  if(!form.genre.length) errors.genre = "Sorry!, genre is required";
  console.log(errors)
  return errors;
}

export default function CreateGame() {
  const dispatch = useDispatch();
  const history = useHistory();
  console.log(history);
  const platforms = useSelector(state => state.platforms);
  const genres = useSelector(state => state.genres);

  const [ form, setForm ] = useState({
    name: '',
    description: '',
    released: '',
    rating: '',
    platforms: [],
    genre: []
  });

  const [ errors, setErrors ] = useState({
    
  });
  
  const handleChangeInputs = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

    setErrors(formValidate({
      ...form,
      [e.target.name]: e.target.value
    }))

    console.log(form)
  }

  const handlePlatforms = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      platforms: [...form.platforms, e.target.value]
    })
    setErrors(formValidate({
      ...form,
      [e.target.name]: e.target.value
    }))
    console.log(form)
  }

  const handleGenres = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      genre: [...form.genre, e.target.value]
    })
    setErrors(formValidate({
      ...form,
      [e.target.name]: e.target.value
    }))
    console.log(form)
  }

  const handleDeletePlatforms = (e) => {
    setForm({
      ...form, 
      platforms : form.platforms.filter(platf => platf !== e)
    })
  }

  const handleDeleteGenres = (e) => {
    setForm({
      ...form, 
      genre : form.genre.filter(gnr => gnr !== e)
    })
   }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(errors.length) return alert('Faltan campos por completar');
    dispatch(postVideogame(form));
    alert('Videogame Created  Successfully')
    setForm({
      name: '',
      description: '',
      image: '',
      released: '',
      rating: '',
      platforms: [],
      genre: []
    })
    history.push('/home');
  }

  useEffect(() => {
    dispatch(getPlatforms());
    dispatch(getGenres());
  },[dispatch]);

  return (
    <div className={cg.container}>
      <h1 className={cg.title}>Create your own videogame</h1>
      <Link to='/home'>
        <button type="button" className={cg.btnBack}>Back to Home</button>
      </Link>
      <form className={cg.containerForm} onSubmit={(e) => handleSubmit(e) } >


        <div className={cg.containerInput}>
          <label>Name:</label>
          <input type='text' placeholder='Type name of videogame' value={form.name} name= 'name' onChange={ (e) => handleChangeInputs(e) }/>
          {
            errors.name && (<span className={cg.spanError}>{errors.name}</span>)
          }
        </div>
        <div className={cg.containerInput}>
          <label>Description:</label>
          <input type='text' placeholder='Type description...' value={form.description} name= 'description' onChange={ (e) => handleChangeInputs(e) }/>
          {
            errors.description && (<span className={cg.spanError}>{errors.description}</span>)
          }
        </div>
        <div className={cg.containerInput}>
          <label>Image Url:</label>
          <input type='text' placeholder='Type Url...' name= 'image' onChange={ (e) => handleChangeInputs(e) }/>
          {
            errors.image && (<span className={cg.spanError}>{errors.image}</span>)
          }
        </div>
        <div className={cg.containerInput}>
          <label>Released:</label>
          <input type='text' placeholder='2022-11-13' value={form.released} name= 'released' onChange={ (e) => handleChangeInputs(e) }/>
          {
            errors.released && (<span className={cg.spanError}>{errors.released}</span>)
          }
        </div>
        <div className={cg.containerInput}>
          <label>Rating:</label>
          <input type='number' step='0.1' placeholder='Type rating...' value={form.rating} name= 'rating' onChange={ (e) => handleChangeInputs(e) }/>
          {
            errors.rating && (<span className={cg.spanError}>{errors.rating}</span>)
          }
        </div>
        <div className={cg.containerInput}>
          <label>Platforms:</label>
          <select name='platforms' onChange={ (e) => handlePlatforms(e)}>
            <option value='' >Select Platforms</option>
            {
              platforms.map( platf => (
                <option value={platf} key={platf} >{platf}</option>
              ))
            }
          </select>
          {
            errors.platforms && (<span className={cg.spanError}>{errors.platforms}</span>)
          }
          <div className={cg.containerSelected}>
            <ul>
              {
                form.platforms.map((platf, i) => (
                  <div className={cg.option} key={i}>
                    <li name={platf} value={i+1}>{platf}</li>
                    <button type="button" onClick={ () => handleDeletePlatforms(platf)}>X</button>
                  </div>
                ))
              }
            </ul>
          </div>
        </div>
        <div className={cg.containerInput}>
          <label>Genres:</label>
          <select name="genres" onChange={ (e) => handleGenres(e) }>
            <option value='' >Select Genres</option>
            {
              genres.map(gnr => (
                <option value={gnr.name} key={gnr.name} >{gnr.name}</option>
              ))
            }
          </select>
          {
            errors.genre && (<span className={cg.spanError}>{errors.genre}</span>)
          }
          < div className={cg.containerSelected}>
            <ul>
              {
                form.genre.map((gnr, i) => (
                  <div className={cg.option} key={i}>
                    <li>{gnr}</li>
                    <button type="button" onClick={ () => handleDeleteGenres(gnr)}>X</button>
                  </div>
                ))
              }
            </ul>
          </div>
        </div>
        <button  className={cg.btnSubmit} type="submit">Create Videogame</button>
      </form>
    </div>
  )
}
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getById } from "../actions";
import dt from "./Details.module.css";

export default function  Details(props) {
  console.log('pr', props)

  // let id = props.match.params.id;

  const dispatch = useDispatch();
  const details = useSelector(state => state.details);
  console.log('dt', details)

  useEffect(() => {
    dispatch(getById(props.match.params.id));
  },[dispatch, props.match.params.id]);

  return (
    <div className={dt.container}>
      <h1 className={dt.title} >Videogame Details</h1>
      <Link to='/home'>
        <button className={dt.btnBack} type="button" >Back to Home</button>
      </Link>

      {
        Object.entries(details).length ?
        <div className={dt.containerCard} >
          <div className={dt.containerCardDiv}>
              <img src={details.image} alt={details.name} height='400px'></img>
          </div>
          <div className={dt.containerCardDiv}>
              <h1>{details.name}</h1>
              <p><span>Description:</span> {details.description}</p>
              <div>
                <h3><span>Released at:</span> {details.released}</h3>
                <h3><span>Rating:</span> {details.rating}</h3>
                <h3><span>Platforms:</span> { details.platforms.join(' - ')}   </h3>
                <h3><span>Genres:</span> { !isNaN(details.id) ? details.genres.join(' - ') : details.Genres.map(el => el.name).join(' - ') }</h3>
              </div>
          </div>
        </div> :
        <div className={dt.loading}>
          <div className={`${dt.loadingSkeleton} ${dt.titleSkeleton}`}></div>
          <div className={`${dt.loadingSkeleton} ${dt.descriptionSkeleton}`}></div>
        </div>
      }
    </div>
  )
}
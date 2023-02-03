import React from "react";
import s from './Card.module.css';

export default function Card({ name, genres, image }){
  return (
    <div className={s.box}>
        <div className={s.card}>
          <div className={s.imgBx}>
              <img src={image}  alt={`${name}`}/>
          </div>
          <div className={s.details}>
            <h2>{name
            }<br/>
            <span>{genres}</span>
            </h2>
          </div>
        </div>
    </div>

  )
}
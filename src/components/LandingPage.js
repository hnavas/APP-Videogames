import React from 'react';
import { Link } from 'react-router-dom';
import l from './LandingPage.module.css'

export default function LandingPage() {
  return (
    <div className={l.container} >
      <h1>Welcome To Videogames Page</h1>
      <Link to='/home'> 
        <button className={l.btnHome}>Home</button>
      </Link>
    </div>
  )
}
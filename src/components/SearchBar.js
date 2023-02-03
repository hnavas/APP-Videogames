import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../actions";
import sc from "./SearchBar.module.css";

export default function SearchBar({setActualPage}) {
  const dispatch = useDispatch();
  const [ name, setName ] = useState('');

  let handleInputSearch = (e) => {
    e.preventDefault();
    setName(e.target.value);
  }

  let handleSubmit = (e) => {
    e.preventDefault()
    if(name.length) {
      dispatch(getByName(name))
    }else {
      alert("Write minumum one word");
    }
    setName('')
    setActualPage(1);
  }

  return (
    <div className={sc.container}>
      <input type='text' className={sc.input} autoComplete='off' value={name} placeholder="Search by Name" onChange={ (e) => handleInputSearch(e) }></input>
      <button type="submit" className={sc.button} onClick={ (e) => handleSubmit(e) }>Search</button>
    </div>
  )
}
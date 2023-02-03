import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.js';
import CreateGame from './components/CreateGame.js';
import Details from './components/Details.js';
import Home from './components/Home.js';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={LandingPage}/>
        <Route exact path="/home" component={Home}/>
        <Route exact path="/create" component={CreateGame}/>
        <Route exact path="/home/:id" component={Details}/>
      </div>
    </BrowserRouter>
  );
}

export default App;

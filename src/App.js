import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import SinglePokemonPage from './pages/singlePokemonPage';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path=":name" element={<SinglePokemonPage />}></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path=":name"></Route>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

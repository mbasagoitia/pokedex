import React, { useState, useEffect } from "react";
import { BrowserRouter, NavLink, Link, useParams, useLocation } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';


const API_URL = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";

function SinglePokemonPage () {
    const [singlePokemon, setSinglePokemon] = useState("");
    const [hasLoaded, setHasLoaded] = useState(false);
    const [prevEvolution, setPrevEvolution] = useState("");
    const [nextEvolution, setNextEvolution] = useState("");
    const { name } = useParams();


    function fetchPokemon () {
        fetch(API_URL)
        .then((res) => res.json())
        .then((data) => {
            let pokemonArr = (data.pokemon.filter((obj) => obj.name === name));
            setSinglePokemon(pokemonArr[0]);
            setHasLoaded(true);
            console.log(singlePokemon);
        })
        .catch((err) => console.error(err));
      }

      const location = useLocation();

      useEffect(() => {
        fetchPokemon();
      }, [location.key]);
  
      useEffect(() => {
        const previousEvolutionDiv = document.querySelector(".prev-evolution");
        const nextEvolutionDiv = document.querySelector(".next-evolution");

        if (singlePokemon.hasOwnProperty("prev_evolution")) {
          previousEvolutionDiv.classList.remove("not-visible");
          setPrevEvolution(singlePokemon.prev_evolution[singlePokemon.prev_evolution.length-1].name);
        }
  
        if (singlePokemon.hasOwnProperty("next_evolution")) {
          nextEvolutionDiv.classList.remove("not-visible");
          setNextEvolution(singlePokemon.next_evolution[0].name);
        }
      }, [location.key, singlePokemon])

      if (!hasLoaded) {
          return <p>Loading...</p>
      }

      return (
        <div style={{background: "linear-gradient(to bottom right, #0A285F, #0075BE)", textAlign: "center", display: "flex", flexWrap: "wrap", justifyContent: "space-evenly", alignItems: "center", minHeight: "100vh"}}>
          <NavLink to="/" className="home-btn">
              <i className="fa-solid fa-arrow-left"></i>
              <span className="home-btn-text"> Back to Pokedex</span>
            </NavLink>
          <div className="main-content-wrapper">
          <div className="arrow-group prev-evolution not-visible">
            <NavLink to={`/${prevEvolution}`} className="arrow-container" style={({ isActive }) => ({
                        color: isActive ? "transparent" : "#FFCC00",
                        textDecoration: "none",
                    })}>
              <i className="fa-solid fa-arrow-left arrow left"></i>
              <span className="previous-evolution-text">Previous Evolution</span>
            </NavLink>
          </div>
          <div id="img-title-wrapper">
            <img id="single-pokemon-img" src={singlePokemon.img} alt={`${singlePokemon.name}`}></img>
            <h1 id="single-pokemon-title">{singlePokemon.name}</h1>
          </div>
          <div className="arrow-group next-evolution not-visible">
            <NavLink to={`/${nextEvolution}`} className="arrow-container" style={({ isActive }) => ({
                          color: isActive ? "transparent" : "#FFCC00",
                          textDecoration: "none",
                      })}>
              <i className="fa-solid fa-arrow-right arrow right"></i>
              <span className="previous-evolution-text">Next Evolution</span>
            </NavLink>
          </div>
          </div>
          <div className="table-wrapper">
            <table id="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Height</th>
                  <th>Weight</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{singlePokemon.id}</td>
                  <td>{singlePokemon.height}</td>
                  <td>{singlePokemon.weight}</td>
                  <td>{singlePokemon.type.join(", ")}</td>
                </tr>
              </tbody>
              <thead>
                <tr>
                <th>Weaknesses</th>
                <th>Candy</th>
                <th>Eggs</th>
                <th>Spawn Chance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                <td>{singlePokemon.weaknesses.join(", ")}</td>
                <td>{singlePokemon.candy}</td>
                <td>{singlePokemon.egg}</td>
                <td>{singlePokemon.spawn_chance}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )
}

export default SinglePokemonPage;
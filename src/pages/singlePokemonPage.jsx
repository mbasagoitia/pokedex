import React, { useState, useEffect } from "react";
import { BrowserRouter, NavLink, Link, useParams } from "react-router-dom";
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
        })
        .catch((err) => console.error(err));
      }
    
      useEffect(() => {
        fetchPokemon();
      }, []);
  
      useEffect(() => {
        if (singlePokemon.hasOwnProperty("prev_evolution")) {
          setPrevEvolution(singlePokemon.prev_evolution[singlePokemon.prev_evolution.length-1].name);
        }
  
        if (singlePokemon.hasOwnProperty("next_evolution")) {
          setNextEvolution(singlePokemon.next_evolution[0].name);
        }
      }, [singlePokemon])

      if (!hasLoaded) {
          return <p>Loading...</p>
      }

      return (
        <div style={{textAlign: "center", display: "flex", justifyContent: "space-evenly", alignItems: "center", minHeight: "100vh"}}>
          <div className="arrow-group prev-evolution">
            <NavLink to={`/${prevEvolution}`}>
              <i className="fa-solid fa-arrow-left arrow left"></i>
              <span className="previous-evolution-text">{prevEvolution}</span>
            </NavLink>
          </div>
          <div id="img-title-wrapper">
            <img id="single-pokemon-img" src={singlePokemon.img} alt={`Image of ${singlePokemon.name}`}></img>
            <h1 id="single-pokemon-title">{singlePokemon.name}</h1>
          </div>
          <div className="arrow-group next-evolution">
          <NavLink to={`/${nextEvolution}`}>
            <i className="fa-solid fa-arrow-right arrow right"></i>
            <span className="previous-evolution-text">{nextEvolution}</span>
          </NavLink>
          </div>
        </div>
      )
}

export default SinglePokemonPage;
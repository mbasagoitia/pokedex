import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';


const API_URL = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";

function SinglePokemonPage () {
    const [singlePokemon, setSinglePokemon] = useState("");
    const [hasLoaded, setHasLoaded] = useState(false);
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
  
      if (!hasLoaded) {
          return <p>Loading...</p>
      }

      let previousEvolution = "";
      let nextEvolution = "";


      //i think this needs to be controlled by state
      
      if (singlePokemon.hasOwnProperty("prev_evolution")) {
        previousEvolution = singlePokemon.prev_evolution[singlePokemon.prev_evolution.length-1].name;
      } else {
        document.querySelector(".prev-evolution").classList.add("not-visible");
      }

      if (singlePokemon.hasOwnProperty("next_evolution")) {
        nextEvolution = singlePokemon.next_evolution[0].name;
      } else {
        document.querySelector(".next-evolution").classList.add("not-visible");
      }


      return (
        <div style={{textAlign: "center", display: "flex", justifyContent: "space-evenly", alignItems: "center", minHeight: "100vh"}}>
          <div className="arrow-group prev-evolution">
            <i className="fa-solid fa-arrow-left arrow left"></i>
            <span className="previous-evolution-text">{previousEvolution}</span>
          </div>
          <div id="img-title-wrapper">
            {console.log(singlePokemon)};
            <img id="single-pokemon-img" src={singlePokemon.img} alt={`Image of ${singlePokemon.name}`}></img>
            <h1 id="single-pokemon-title">{singlePokemon.name}</h1>
          </div>
          <div className="arrow-group next-evolution">
            <i className="fa-solid fa-arrow-right arrow right"></i>
            <span className="previous-evolution-text">{nextEvolution}</span>
          </div>
        </div>
      )
}

export default SinglePokemonPage;
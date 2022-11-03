import React, { useState, useEffect } from "react";
import DisplayCard from "../components/DisplayCard";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
const API_URL = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";


function Homepage () {
    const [pokemonList, setPokemonList] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
  
    function fetchPokemon () {
      fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data.pokemon);
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

    return (
        <>
        <header>
          <h1>Pokedex</h1>
          <Filter />
          <Filter />
          <SearchBar />
        </header>
            <ul id="pokemon-list">
            {pokemonList.map((pokemon) => <li key={pokemon.id}><DisplayCard num={pokemon.num} name={pokemon.name} src={pokemon.img} type={pokemon.type.join(", ")} weaknesses={`Weaknesses: ${pokemon.weaknesses.join(", ")}`}/></li>)}
            </ul>
        </>
    )
}

export default Homepage;
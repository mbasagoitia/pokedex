import React, { useState, useEffect } from "react";
import DisplayCard from "../components/DisplayCard";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import { filterListByProps, filterListByName } from "../helperFunctions";
const API_URL = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";


function Homepage () {
    const [pokemonList, setPokemonList] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [filteredList, setFilteredList] = useState([]);

    function fetchPokemon () {
      fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data.pokemon);
        setFilteredList(data.pokemon);
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

    const filterType = document.querySelector(`#filter-type`);
    const filterWeakness = document.querySelector(`#filter-weaknesses`);

    function handlechangeType (e) {
      let filterValue = e.target.value;
      setFilteredList(filterListByProps(pokemonList, "type", "weaknesses", filterValue, filterWeakness.value));
    }

    function handlechangeWeakness (e) {
      let weaknessValue = e.target.value;
      setFilteredList(filterListByProps(pokemonList, "type", "weaknesses", filterType.value, weaknessValue));
    }

    function filterByName (e) {
      setFilteredList(filterListByName(pokemonList, e.target.value));
    }

    if (filteredList.length === 0) {
      return (
        <>
        <header>
          <h1 id="main-title">Pokedex</h1>
          <div className="filter-header-wrapper">
            <SearchBar handlechange={filterByName}/>
            <Filter list={pokemonList} prop="type" handlechange={handlechangeType}/>
            <Filter list={pokemonList} prop="weaknesses" handlechange={handlechangeWeakness}/>
          </div>
        </header>
          <div className="none-found">
            No Pokemon fit this search criteria
          </div>
        </>
    )
      
    }

    return (
        <>
        <header>
          <h1 id="main-title">Pokedex</h1>
          <div className="filter-header-wrapper">
            <SearchBar handlechange={filterByName}/>
            <Filter list={pokemonList} prop="type" handlechange={handlechangeType}/>
            <Filter list={pokemonList} prop="weaknesses" handlechange={handlechangeWeakness}/>
          </div>
        </header>
          <ul id="pokemon-list">
            {filteredList.map((pokemon) => <li key={pokemon.id}><DisplayCard num={pokemon.num} name={pokemon.name} src={pokemon.img} type={pokemon.type.join(", ")} weaknesses={`Weaknesses: ${pokemon.weaknesses.join(", ")}`}/></li>)}
          </ul>       
        </>
    )
}

export default Homepage;
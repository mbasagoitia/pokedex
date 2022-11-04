import React, { useState, useEffect } from "react";
import DisplayCard from "../components/DisplayCard";
import Filter from "../components/Filter";
import SearchBar from "../components/SearchBar";
import { filterListByProps } from "../helperFunctions";
const API_URL = "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json";


function Homepage () {
    const [pokemonList, setPokemonList] = useState([]);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [filteredList, setFilteredList] = useState([]);
    const [typeHasBeenChanged, setTypeHasBeenChanged] = useState(false);
    const [weaknessHasBeenChanged, setWeaknessHasBeenChanged] = useState(false);
  
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


    //add logic for both to work here
    const filterType = document.querySelector(`#filter-type`);
    const filterWeakness = document.querySelector(`#filter-weaknesses`);
    //Need to add logic for when one of the values is
    function handlechangeType (e) {
      let filterValue = e.target.value;
      setFilteredList(filterListByProps(pokemonList, "type", "weaknesses", filterValue, filterWeakness.value));
    }
    function handlechangeWeakness (e) {
      let weaknessValue = e.target.value;
      setFilteredList(filterListByProps(pokemonList, "type", "weaknesses", filterType.value, weaknessValue));
    }

    return (
        <>
        <header>
          <h1>Pokedex</h1>
          <Filter masterList={pokemonList} list={filteredList} prop="type" handlechange={handlechangeType}/>
          <Filter masterList={pokemonList} list={filteredList} prop="weaknesses" handlechange={handlechangeWeakness}/>
          <SearchBar />
        </header>
            <ul id="pokemon-list">
            {filteredList.map((pokemon) => <li key={pokemon.id}><DisplayCard num={pokemon.num} name={pokemon.name} src={pokemon.img} type={pokemon.type.join(", ")} weaknesses={`Weaknesses: ${pokemon.weaknesses.join(", ")}`}/></li>)}
            </ul>
        </>
    )
}

export default Homepage;
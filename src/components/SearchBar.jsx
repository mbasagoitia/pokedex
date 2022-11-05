import React from "react";

function SearchBar ({ handlechange }) {
    return (
        <div id="search-bar-wrapper">
            <label htmlFor="search-bar" className="hidden">Search for Pokemon by name</label>
            <input id="search-bar" type="search" placeholder="Search for Pokemon by name..." onChange={handlechange}/>
        </div>
    )
}

export default SearchBar;
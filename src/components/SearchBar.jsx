import React from "react";

function SearchBar (props) {
    return (
        <div id="search-bar-wrapper">
            <label htmlFor="search-bar" className="hidden">Search for Pokemon by name</label>
            <input id="search-bar" type="search" placeholder="Search for Pokemon by name..."/>
        </div>
    )
}

export default SearchBar;
import React from "react";

function Filter (props) {
    return (
        <div id="filter-wrapper">
            <label htmlFor={`filter-${props.type}`}></label>
            <select name={`filter-${props.type}`} id={`filter-${props.type}`}>

            </select>
        </div>
    )
}

export default Filter;
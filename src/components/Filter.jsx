import React, { useState, useEffect } from "react";
import { setChoicesList } from "../helperFunctions";

function Filter ({list, prop, handlechange }) {

    const [property, setProperty] = useState("default");

    const choicesList = setChoicesList(list, prop);

    //eventually remove the event listener during cleanup (unmount)
    useEffect(() => {
        let filter = document.querySelector(`#filter-${prop}`);
        filter.addEventListener("change", (e) => setProperty(e.target.value));
    }, [prop])

    return (
        <div id="filter-wrapper">
            <label htmlFor={`filter-${prop}`}>Filter by {prop}</label>
            <select name={`filter-${prop}`} id={`filter-${prop}`} className="filter" value={property} onChange={handlechange}>
                <option value="all">All</option>
                {choicesList.map((item, idx) => <option key={item+idx} value={item}>{item}</option>)}
            </select>
        </div>
    )
}

export default Filter;
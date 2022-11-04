import React, { useState, useEffect } from "react";
import { setChoicesList } from "../helperFunctions";
import { filterListByProp } from "../helperFunctions";

function Filter ({masterList, list, prop, handlechange }) {

    const [property, setProperty] = useState("default");

    const choicesList = setChoicesList(masterList, prop);

    //eventually remove the event listener during cleanup (unmount)
    useEffect(() => {
        let filter = document.querySelector(`#filter-${prop}`);
        filter.addEventListener("change", (e) => setProperty(e.target.value));
    }, [])

    return (
        <div id="filter-wrapper">
            <label htmlFor={`filter-${prop}`}></label>
            <select name={`filter-${prop}`} id={`filter-${prop}`} className="filter" value={property} onChange={handlechange}>
                <option value="default" disabled>Filter by {prop}</option>
                {choicesList.map((item, idx) => <option key={item+idx} value={item}>{item}</option>)}
            </select>
        </div>
    )
}

export default Filter;
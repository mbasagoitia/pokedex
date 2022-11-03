import React from "react";
import { NavLink } from "react-router-dom";

function DisplayCard ({ name, num, src, type, weaknesses }) {
    return (
        <div className="card">
            <div className="content-wrapper">
                <img className="poke-img" src={src} alt={name} />
                <div className="info">
                    <span className="num">{num}</span>
                    <span className="poke-link"><NavLink to={`${name}`} style={({ isActive }) => ({
                        color: isActive ? "#D5A100" : "#FFCC00",
                        textDecoration: "none",
                    })}>{name}</NavLink></span>
                    <span className="type">{type}</span>
                    <br></br>
                    <span className="weaknesses">{weaknesses}</span>
                </div>
            </div>
        </div>
    )
}

export default DisplayCard;
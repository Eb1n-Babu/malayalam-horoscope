import React from "react";
import "./HoroscopeCard.css";

function HoroscopeCard({ malayalamSign, description }) {
    return (
        <div className="card">
            <h2>{malayalamSign}</h2>
            <p>{description}</p>
        </div>
    );
}

export default HoroscopeCard;
import React from "react";

const Filters = (props) => {
    return (
        <div>
            <select className="filter" name="airline" id="airline-select" onChange={props.setAirline}>
                <option value="all">All Airlines</option>
                {props.airlines.map(airline => <option key={airline} value={airline}>{airline}</option>)}
            </select>
            <select className="filter" name="origin" id="origin-select" onChange={props.setOrigin}>
                <option value="all">All Airports</option>
                {props.airports.map(airport => <option key={airport} value={airport}>{airport}</option>)}
            </select>
            <select className="filter" name="origin" id="origin-select" onChange={props.setDestination}>
                <option value="all">All Airports</option>
                {props.airports.map(airport => <option key={airport} value={airport}>{airport}</option>)}
            </select>
        </div>
    )
}

export default Filters;
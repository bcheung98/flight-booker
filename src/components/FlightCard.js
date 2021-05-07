import React from "react";
import { withRouter } from "react-router";

import "../css/FlightCard.css";

const FlightCard = (props) => {
    let { airline, flight_number, origin, destination } = props.flightInfo
    return (
        <div className="flight-card">
            <p>{airline} Flight {flight_number}</p>
            <p>{origin} ==={">"} {destination}</p>
        </div>
    )
}

export default withRouter(FlightCard);
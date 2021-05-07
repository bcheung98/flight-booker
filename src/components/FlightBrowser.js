import React from "react";
import { withRouter } from "react-router"
import FlightCard from "./FlightCard";

import "../css/FlightBrowser.css";

class FlightBrowser extends React.Component {

    state = {
        flights: []
    }

    componentDidMount() {
        fetch("http://localhost:3000/flights")
            .then(res => res.json())
            .then(flights => this.setState({ flights }));
    }

    render() {
        return (
            <React.Fragment>
                <div className="flight-browser-banner">
                    <div className="flight-browser-banner-text">
                        <h1>Browse Flights</h1>
                    </div>
                </div>
                <div className="flight-browser">
                    {this.state.flights.map(flight => <FlightCard key={flight.id} flightInfo={flight} />)}
                </div>
            </React.Fragment>
        )
    }

}

export default withRouter(FlightBrowser);
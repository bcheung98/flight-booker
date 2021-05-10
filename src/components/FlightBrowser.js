import React from "react";
import { withRouter } from "react-router"
import FlightCard from "./FlightCard";
import Filters from "./Filters";

import "../css/FlightBrowser.css";

class FlightBrowser extends React.Component {

    state = {
        flights: [],
        filters: {
            airlines: "all",
            origins: "all",
            destinations: "all"
        }
    }

    componentDidMount() {
        fetch("http://localhost:3000/flights")
            .then(res => res.json())
            .then(flights => this.setState({ flights }));
    }

    getAirlines = () => {
        let airlines = [];
        for (let f of this.state.flights) {
            !airlines.includes(f.airline) && airlines.push(f.airline);
        }
        airlines.sort((a, b) => a.localeCompare(b));
        return airlines;
    }

    getAirports = () => {
        let airports = [];
        for (let f of this.state.flights) {
            !airports.includes(f.origin) && airports.push(f.origin);
            !airports.includes(f.destination) && airports.push(f.destination);
        }
        airports.sort((a, b) => a.localeCompare(b));
        return airports;
    }

    setAirlineFilters = (e) => {
        this.setState({ filters: { ...this.state.filters, airlines: e.target.value } });
    }

    setOriginFilters = (e) => {
        this.setState({ filters: { ...this.state.filters, origins: e.target.value } });
    }

    setDestinationFilters = (e) => {
        this.setState({ filters: { ...this.state.filters, destinations: e.target.value } });
    }

    filterFlights = () => {
        let flights = [...this.state.flights]
        if (this.state.filters.airlines !== "all") {
            flights = flights.filter(f => this.state.filters.airlines === f.airline);
        }
        if (this.state.filters.origins !== "all") {
            flights = flights.filter(f => this.state.filters.origins === f.origin);
        }
        if (this.state.filters.destinations !== "all") {
            flights = flights.filter(f => this.state.filters.destinations === f.destination);
        }
        return flights;
    }

    render() {
        return (
            <React.Fragment>
                <div className="flight-browser-banner">
                    <div className="flight-browser-banner-text">
                        <h1>Browse Flights</h1>
                    </div>
                </div>
                <Filters
                    airlines={this.getAirlines()} setAirline={this.setAirlineFilters}
                    airports={this.getAirports()} setOrigin={this.setOriginFilters} setDestination={this.setDestinationFilters}
                />
                <div className="flight-browser">
                    {this.filterFlights().map(flight => <FlightCard key={flight.id} flightInfo={flight} />)}
                </div>
            </React.Fragment>
        )
    }

}

export default withRouter(FlightBrowser);
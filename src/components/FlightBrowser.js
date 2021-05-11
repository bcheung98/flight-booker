import React from "react";
import { withRouter } from "react-router"
import FlightCard from "./FlightCard";
import Filters from "./Filters";
import BookingCard from "./BookingCard";

import "../css/FlightBrowser.css";

class FlightBrowser extends React.Component {

    state = {
        path: window.location.pathname,
        flights: [],
        filters: {
            airlines: "all",
            origins: "all",
            destinations: "all"
        }
    }

    componentDidMount() {
        let url = ""
        this.state.path === "/flights" ? url = "http://localhost:3000/flights" : url = "http://localhost:3000/my-bookings"
        fetch(url, {
            method: "GET",
            headers: {
                "token": this.props.token
            }
        })
            .then(res => res.json())
            .then(flights => this.setState({ flights }))
            .catch(error => alert(error));
    }

    bookFlight = (flight, seatNumber) => {
        flight.seatNumber = seatNumber;
        fetch("http://localhost:3000/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": this.props.token
            },
            body: JSON.stringify({ flightData: flight })
        })
            .then(res => res.json())
            .then(data => {
                if (data.error !== undefined) {
                    alert(data.error);
                }
            })
            .catch(error => alert(error));
    }

    cancelBooking = (flight) => {
        let newBookings = this.state.flights.filter(f => f.id !== flight.id)
        fetch(`http://localhost:3000/bookings/${flight.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "token": this.props.token
            }
        })
            .then(this.setState({ flights: newBookings }));
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
                        {this.state.path === "/flights" ? <h1>Browse Flights</h1> : <h1>My Bookings</h1>}
                    </div>
                </div>
                <Filters
                    airlines={this.getAirlines()} setAirline={this.setAirlineFilters}
                    airports={this.getAirports()} setOrigin={this.setOriginFilters} setDestination={this.setDestinationFilters}
                />
                <div className="flight-browser">
                    {this.state.path === "/flights" ?
                        this.filterFlights().map(flight => <FlightCard key={flight.id} flightInfo={flight} onClick={this.bookFlight} path={this.state.path} />)
                        :
                        this.filterFlights().map(flight => <BookingCard key={flight.id} flightInfo={flight} onClick={this.cancelBooking} path={this.state.path} />)
                    }
                </div>
            </React.Fragment>
        )
    }

}

export default withRouter(FlightBrowser);
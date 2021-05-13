import React from "react";
import { withRouter } from "react-router"
import FlightCard from "./FlightCard";
import Filters from "./Filters";
import BookingCard from "./BookingCard";
import { airportList } from "../AirportList";

import "../css/FlightBrowser.css";

import Typography from '@material-ui/core/Typography';

class FlightBrowser extends React.Component {

    state = {
        path: window.location.pathname,
        flights: [],
        filters: {
            airlines: "All Airlines",
            origins: "All Airports",
            destinations: "All Airports"
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
        airlines.unshift("All Airlines")
        return airlines;
    }

    getAirports = () => {
        let airports = [];
        for (let f of this.state.flights) {
            !airports.includes(`${airportList[f.origin]} (${f.origin})`) && airports.push(`${airportList[f.origin]} (${f.origin})`);
            !airports.includes(`${airportList[f.destination]} (${f.destination})`) && airports.push(`${airportList[f.destination]} (${f.destination})`);
        }
        airports.sort((a, b) => a.localeCompare(b));
        airports.unshift("All Airports")
        return airports;
    }

    setAirlineFilters = (airline) => {
        this.setState({ filters: { ...this.state.filters, airlines: airline } });
    }

    setOriginFilters = (origin) => {
        this.setState({ filters: { ...this.state.filters, origins: origin } });
    }

    setDestinationFilters = (destination) => {
        this.setState({ filters: { ...this.state.filters, destinations: destination } });
    }

    filterFlights = () => {
        let flights = [...this.state.flights]
        if (this.state.filters.airlines !== "All Airlines") {
            flights = flights.filter(f => this.state.filters.airlines === f.airline);
        }
        if (this.state.filters.origins !== "All Airports") {
            flights = flights.filter(f => this.state.filters.origins === f.origin);
        }
        if (this.state.filters.destinations !== "All Airports") {
            flights = flights.filter(f => this.state.filters.destinations === f.destination);
        }
        return flights;
    }

    render() {
        return (
            <React.Fragment>
                <div className="flight-browser-banner">
                    <div className="flight-browser-banner-text">
                        {this.state.path === "/flights" ? <Typography variant="h1">Browse Flights</Typography> : <Typography variant="h1">My Bookings</Typography>} 
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
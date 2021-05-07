import React from "react";
import { withRouter } from "react-router"

import "../css/FlightBrowser.css";

class FlightBrowser extends React.Component {

    state = {
        flights: []
    }

    render() {
        return (
           <React.Fragment>
               <div className="flight-browser-banner">
                    <div className="flight-browser-banner-text">
                        <h1>Browse Flights</h1>
                    </div>
               </div>
           </React.Fragment>
        )
    }

}

export default withRouter(FlightBrowser);
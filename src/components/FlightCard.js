import React from "react";
import { withRouter } from "react-router";
import Popup from "reactjs-popup";

import "../css/FlightCard.css";

const FlightCard = (props) => {
    let { airline, flight_number, origin, destination } = props.flightInfo
    return (
        <div className="flight-card">
            <p>{airline} Flight {flight_number}</p>
            <p>{origin} ==={">"} {destination}</p>
            <Popup
                trigger={<button className="add-flight-button">Book Flight</button>}
                modal
                nested
            >
                {close => (
                    <div className="modal">
                        <button className="modal-close" onClick={close}>
                            &times;
                        </button>
                        <div className="modal-header"> Confirm Booking </div>
                        <div className="modal-content">
                            {' '}
                            {airline} Flight {flight_number}
                            <br />
                            {origin} ==={">"} {destination}
                        </div>
                        <div className="modal-actions">
                            <button className="modal-button" onClick={() => {
                                console.log("Flight booked!")
                                close();
                            }}>Book Flight</button>
                            <button className="modal-button" onClick={() => close()}>Cancel</button>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    )
}

export default withRouter(FlightCard);
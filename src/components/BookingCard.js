import React from "react";
import { withRouter } from "react-router";
import Popup from "reactjs-popup";

import "../css/BookingCard.css";

const BookingCard = (props) => {
    let { airline, flight_number, origin, destination, seatNumber } = props.flightInfo
    return (
        <div className="booking-card">
            <p>{airline} Flight {flight_number}</p>
            <p>{origin} ==={">"} {destination}</p>
            <p>Seat Number: {seatNumber}</p>
            <Popup
                trigger={<button className="remove-booking-button">Cancel Booking</button>}
                modal
                nested
            >
                {close => (
                    <div className="modal">
                        <button className="modal-close" onClick={close}>
                            &times;
                        </button>
                        <div className="modal-header"> Cancel Booking </div>
                        <div className="modal-content">
                            {' '}
                            {airline} Flight {flight_number}
                            <br />
                            {origin} ==={">"} {destination}
                            <br />
                            Seat Number: {seatNumber}
                        </div>
                        <div className="modal-actions">
                            <button className="modal-button" onClick={() => {
                                props.onClick(props.flightInfo);
                                close();
                            }}>Cancel Booking</button>
                            <button className="modal-button" onClick={() => close()}>Go Back</button>
                        </div>
                    </div>
                )}
            </Popup>
        </div>
    )
}

export default withRouter(BookingCard);
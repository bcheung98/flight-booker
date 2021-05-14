import React from "react";
import { withRouter } from "react-router";
import Popup from "reactjs-popup";
import { airportList, airlineList } from "../Data";

import "../css/FlightCard.css";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        border: "2px solid black",
        padding: theme.spacing(2),
        margin: 'auto',
        marginBottom: 20,
        maxWidth: 500,
    },
    image: {
        width: 128,
        height: 128,
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    },
    buttons: {
        margin: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(3),
        minWidth: 100,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const FlightCard = (props) => {
    const classes = useStyles();
    let { airline, flight_number, origin, departure_time, destination, arrival_time, aircraft, available_seats } = props.flightInfo
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item>
                        <img className={classes.img} alt={airline} src={`https://e1.flightcdn.com/images/airline_logos/90p/${airlineList[airline]}.png`} />
                    </Grid>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {airline} Flight {flight_number}
                                </Typography>
                                <Typography gutterBottom variant="body2">
                                    <b>{origin}</b> ==={">"} <b>{destination}</b>
                                </Typography>
                                <Typography variant="body2">
                                    Departs: <b>{departure_time}</b>
                                </Typography>
                                <Typography variant="body2">
                                    Arrives: <b>{arrival_time}</b>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Popup
                                    trigger={<Button variant="contained" color="primary">Book Flight</Button>}
                                    modal
                                    nested
                                >
                                    {close => (
                                        <Paper className={classes.paper}>
                                            <Typography variant="h4">Confirm Booking</Typography>
                                            <Typography variant="body1">{airline} Flight {flight_number}</Typography>
                                            <Typography variant="body1">{`${airportList[origin]} (${origin})`} ==={">"} {`${airportList[destination]} (${destination})`}</Typography>
                                            <Typography variant="body1">Departs: <b>{departure_time}</b></Typography>
                                            <Typography variant="body1">Arrives: <b>{arrival_time}</b></Typography>
                                            <Typography variant="body1">Aircraft: {aircraft}</Typography>
                                            <Typography variant="body1">Select Seat:
                                                <select className="seat-selector" required>
                                                    {available_seats.map(seat => <option key={seat} value={seat}>{seat}</option>)}
                                                </select>
                                            </Typography>
                                            <div className="modal-actions">
                                                <Button className={classes.buttons} variant="contained" color="primary" onClick={() => {
                                                    props.onClick(props.flightInfo, document.querySelector(".seat-selector").value);
                                                    close();
                                                }}>Book Flight</Button>
                                                <Button className={classes.buttons} variant="contained" color="secondary" onClick={() => close()}>Go Back</Button>
                                            </div>
                                        </Paper>
                                    )}
                                </Popup>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Typography variant="subtitle1">{aircraft}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default withRouter(FlightCard);
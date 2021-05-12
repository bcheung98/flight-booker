import React from "react";
import { withRouter } from "react-router";
import Popup from "reactjs-popup";

import "../css/BookingCard.css";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';

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

const BookingCard = (props) => {
    const classes = useStyles();
    let { airline, flight_number, origin, departure_time, destination, arrival_time, seatNumber, aircraft } = props.flightInfo
    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    {/* <Grid item>
                        <img className={classes.img} alt="complex" src="/static/images/grid/complex.jpg" />
                    </Grid> */}
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {airline} Flight {flight_number}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {origin} ==={">"} {destination}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Departs: <b>{departure_time}</b> Arrives: <b>{arrival_time}</b>
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    Seat Number: <b>{seatNumber}</b>
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Popup
                                    trigger={<Button variant="contained" color="primary">Cancel Flight</Button>}
                                    modal
                                    nested
                                >
                                    {close => (
                                        <Paper className={classes.paper}>
                                            <Typography variant="h4">Cancel Flight</Typography>
                                            <Typography variant="body1">{airline} Flight {flight_number}</Typography>
                                            <Typography variant="body1">{origin} ==={">"} {destination}</Typography>
                                            <Typography variant="body1">Departs: <b>{departure_time}</b></Typography>
                                            <Typography variant="body1">Arrives: <b>{arrival_time}</b></Typography>
                                            <Typography variant="body1">Aircraft: {aircraft}</Typography>
                                            <Typography variant="body1">Seat Number: <b>{seatNumber}</b></Typography>
                                            <div className="modal-actions">
                                                <Button className="modal-button" variant="contained" color="primary" onClick={() => {
                                                    props.onClick(props.flightInfo);
                                                    close();
                                                }}>Cancel Flight</Button>
                                                <Button className={classes.buttons} variant="contained" color="secondary" onClick={() => close()}>Go Back</Button>
                                            </div>
                                        </Paper>
                                    )}
                                </Popup>
                            </Grid>
                        </Grid>
                        {/* <Grid item>
                            <Typography variant="subtitle1">$19.00</Typography>
                        </Grid> */}
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default withRouter(BookingCard);
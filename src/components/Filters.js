import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { airports } from "../Airports";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(3),
        minWidth: 100,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
}));

const Filters = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.paper}>
            <FormControl className={classes.formControl}>
                <InputLabel shrink>Origin</InputLabel>
                <Select onChange={props.setOrigin} className={classes.selectEmpty} autoWidth>
                    <MenuItem value="all">All Airports</MenuItem>
                    {props.airports.map(airport => <MenuItem key={airport} value={airport}>{airports[airport]} ({airport})</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel shrink>Destination</InputLabel>
                <Select onChange={props.setDestination} className={classes.selectEmpty} autoWidth>
                    <MenuItem value="all">All Airports</MenuItem>
                    {props.airports.map(airport => <MenuItem key={airport} value={airport}>{airports[airport]} ({airport})</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel shrink>Airline</InputLabel>
                <Select onChange={props.setAirline} className={classes.selectEmpty} autoWidth>
                    <MenuItem value="all">All Airlines</MenuItem>
                    {props.airlines.map(airline => <MenuItem key={airline} value={airline}>{airline}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    )
}

export default Filters;
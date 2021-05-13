import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 1250,
        display: "grid",
        gridTemplateColumns: "auto auto auto"
    },
}));

const Filters = (props) => {
    const classes = useStyles();
    const [airlineValue, setAirlineValue] = React.useState(props.airlines[0]);
    const [airlineInputValue, setAirlineInputValue] = React.useState("");

    const [originValue, setOriginValue] = React.useState(props.airports[0]);
    const [originInputValue, setOriginInputValue] = React.useState("");

    const [destinationValue, setDestinationValue] = React.useState(props.airports[0]);
    const [destinationInputValue, setDestinationInputValue] = React.useState("");
    return (
        <div className={classes.paper}>
            <Autocomplete
                style={{ margin: "20px" }}
                value={originValue}
                onChange={(event, newValue) => {
                    setOriginValue(newValue);
                    props.setOrigin(newValue);
                }}
                inputValue={originInputValue}
                onInputChange={(event, newInputValue) => {
                    setOriginInputValue(newInputValue);
                }}
                options={props.airports}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField {...params} label="Origin" variant="outlined" />}
            />
            <Autocomplete
                style={{ margin: "20px" }}
                value={destinationValue}
                onChange={(event, newValue) => {
                    setDestinationValue(newValue);
                    props.setDestination(newValue);
                }}
                inputValue={destinationInputValue}
                onInputChange={(event, newInputValue) => {
                    setDestinationInputValue(newInputValue);
                }}
                options={props.airports}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField {...params} label="Destination" variant="outlined" />}
            />
            <Autocomplete
                style={{ margin: "20px" }}
                value={airlineValue}
                onChange={(event, newValue) => {
                    setAirlineValue(newValue);
                    props.setAirline(newValue);
                }}
                inputValue={airlineInputValue}
                onInputChange={(event, newInputValue) => {
                    setAirlineInputValue(newInputValue);
                }}
                options={props.airlines}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField {...params} label="Airline" variant="outlined" />}
            />
        </div>
    )
}

export default Filters;
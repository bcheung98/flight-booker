import React from "react";

import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import FlightBrowser from "./components/FlightBrowser"

import "./App.css";
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from "react-router-dom";

class App extends React.Component {

    state = {
        logged_in: false,
        token: null,
    }

    handleLogin = (token) => {
        this.setState({ logged_in: true, token })
    }

    componentDidMount() {
        const authToken = localStorage.getItem('token')
        if (authToken) {
            this.setState({ logged_in: true, token: authToken })
        }
    }

    render() {
        return (
            <div>
                <Router>
                    <Nav logged_in={this.state.logged_in} />
                    <Switch>

                        <Route exact path="/" component={Home} />

                        <Route path="/login" component={() => (
                            !this.state.logged_in ? <Login handleLogin={this.handleLogin} /> : <Redirect to="/" />
                        )} />

                        <Route path="/signup" component={() => (
                            !this.state.logged_in ? <Signup handleLogin={this.handleLogin} /> : <Redirect to="/" />
                        )} />

                        <Route path="/logout" component={() => {
                            localStorage.clear()
                            this.setState({ logged_in: false, token: null })
                            return <Redirect to="/" />
                        }} />

                        <Route path="/flights" component={() => (
                            this.state.logged_in ? <FlightBrowser {...this.state} /> : <Redirect to="/login" />
                        )} />

                    </Switch>
                </Router>
            </div>
        )
    }

}

export default App;

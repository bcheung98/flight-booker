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
        token: null
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
                    <Nav />
                    <Switch>

                        <Route exact path="/" component={Home} />

                        <Route path="/login" component={() => (
                            <Login handleLogin={this.handleLogin} />
                        )} />

                        <Route path="/signup" component={() => (
                            <Signup handleLogin={this.handleLogin} />
                        )} />

                        <Route path="/logout" component={() => {
                            localStorage.clear()
                            this.setState({ logged_in: false, token: null })
                            return <Redirect to='/' />
                        }} />

                        <Route path="/flights" component={() => (
                            <FlightBrowser />
                        )} />

                    </Switch>
                </Router>
            </div>
        )
    }

}

export default App;

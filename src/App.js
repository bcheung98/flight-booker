import React from "react";

import Home from "./components/Home";

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

    render() {
        return (
            <div>
                <Router>
                    <Switch>

                        <Route exact path="/" component={Home} />

                    </Switch>
                </Router>
            </div>
        )
    }

}

export default App;

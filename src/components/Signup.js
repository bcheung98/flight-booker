import React from "react";
import { withRouter } from "react-router";

import "../css/Signup.css";

class Signup extends React.Component {

    state = {
        username: '',
        password: ''
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {
        console.log("test");
    }

    render() {
        return (
            <div className="signup-page">
                <form onSubmit={this.handleSubmit} className="signup-container">
                    <h1>Create a YPedia account</h1>
                    <div className="form-input-box">
                        <input type="text" name="username" className="form-input" placeholder="Username" />
                    </div>
                    <div className="form-input-box">
                        <input type="password" name="password" className="form-input" placeholder="Password" />
                    </div>
                    <button className="form-input-button" type="submit">Sign Up</button>
                </form>
            </div>
        )
    }

}

export default withRouter(Signup);
import React from "react";
import { withRouter } from "react-router";

import "../css/Signup.css";

class Signup extends React.Component {

    state = {
        username: "",
        first_name: "",
        last_name: "",
        password: "",
        password_confirm: ""
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user: { ...this.state } })
        })
            .then(res => res.json())
            .then(tokenObj => {
                if (tokenObj.jwt) {
                    localStorage.setItem("token", tokenObj.jwt);
                    localStorage.setItem("username", tokenObj.user.username);
                    this.props.handleLogin(tokenObj.jwt);
                    this.props.history.push("/")
                }
                else {
                    alert("Login failed!");
                }
            });
    }

    render() {
        return (
            <div className="signup-page">
                <form onSubmit={this.handleSubmit} className="signup-container">
                    <h1>Create a YPedia account</h1>
                    <div className="form-input-box">
                        <input type="text" name="username" className="form-input" placeholder="Username" onChange={this.handleInputChange} required />
                    </div>
                    <div className="form-input-box">
                        <input type="text" name="first_name" className="form-input" placeholder="First Name" onChange={this.handleInputChange} required />
                    </div>
                    <div className="form-input-box">
                        <input type="text" name="last_name" className="form-input" placeholder="Last Name" onChange={this.handleInputChange} required />
                    </div>
                    <div className="form-input-box">
                        <input type="password" name="password" className="form-input" placeholder="Password" onChange={this.handleInputChange} required />
                    </div>
                    <div className="form-input-box">
                        <input type="password" name="password_confirm" className="form-input" placeholder="Confirm Password" onChange={this.handleInputChange} required />
                    </div>
                    <button className="form-input-button" type="submit">Signup</button>
                </form>
            </div>
        )
    }

}

export default withRouter(Signup);
import React from "react";
import "../css/Login.css";
import { withRouter } from "react-router";

class Login extends React.Component {

    state = {
        username: "",
        password: ""
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/login", {
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
            <div className="login-page">
                <form onSubmit={this.handleSubmit} className="login-container">
                    <h1>Login to YPedia</h1>
                    <div className="form-input-box">
                        <input type="text" name="username" className="form-input" placeholder="Username" onChange={this.handleInputChange} />
                    </div>
                    <div className="form-input-box">
                        <input type="password" name="password" className="form-input" placeholder="Password" onChange={this.handleInputChange} />
                    </div>
                    <button className="form-input-button" type="submit">Login</button>
                </form>
            </div>
        )
    }

}

export default withRouter(Login);
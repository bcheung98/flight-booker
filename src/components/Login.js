import React from "react";
import "../css/Login.css";
import { withRouter } from "react-router";

class Login extends React.Component {

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
            <div className="login-page">
                <img src={require("../assets/plane1.jpg").default} alt="plane" className="background-img" />
                <form onSubmit={this.handleSubmit} className="login-container">
                    Username: <input type="text" className="form-input" />
                    <br />
                    Password: <input type="password" className="form-input" />
                    <button className="form-input-button" type="submit">Login</button> 
                </form>
            </div>
        )
    }

}

export default withRouter(Login);
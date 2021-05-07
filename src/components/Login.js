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
                <form onSubmit={this.handleSubmit} className="login-container">
                    <h1>Log in to YPedia</h1>
                    <div className="form-input-box">
                        <input type="text" name="username" className="form-input" placeholder="Username" />
                    </div>
                    <div className="form-input-box">
                        <input type="password" name="password" className="form-input" placeholder="Password" />
                    </div>
                    <button className="form-input-button" type="submit">Login</button>
                </form>
            </div>
        )
    }

}

export default withRouter(Login);
import "../css/Nav.css";
import { withRouter } from "react-router"
import React from "react";

const Nav = ({ logged_in, history }) => {

    return (
        <div className="nav-bar">
            <div className="logo" onClick={() => history.push("/")}>YPedia</div>
            {
                !logged_in && (
                    <>
                        <div className="nav-link" onClick={() => history.push("/login")}>Login</div>
                        <div className="nav-link" onClick={() => history.push("/signup")}>Signup</div>
                    </>
                )
            }
        </div>
    )

}

export default withRouter(Nav)
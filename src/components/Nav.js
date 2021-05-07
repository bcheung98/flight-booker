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
                        <button className="nav-link" onClick={() => history.push("/login")}>Login</button>
                        <button className="nav-link" onClick={() => history.push("/signup")}>Signup</button>
                    </>
                )
            }
        </div>
    )

}

export default withRouter(Nav)
import "../css/Nav.css";
import { withRouter } from "react-router"

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
            {
                logged_in && (
                    <>
                        <button className="nav-link" onClick={() => history.push("/logout")}>Logout</button>
                        <button className="nav-link" onClick={() => history.push("/flights")}>Flights</button>
                        <span className="current-user">Logged in as: {localStorage.getItem("username")}</span>
                    </>
                )
            }
        </div>
    )

}

export default withRouter(Nav)
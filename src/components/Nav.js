import "../css/Nav.css";
import { withRouter } from "react-router"

const Nav = () => {

    return(
        <div className="nav-bar">
            <h1 style={{margin: 0}}>YPedia</h1>
        </div>
    )

}

export default withRouter(Nav)
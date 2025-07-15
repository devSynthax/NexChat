import { Link } from "react-router";
import "./navigation.css"

const Header = () => {
    return (
        <div className="navigation">
           <div className="company-logo">
                <h1>NexChat</h1>
           </div>
           <div className="left-navigation">
                <ul>
                    <li><Link to="/login">Login</Link></li>
                </ul>
           </div>
        </div>
    )
}

export default Header
import { useIsAuthenticated } from "@azure/msal-react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom"
import Login from "../../components/Authentication/LoginButton";
import './header.css'

const Header = () => {
    const isAuthenticated = useIsAuthenticated();

    return(
        <header>
            <nav>
                <ul className="header-links">
                    <Link to="/" className="links">Home</Link>
                    <Link to="/hiking-trails" className="links">Hiking Trails</Link>
                    <Link to="/seasides" className="links">Seaside</Link>
                    <Link to="/parks" className="links">Parks</Link>
                    <Link to="/destination/create" className="links">Create Destination</Link>
                    {isAuthenticated ? <Button>Logout</Button> : <Login />}
                </ul>
            </nav>
        </header>
    );
}

export default Header;

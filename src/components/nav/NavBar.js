import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"


export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/contacts">Contacts</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/contacts/create">Add Contact</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/categories">Categories</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/customFields">Custom Fields</Link>
            </li>
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="/" onClick={() => {
                    localStorage.removeItem("connect_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}
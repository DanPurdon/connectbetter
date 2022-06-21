import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"


export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <div className="main_header">
        <h1>ConnectBetter</h1>
            <h2>Your Memory Extender</h2>
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/contacts">Contacts
                    <svg viewBox="0 0 70 36">
                    <path d="M6.9739 30.8153H63.0244C65.5269 30.8152 75.5358 -3.68471 35.4998 2.81531C-16.1598 11.2025 0.894099 33.9766 26.9922 34.3153C104.062 35.3153 54.5169 -6.68469 23.489 9.31527" />
                    </svg>
                </Link>
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
        </div>
    )
}
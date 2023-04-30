import './navbar.css'
import { Link } from 'react-router-dom'
import logo from './../../assets/logo.png'

function Navbar() {
    return(
        <nav>
            <div className="logo">
                <img src={logo} alt="Logo"/>
                <h3>Tic Tac Toe</h3>
            </div>
            <ul>
                <li><Link to="/">Home</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;

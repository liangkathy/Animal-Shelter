
import { Link } from 'react-router-dom'
import './NavBar.css'
import { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'

const NavBar = ({isNavOpen, closeNavByLink}) => {
    const {theme} = useContext(ThemeContext)
    
    return (
        <nav className={`navbar ${isNavOpen ? "nav-open" : ""} nav-${theme}`}>

                <li className='nav-link' onClick={closeNavByLink}><Link to="/" >Home</Link></li>
                <li className='nav-link' onClick={closeNavByLink}><Link to="/adopt" >Adopt</Link></li>
                <li className='nav-link' onClick={closeNavByLink}><Link to="/about" >About Us</Link></li>        
         </nav>
    )
}

export default NavBar
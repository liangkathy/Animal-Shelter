import logo from '../../../assets/logo.png'
import darklogo from '../../../assets/dark-logo.png'
import { useContext } from 'react'
import Toggle from '../../Toggle/Toggle'
import './AuthHeader.css'
import { AuthContext } from '../../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../../contexts/ThemeContext'
import NavBar from '../../NavBar/NavBar'

const AuthHeader = ({isNavOpen, closeNavByLink}) => {
    const {currentUsername} = useContext(AuthContext)
    const {theme} = useContext(ThemeContext)

    return (
        <header className={`auth-header ${theme} ${currentUsername != null ? "hidden" : undefined}`}>
            <div className="logo-container">
                <img className="logoimg" src={theme === "dark" ? darklogo : logo} alt='animal-logo'/>
                <div className={`logo-text logo-text-${theme}`}>Critters Animal Rescue</div>
            </div>

            <NavBar isNavOpen={isNavOpen} closeNavByLink={closeNavByLink}/>

            <div className='right-auth-header'>
                {/* {
                    window.location.href === "http://localhost:3000/auth" ? <Link to="/about" className="auth-about">About Us</Link> : <Link to="/auth" className="auth-about">Back to Login</Link>
                } */}
                
                <div className="toggle-container">
                    <Toggle className={'theme'} />
                    <label>Dark Mode</label>
                </div>
            </div>

            
        </header>
    )
}

export default AuthHeader
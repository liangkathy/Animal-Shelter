
import { Link, useLocation } from 'react-router-dom'
import './NavBar.css'
import { useContext } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'

import Button from '../Button/Button'

const NavBar = ({isNavOpen, closeNavByLink, setLogIn, setSignUp, currentUsername}) => {
    const {theme} = useContext(ThemeContext)
    const location = useLocation()

    const hideButtons = location.pathname === '/auth';
    
    return (
        <nav id={`${!setLogIn ? "navbar-logged-in" : undefined}`} className={`navbar ${isNavOpen && "nav-open"} nav-${theme}`}>
                <ul id={`${!setLogIn ? "navlist" : undefined}`} className='nav-list'>
                    <li className='nav-link' onClick={closeNavByLink}><Link to="/" className={`a-${theme}`}>Home</Link></li>
                    <li className='nav-link' onClick={closeNavByLink}><Link to="/adopt" className={`a-${theme}`}>Adopt</Link></li>
                    <li className='nav-link' onClick={closeNavByLink}><Link to="/about" className={`a-${theme}`}>About Us</Link></li>
                </ul>
                {
                    !currentUsername &&
                    <div className={`auth-options-top ${hideButtons || isNavOpen ? "hidden" : undefined}`}>
                        <Button 
                            text={'Log in'} 
                            handleClick={setLogIn} />  

                        <Link 
                            to="/auth" 
                            onClick={setSignUp}
                            id={`auth-options-${theme}`}>Sign up</Link>
                     </div>  
                }
                
                
                    { 
                        setLogIn && isNavOpen && 
                        <div id="auth-options">
                            <Link 
                                to="/auth" 
                                onClick={setLogIn} 
                                id={`auth-options-${theme}`}
                                className={hideButtons ? "hidden" : undefined} >Log in</Link> 
                            <Link 
                                to="/auth" 
                                onClick={setSignUp}
                                id={`auth-options-${theme}`}
                                className={hideButtons ? "hidden" : undefined} >Sign up</Link>
                        </div> 
                    }
                
                
         </nav>
    )
}

export default NavBar
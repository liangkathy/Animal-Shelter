
import NavBar from '../../components/NavBar/NavBar'
import Button from '../../components/Button/Button'
import Toggle from '../../components/Toggle/Toggle'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import './Header.css'
import { AuthContext } from '../../contexts/AuthContext'
import AuthHeader from '../../components/Auth/AuthHeader/AuthHeader'
import { ThemeContext } from '../../contexts/ThemeContext'
import logo from "../../assets/logo.png";
import darklogo from "../../assets/dark-logo.png";
import AdminHeader from '../AdminHeader/AdminHeader'
import { AdminPathContext } from '../../contexts/AdminPathContext'
import { UserPathContext } from '../../contexts/UserPathContext'


const Header = () => {
    const navigate = useNavigate()
    const {theme} = useContext(ThemeContext)
    const {currentUsername, setCurrentUsername} = useContext(AuthContext);
    const usernameFromSessionStorage = sessionStorage.getItem("username")
    const [isNavOpen, setIsNavOpen] = useState(false)
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
    const {isAdminPath} = useContext(AdminPathContext)
    const {setIsUserPath} = useContext(UserPathContext)

    useEffect(() => {
        if(usernameFromSessionStorage) {
            setCurrentUsername(usernameFromSessionStorage)
        } else {
            navigate("/auth")
        }
    },[])


    //remove jwt on logout
    const clearAuthData = () => {
        setCurrentUsername(null);
        localStorage.removeItem('token');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('adminPath');
        sessionStorage.removeItem('userPath');
        setIsUserPath(true);
    }

    const toggleNavOpen = () => {
        setIsNavOpen(!isNavOpen)
        setIsHamburgerOpen(!isHamburgerOpen)
    }

    const closeNavByLink = () => {
        setIsNavOpen(!isNavOpen)
        setIsHamburgerOpen(!isHamburgerOpen)
    }

    return (
        <>
            <AuthHeader theme={theme}/>
            <AdminHeader />

            <header className={`header header-${theme} ${currentUsername && !isAdminPath ? undefined : "hidden"}`}>
                {
                    currentUsername && 
                    
                    <>
                        <div className={`logo logo-${theme}`} id={`logo-${theme}`}><Link to="/">Critters Animal Rescue</Link></div>
                        <NavBar isNavOpen={isNavOpen} closeNavByLink={closeNavByLink}/>

                        <Link to="/profile" id="profile-icon">
                            <div className="profile-icon">
                                {
                                    currentUsername[0].toUpperCase()
                                }
                            </div>
                            
                        </Link>
                        
                        <Link to="/auth"><Button text={"Logout"} handleClick={clearAuthData}/></Link>
                        
                        <div className="toggle-container">
                            <Toggle className={'theme'} />
                            <label>Dark Mode</label>
                        </div>

                        <div className={isHamburgerOpen ? "hamburger hamburger-open" : "hamburger"} onClick={toggleNavOpen}>
                            <div className={`bar bar-${theme}`}></div>
                            <div className={`bar bar-${theme}`}></div>
                            <div className={`bar bar-${theme}`}></div>
                        </div>
                    </>

                }
                
            </header>
        
        </>

    )


}

export default Header
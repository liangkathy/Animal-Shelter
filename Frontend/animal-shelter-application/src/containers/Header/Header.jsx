
import NavBar from '../../components/NavBar/NavBar'
import Button from '../../components/Button/Button'
import Toggle from '../../components/Toggle/Toggle'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import './Header.css'
import { AuthContext } from '../../contexts/AuthContext'
import { ThemeContext } from '../../contexts/ThemeContext'
import logo from "../../assets/logo.png";
import darklogo from "../../assets/dark-logo.png";
import AdminHeader from '../AdminHeader/AdminHeader'
import { AdminPathContext } from '../../contexts/AdminPathContext'
import { UserPathContext } from '../../contexts/UserPathContext'


const Header = ({setIsLogin}) => {
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
        setIsNavOpen(false)
        setIsHamburgerOpen(false)
    }

    const setSignUp = () => {
        setIsLogin(false)
        closeNavByLink()
    }

    const setLogIn = () => {
        setIsLogin(true)
        navigate('/auth')
        closeNavByLink()
    }

    //ensure hamburger menu and nav close when screen size is over 768px
    const [windowSize, setWindowSize] = useState(window.innerWidth)

    useLayoutEffect(() => {
        const updateSize = () => {
            setWindowSize(window.innerWidth)
        }

        window.addEventListener('resize', updateSize)
        updateSize()
        
        //clean up and remove event listener
        return () => removeEventListener('resize', updateSize)
    },[])

    useEffect(() => {
        if (windowSize >= 768) {
            setIsNavOpen(false)
            setIsHamburgerOpen(false)
        }
    },[windowSize])

    return (
        <>
            <AdminHeader />

            <header className={`header ${theme} ${!isAdminPath ? undefined : "hidden"}`}>
                <Link to="/" id={`logo-${theme}`} className="logo-container">
                    <img className="logoimg logoimg-light" src={theme === "dark" ? darklogo : logo} alt='shelter-logo'/>
                </Link>
                
                {
                    currentUsername ? 
                    <>
                        <div className={`logo `} ></div>
                        
                        <NavBar 
                            isNavOpen={isNavOpen} 
                            closeNavByLink={closeNavByLink}
                            currentUsername={currentUsername}/>

                        <Link to="/profile" id="profile-icon">
                            <div className="profile-icon">
                                {
                                    currentUsername[0].toUpperCase()
                                }
                            </div>
                            
                        </Link>

                        <Link to="/" ><Button text={"Logout"} handleClick={clearAuthData} style={"logout"}/></Link>
                        
                    </> : 
                    <>

                        <NavBar 
                            isNavOpen={isNavOpen} 
                            closeNavByLink={closeNavByLink} 
                            setLogIn={setLogIn} 
                            setSignUp={setSignUp}/>
                        
                    </>        
                }
                               
                        <div className="toggle-container">
                            <Toggle className={'theme'} />
                            <label>Dark Mode</label>
                        </div>

                        <div className={isHamburgerOpen ? "hamburger hamburger-open" : "hamburger"} onClick={toggleNavOpen}>
                            <div className={`bar bar-${theme}`}></div>
                            <div className={`bar bar-${theme}`}></div>
                            <div className={`bar bar-${theme}`}></div>
                        </div>
                    

                
                
            </header>
        
        </>

    )


}

export default Header
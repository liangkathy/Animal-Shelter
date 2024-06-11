import { useContext, useEffect } from "react"
import { ThemeContext } from "../../contexts/ThemeContext"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import Toggle from "../../components/Toggle/Toggle"
import Button from "../../components/Button/Button"
import { AdminPathContext } from "../../contexts/AdminPathContext"
import { UserPathContext } from "../../contexts/UserPathContext"


const AdminHeader = () => {
    const navigate = useNavigate()
    const {theme} = useContext(ThemeContext)
    const {currentUsername, setCurrentUsername} =useContext(AuthContext)
    const {isAdminPath, setIsAdminPath} = useContext(AdminPathContext)
    const {setIsUserPath} = useContext(UserPathContext)

    //remove jwt on logout
    const clearAuthData = () => {
        setCurrentUsername(null);
        localStorage.removeItem('token');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('adminPath');
        sessionStorage.removeItem('userPath');
        setIsAdminPath(false);
        setIsUserPath(true);
    }

    return (

            <header className={`header header-${theme} ${theme} ${isAdminPath ? undefined : "hidden"}`} id="admin-header">
                {
                    currentUsername && 
                    
                    <>
                        <div className={`logo logo-${theme}`} id={`logo-${theme}`}><Link to="/admin/home">Critters Animal Rescue</Link></div>
                        <Link to="/admin/home" className="nav-link">Admin Home</Link>

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

                    </>

                }
                
            </header>
        
    )
}

export default AdminHeader
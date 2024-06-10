
import { useContext, useEffect, useState } from 'react'
import './Toggle.css'
import { ThemeContext } from '../../contexts/ThemeContext'
import { AdminPathContext } from '../../contexts/AdminPathContext'
import { useNavigate } from 'react-router-dom'

const Toggle = ({className}) => {
    const navigate = useNavigate()
    const {theme, setTheme} = useContext(ThemeContext)
    const {isAdminPath, setIsAdminPath} = useContext(AdminPathContext)

    //get theme to persist on refresh
    // useEffect(() => {
    //     const storedTheme = localStorage.getItem('theme')
    //     if(storedTheme) {
    //         setTheme(storedTheme)
    //     }
    // },[setTheme])
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        const storedAdminPath = sessionStorage.getItem('adminPath');
        if (storedTheme) {
            setTheme(storedTheme);
        }
        if (storedAdminPath) {
            setIsAdminPath(storedAdminPath === 'true');
        }
    }, [setTheme]);

    //toggle between themes
    const handleThemeToggle = (e) => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
        
    }

    //boolean to check dark mode and set is checked attribute of checkbox
    const isCheckedTheme = theme === "dark"


    //for user toggle from admin view
    const handleUserToggle = (e) => {
        const newPath = !isAdminPath
        setIsAdminPath(newPath)
        sessionStorage.removeItem('adminPath')
        sessionStorage.setItem('adminPath', newPath)
        
        if (newPath) {
            navigate("/admin/home") //if true > redirect to admin home
        } else {
            navigate("/") //if false > redirect to user home
        }
    }

    const isCheckedUser = isAdminPath

    return (
        <label className={`switch ${className}`}>
            <input type="checkbox" 
                onChange={className === 'theme' ? handleThemeToggle : handleUserToggle} 
                checked={className === 'theme' ? isCheckedTheme : isCheckedUser}/>
            <span className="slider round"></span>
        </label>

    )
}

export default Toggle
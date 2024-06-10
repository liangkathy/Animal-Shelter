import { useContext } from "react"
import { ThemeContext } from "../../contexts/ThemeContext"
import { Link } from "react-router-dom"
import ForbiddenError from "./ForbiddenError"

const UnderConstruction = () => {
    const {theme} = useContext(ThemeContext)
    const isAdminPath = sessionStorage.getItem('adminPath')

    return (
        <section className={`error-section ${theme}`}>
            <h4>503: UNDER CONSTRUCTION</h4>
            <Link to={!isAdminPath ? "/" : "/admin/home"}>Return Home</Link>
        </section>
    )
}

export default UnderConstruction
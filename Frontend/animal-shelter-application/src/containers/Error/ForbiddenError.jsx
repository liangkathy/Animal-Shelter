import { useContext } from "react"
import { ThemeContext } from "../../contexts/ThemeContext"
import { Link } from "react-router-dom"

const ForbiddenError = () => {
    const {theme} = useContext(ThemeContext)
    
    return (
        <section className={`error-section ${theme}`}>
            <h4>403: FORBIDDEN</h4>
            <div>You do not have permissions to view this page</div>
            <Link to="/">Return Home</Link>
        </section>
    )
}

export default ForbiddenError
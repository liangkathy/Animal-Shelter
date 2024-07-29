import { Link } from "react-router-dom"
import '../Apply.css'
import { useContext } from "react"
import { ThemeContext } from "../../../contexts/ThemeContext"

const ApplySuccess = () => {
    const {theme} = useContext(ThemeContext)

    const onClick = () => {
        useEffect(() => {
            //to re-render apps on next page
        }, [applications])
    }

    return (
        <section className={`apply-success ${theme}`}>
            <h4>Application submitted!</h4>
            <p>Thank you for submitting an application. We will review your response and be in touch shortly!</p>
            <p>You can review your applications <Link to="/applications" onClick={onClick} className={`a-${theme}`}>here</Link></p>
        </section>
    )
}

export default ApplySuccess
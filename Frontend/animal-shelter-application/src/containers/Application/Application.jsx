import { useContext } from "react"
import { ApplicationsContext } from "../../contexts/ApplicationsContext"
import './Application.css'
import { Link } from "react-router-dom"
import { timestampFormatter } from "../../utils/utils.js";
import { ThemeContext } from "../../contexts/ThemeContext.js";

const Application = () => {
    const {theme} = useContext(ThemeContext)
    const {applications, setApplications} = useContext(ApplicationsContext)

    return (
        <section className={`application-container ${theme}`}>
            <h4>Your Applications</h4>
            <div className="applications-list">
                {   
                    applications &&
                    applications.length === 0 ? (
                        <>
                            <h3>No applications submitted yet!</h3>
                            <p>Want to apply for a pet? Apply <Link to="/apply" className={`a-${theme}`}>here</Link></p>
                        </>
                        ) : (
                            applications.map((app, i) => { 
                                return (
                                <Link key={i} to={`/applications/${app.id}`} className={`a-${theme}`}>
                                    <div className="app-label">
                                        
                                        {app.pets.length == 0 ? "Application" : `Application for ${app.pets.map(pet => pet.name).join(' & ')}`}
                                        
                                    </div>
                                    <div>Submitted at: {timestampFormatter(app.timestamp)}</div>
                                
                                </Link>
                                )
                        })
                    )
                }
            </div>

        </section>
    )
}

export default Application
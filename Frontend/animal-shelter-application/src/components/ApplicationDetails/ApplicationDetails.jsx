import { useContext } from 'react'
import './ApplicationDetails.css'
import { ThemeContext } from '../../contexts/ThemeContext'
import { ApplicationsContext } from '../../contexts/ApplicationsContext'
import { useNavigate, useParams } from 'react-router-dom'
import { timestampFormatter } from "../../utils/utils.js";
import { Link } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
import Button from '../Button/Button.jsx'
import { deleteData } from '../../api/api.js'

const ApplicationDetails = () => {
    const navigate = useNavigate()
    const {theme} = useContext(ThemeContext)
    const {applications, setApplications} = useContext(ApplicationsContext)
    const {applicationId} = useParams()
    const app = applications.find(a => a.id === parseInt(applicationId))

    if (!app) {
        return (<h4>Application not found!</h4>)
    }

    const handleBackOnClick = () =>{
        window.history.back()
    }

    const onDeleteClick = async () => {
        const response = await deleteData(`applications/${applicationId}`)
        console.log(response)

        if (response.hasError) {
            console.log("Error deleting application", response.message);
        } else {
            navigate("/applications")

            const updatedApplications = applications.filter(a => a.id != applicationId)
            setApplications(updatedApplications)
        }
    }

    return (
        <section className={`application-details-container ${theme}`}>
            <div>
                <Link onClick={handleBackOnClick} className='back-link'><IoIosArrowRoundBack size="2em"/> Back</Link>
            </div>

            <div className="application-details">
                <h4>Application Details</h4>
                <div>Pet(s): {app.pets.map(pet => pet.name).join(' & ')}</div>

                <div>
                    <div className='app-q'>Question 1: Tell us about your household, such as other pets, family members, or activity level.</div>
                    <p className='app-a'>{app.response1}</p>
                </div>

                <div>
                    <div className='app-q'>Question 2: Will your pet spend time indoors, outdoors or both?</div>
                    <p className='app-a'>{app.response2}</p>
                </div>

                <div>
                    <div className='app-q'>Question 3: Do you have a plan for preventative treatments such as heartworm/flea/tick medications and/or vaccinations?</div>
                    <p className='app-a'>{app.response3}</p>
                </div>

                <div>Submitted at: {timestampFormatter(app.timestamp)}</div>
            </div>

            <div className='delete-button'>
                <Button text={'Delete'} style={"delete"} handleClick={onDeleteClick} cssId={"red-button"}/>
            </div>

        </section>
    )
}

export default ApplicationDetails
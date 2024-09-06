import { useContext, useEffect, useState } from 'react'
import './ApplicationDetails.css'
import { ThemeContext } from '../../contexts/ThemeContext'
import { useNavigate, useParams } from 'react-router-dom'
import { timestampFormatter } from "../../utils/utils.js";
import { Link } from 'react-router-dom'
import { IoIosArrowRoundBack } from "react-icons/io";
import Button from '../Button/Button.jsx'
import { deleteData, putDataBody } from '../../api/api.js'
import { AdminAppsContext } from '../../contexts/AdminAppsContext.js';

const AdminAppDetails = () => {
    const { theme } = useContext(ThemeContext)
    const {allApplications, setAllApplications} = useContext(AdminAppsContext)
    const { applicationId } = useParams()
    const app = allApplications.find(a => a.id === parseInt(applicationId))
    const statusOptions = ["New", "Contacting", "Accepted", "Rejected"]

    if (!app) {
        return (<h4>Application not found!</h4>)
    }

    const handleBackOnClick = () => {
        window.history.back()    
    }

    const handleStatusUpdate = async (e) => {
        const { value } = e.target

        const response = await putDataBody(`applications/${applicationId}/status`, {status: value})
        console.log(response);

        if (response.hasError) {
            console.log(response.message);
        } 
        else {
            if (app.status != value) {
                app.status = value;
            }
        }
    }

    // const onDeleteClick = async () => {
    //     const response = await deleteData(`applications/${applicationId}`)
    //     console.log(response)

    //     if (response.hasError) {
    //         console.log("Error deleting application", response.message);
    //     } else {
    //         navigate("/applications")

    //         const updatedApplications = applications.filter(a => a.id != applicationId)
    //         setAllApplications(updatedApplications)
    //     }
    // }
    // useEffect(() => {
    // },[app])

    return (
        <section className={`admin-app-details-container ${theme}`}>
            <div>
                <Link onClick={handleBackOnClick} className={`back-link a-${theme}`}><IoIosArrowRoundBack size="2em" /> Back</Link>
            </div>
            <h4>Application Details</h4>
            <div className='admin-app-body'>
                <div className='app-info'>
                    <table>
                        <tbody>
                            <tr>
                                <td className='app-field-label'>Full Name: </td>
                                <td className='app-response'>{app.user.firstName} {app.user.lastName}</td>
                            </tr>
                            <tr>
                                <td className='app-field-label'>Email: </td>
                                <td className='app-response'>{app.user.email}</td>
                            </tr>
                            <tr>
                                <td className='app-field-label'>Phone Number: </td>
                                <td className='app-response'>{app.user.phoneNumber}</td>
                            </tr>
                            <tr>
                                <td className='app-field-label'>Location: </td>
                                <td className='app-response'>{app.user.address.city}, {app.user.address.state}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table className='applicant-response-details'>
                        <tbody>
                            <tr>
                                <td className='app-col-label'>Pet(s) applied for: </td>
                                <td className='app-response'>{app.pets.map(pet => pet.name).join(' & ')}</td>
                            </tr>
                            <tr>
                                <td className='app-col-label'>Question 1: Tell us about your household, such as other pets, family members, or activity level.</td>
                                <td className='app-response'>{app.response1}</td>
                            </tr>
                            <tr>
                                <td className='app-col-label'>Question 2: Will your pet spend time indoors, outdoors or both?</td>
                                <td className='app-response'>{app.response2}</td>
                            </tr>
                            <tr>
                                <td className='app-col-label'>Question 3: Do you have a plan for preventative treatments such as heartworm/flea/tick medications and/or vaccinations?</td>
                                <td className='app-response'>{app.response3}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={`right-panel panel-${theme}`}>
                    <div className='status-select'>
                        <label htmlFor='status'>Status</label>
                        <select 
                            id='status' 
                            className='app-status-select' 
                            type='text' 
                            placeholder="Status" 
                            defaultValue={app.status} 
                            onChange={handleStatusUpdate}>
                            {
                                statusOptions.map((stat, i) => {
                                    return <option key={i} value={stat}>{stat}</option>
                                })
                            }
                        </select>
                    </div>

                    <div>Submitted at: {timestampFormatter(app.timestamp)}</div>

                </div>

            </div>

        </section>
    )
}

export default AdminAppDetails

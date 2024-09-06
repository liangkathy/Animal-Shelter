import React, { useContext, useEffect, useState } from 'react'
import './AdminApplication.css'
import { ThemeContext } from '../../contexts/ThemeContext'
import { Link } from 'react-router-dom'
import { getData } from '../../api/api'
import { timestampFormatter } from '../../utils/utils'
import { AdminAppsContext } from '../../contexts/AdminAppsContext'

const AdminApplication = () => {
    const { theme } = useContext(ThemeContext)
    const {allApplications, setAllApplications} = useContext(AdminAppsContext)

    useEffect(() => {
    }, [allApplications])

    //const statusOptions = ["New", "Contacting", "Accepted", "Rejected"]

    return (
        <section className={`admin-applications ${theme}`}>
            <h4>Pending Applications</h4>
            <div className="applications-list">
                {
                    allApplications &&
                        allApplications.length === 0 ? (
                        <>
                            <h3>No pending applications at this time.</h3>
                        </>
                    ) : (
                        <table>
                <tbody>
                    <tr className='application-header-row'>
                        <td className='application-header-row'>Applicant Name</td>
                        <td className='application-header-row'>Pet(s) applied for</td>
                        <td className='application-header-row'>Submission Timestamp</td>
                        <td className='application-header-row'>Status</td>
                    </tr>
                    {
                        allApplications.map((app, i) => {
                            return (
                                <tr className='application-app-row' key={i}>
                                    <td><Link className={`a-${theme}`} to={`/admin/applications/${app.id}`}>{app.user.firstName} {app.user.lastName}</Link></td>
                                    <td>{app.pets.length == 0 ? "None specified" : `${app.pets.map(pet => pet.name).join(' & ')}`}</td>
                                    <td>{timestampFormatter(app.timestamp)}</td>
                                    <td>{app.status}
                                        {/* <select placeholder="Status" defaultValue={app.status}>
                                            {
                                                statusOptions.map((stat, i) => {
                                                    return <option key={i} value={stat}>{stat}</option>
                                                })
                                            }
                                            
                                        </select> */}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
                    )
                }
            </div>
            
        </section>
    )
}

export default AdminApplication

import React, { useContext, useEffect, useState } from 'react'
import './AdminApplication.css'
import { ThemeContext } from '../../contexts/ThemeContext'
import { Link } from 'react-router-dom'
import { getData } from '../../api/api'
import { timestampFormatter } from '../../utils/utils'

const AdminApplication = () => {
    const {theme} = useContext(ThemeContext)
    const [allApplications, setAllApplications] = useState([])

    useEffect(() => {

      const fetchData = async () => {
          const response = await getData(`applications`)
          console.log(response);
         
          if (response.hasError) {
              console.log("message", response.message);
          }
          setAllApplications(response.data)
      }
      
      fetchData();
  
    }, [])

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
                            allApplications.map((app, i) => { 
                                return (
                                <div key={i} className='admin-app'>
                                    <div className="app-label">
                                        
                                        {app.pets.length == 0 ? "Application" : `Application for ${app.pets.map(pet => pet.name).join(' & ')}`}
                                        
                                    </div>
                                    <div>Submitted by: {app.user.firstName} {app.user.lastName}</div>
                                    <div>Submitted at: {timestampFormatter(app.timestamp)}</div>
                                    
                                    {/* TO DO: ADD STATUS TO APPLICATION ON BACKEND (new, reviewed, contacted) */}
                                    {/* TO DO: ADD SORTING BY DATE AND FILTERING BY PET (and app status tbd) */}
                                </div>
                                )
                        })
                    )
                }
            </div>
    </section>
  )
}

export default AdminApplication


import Button from '../../../components/Button/Button'
import stateData from '../../../data/stateData'

import './AdminSignUp.css'
import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Input from '../../../components/Input/Input'
import { IoIosArrowRoundBack } from "react-icons/io";
import { ThemeContext } from '../../../contexts/ThemeContext'
import ForbiddenError from '../../Error/ForbiddenError'

const AdminSignUp = ({signupFormData, setSignUpFormData, handleSignup, errorMessage, setErrorMessage}) => {
    const [usStates, setUsStates] = useState([]);
    const {theme} = useContext(ThemeContext)
 

    useEffect(() => {
        setUsStates(stateData())
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target
        setErrorMessage([null])
        setSignUpFormData((prevFormData) => ({...prevFormData, [name]: value}))
    }

    const onSignupButtonClick = (e) => {
        e.preventDefault();
        handleSignup();
    }

    return (


        <div>
            <div className="auth-container" >
                
                <div className={`admin-signup-container auth-${theme}`} >
                    <h2>Create Admin Account</h2>

                    <div className="signup-form-container" id="admin-signup">
                        <form className="signup-form">
                            <div className='error'>
                                {   
                                    errorMessage !== null &&
                                    (errorMessage.length > 1 ? errorMessage.map((error, i) => {
                                        return <div key={i}>{error}</div>
                                    }) : errorMessage)
                                }
                            </div>
                            <div className="input-container">
                                <Input type={'text'}name={'firstName'} placeholder={'First Name'} onChange={handleChange} labelTextBefore={'First Name'} />
                            </div>

                            <div className="input-container">
                                <Input type={'text'}name={'lastName'} placeholder={'Last Name'} onChange={handleChange} labelTextBefore={'Last Name'} />
                            </div>

                            <div className="input-container">
                                <Input type={'text'}name={'email'} placeholder={'Email'} onChange={handleChange} labelTextBefore={'Email'} />
                            </div>

                            <div className="input-container">
                                <Input type={'text'}name={'phoneNumber'} placeholder={'Phone Number'} onChange={handleChange} labelTextBefore={'Phone Number'} />
                            </div>

                            <div className="input-container">
                                <Input type={'text'}name={'username'} placeholder={'Username'} onChange={handleChange} labelTextBefore={'Username'}/>
                            </div>

                            <div className="pw-container input-container">
                                <Input type={'password'}name={'password'} placeholder={'Password'} onChange={handleChange} labelTextBefore={'Password'}/>
                            </div>

                            <div className="input-container">
                                <Input type={'text'}name={'street'} placeholder={'Street Address'} onChange={handleChange} labelTextBefore={'Street Address'}/>
                            </div>

                            <div className="input-container">
                                <Input type={'text'}name={'city'} placeholder={'City'} onChange={handleChange} labelTextBefore={'City'}/>
                            </div>

                            <div className="state-zip">
                                <div className="ic2-state input-container">
                                    <label htmlFor='state'>State</label>
                                    <select className="state-dropdown" type="text" name="state" placeholder='State' onChange={handleChange}>State
                                        {
                                            usStates.map((state,i) => {
                                                return <option key={i} value={state}>{state}</option>
                                            })
                                            
                                        }
                                    </select>
                                </div>

                                <div className="ic2-zip input-container">
                                    <Input type={'text'}name={'zipcode'} placeholder={'Zipcode'} onChange={handleChange} labelTextBefore={'Zipcode'}/>
                                </div>

                            </div>

                        </form>  

                        <div id='admin-su-button'>
                            <Button text={'Create Admin'} handleClick={onSignupButtonClick}/>
                        </div>    

                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default AdminSignUp
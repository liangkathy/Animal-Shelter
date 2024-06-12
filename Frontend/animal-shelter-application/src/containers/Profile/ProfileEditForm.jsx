import { useState, useEffect } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import stateData from "../../data/stateData";
import './Profile.css'

const ProfileEditForm = ({userProfileInfo, setUserProfileInfo, onEditToggle, handleProfileChange, errorMessage}) => {
    const [usStates, setUsStates] = useState([]);
    const [formData, setFormData] = useState({
        oldPassword: "",
        address: {}
    })

    useEffect(() => {
        setUsStates(stateData());
        setFormData(userProfileInfo);
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target
        const [parent, child] = name.split('.');
   
        //any input name "address.*" (for nested address object)
        if (child) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [parent]: {
                    ...prevFormData[parent],
                    [child]: value
                }
            }))
        } else { //non-nested values

            setFormData((prevFormData) => {
                return {...prevFormData, [name]: value}
            })
        }
    }

    useEffect(() => {
    }, [formData])


    const onSaveChangesClick = (e) => {
        e.preventDefault();

        handleProfileChange(formData)
    }

    const cancelChanges = () => {
        onEditToggle()
    }

    return (
            <form className="profile-form profile-section">
                <div className='error'> 
                {
                    errorMessage !== null && (
                        Array.isArray(errorMessage) ? (
                            errorMessage.map((error, i) => <div key={i}>{error}</div>)
                        ) : (
                            <div>{errorMessage}</div>
                        )
                    )
                }
                </div>

                <div className="input-div">
                    <div className="profile-input">
                        <Input type={'text'}name={'firstName'} placeholder={'First Name'} labelTextBefore={'First Name'} onChange={handleChange} value={userProfileInfo.firstName}/>
                    </div>

                    <div className="profile-input">
                        <Input type={'text'}name={'lastName'} placeholder={'Last Name'} labelTextBefore={'Last Name'} onChange={handleChange} value={userProfileInfo.lastName}/>
                    </div>
                    
                </div>     
               
                <div className="input-div">
                        <div className="profile-input">
                            <Input type={'text'}name={'email'} placeholder={'Email'} labelTextBefore={'Email'} onChange={handleChange} value={userProfileInfo.email}/>
                        </div>

                        <div className="profile-input">
                            <Input type={'text'}name={'phoneNumber'} placeholder={'Phone Number'} labelTextBefore={'Phone Number'} onChange={handleChange} value={userProfileInfo.phoneNumber}/>
                        </div>
                </div>

                <div className="profile-input">
                    <Input type={'text'}name={'username'} placeholder={'Username'} labelTextBefore={'Username'} onChange={handleChange} value={userProfileInfo.username}/>
                </div>

                <div className=" profile-input">
                    <Input type={'password'}name={'oldPassword'} placeholder={'Old Password'} labelTextBefore={'Old Password'} onChange={handleChange}/>
                </div>
                <div className=" profile-input">
                    <Input type={'password'}name={'newPassword'} placeholder={'New Password'} labelTextBefore={'New Password'} onChange={handleChange}/>
                </div>

                <div className="profile-input">
                    <Input type={'text'}name={'address.street'} placeholder={'Street Address'} labelTextBefore={'Street Address'} onChange={handleChange} value={userProfileInfo.address.street}/>
                </div>

                <div className="profile-input">
                    <Input type={'text'}name={'address.city'} placeholder={'City'} labelTextBefore={'City'} onChange={handleChange} value={userProfileInfo.address.city}/>
                </div>

                <div className="zip-state-container">
                    <div className="profile-input state-container">
                        <label htmlFor='state'>State</label>
                        <select className="state-input" type="text" name="address.state" placeholder='State' >State
                            {
                                usStates.map((state,i) => {
                                    return <option key={i} value={state} selected={state === userProfileInfo.address.state ? true : false}>{state}</option>
                                })
                                
                            }
                        </select>
                    </div>

                    <div className="profile-input zip-container">
                        <Input type={'text'}name={'address.zipcode'} placeholder={'Zipcode'} labelTextBefore={'Zipcode'} onChange={handleChange} value={userProfileInfo.address.zipcode} />
                    </div>

                </div>
                <div className="profile-buttons pb2">
                    <div className='delete-button'>
                        <Button text={'Cancel'} style={"save-changes"} handleClick={cancelChanges} cssId={"red-button"}/>
                    </div>

                    <div className="save-profile">           
                        <Button type={'submit'} text={'Save changes'} handleClick={onSaveChangesClick}/>
                    </div> 
                    
                </div>
        </form>
    )
}

export default ProfileEditForm
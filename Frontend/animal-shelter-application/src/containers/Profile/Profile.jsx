
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import './Profile.css'
import Button from '../../components/Button/Button'
import { getData, deleteData, putDataBody, postData } from "../../api/api";
import ProfileEditForm from './ProfileEditForm'
import { AuthContext } from '../../contexts/AuthContext';
import { ThemeContext } from '../../contexts/ThemeContext';

const Profile = () => {
    const navigate = useNavigate()
    const {setCurrentUsername} = useContext(AuthContext)
    const {theme} = useContext(ThemeContext)
    const username = sessionStorage.getItem("username")

    const [userProfileInfo, setUserProfileInfo] = useState(
        {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            username: "",
            address: {
                street: "",
                city: "",
                state: "",
                zipcode: ""
            }
        }
    )

    const [errorMessage, setErrorMessage] = useState([null])

    const [isEdit, setIsEdit] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await getData(`users?username=${username}`)
            console.log(response)
            if (response.hasError) {
                console.log("message", response.message);
            }
            setUserProfileInfo(response.data)
        }
        
        fetchData();
    }, [])


    const onEditToggle = () => {
        setIsEdit(!isEdit)
        setErrorMessage([null])
    }

    const onDeleteClick = async () => {
        const response = await deleteData(`users/${username}`)
        console.log(response)

        if (response.hasError) {
            console.log("Error deleting user", response.message);
        } else {
            setCurrentUsername(null)
            navigate("/auth")
            localStorage.removeItem('token')
            sessionStorage.removeItem('username')
        }
    }

    const handleProfileChange = async (formData) => {
        const transformedData = transformEditProfileData(formData)
 
        console.log(transformedData);
        const response = await putDataBody(`users/${username}`, transformedData)
        console.log(response);

        if (response.hasError) {
            setErrorMessage(response.message.valueOf())
            console.log(userProfileInfo);
        } else {
            sessionStorage.setItem('username', response.data.username.valueOf())
            setCurrentUsername(sessionStorage.getItem('username'))

            //generates jwt
            const dataForJwt = bodyForJwtFromSignup(formData)
            getNewTokenOnUpdate(dataForJwt)

            setUserProfileInfo(formData);
            setErrorMessage(null)
            setIsEdit(!isEdit)
        }
    }

    const getNewTokenOnUpdate = async (dataForJwt) => {
        const response = await postData("login", dataForJwt);
        console.log(response);
        localStorage.removeItem('token') //remove old token
        localStorage.setItem('token', response.data.token) //set jwt token to localStorage
    }

    const bodyForJwtFromSignup = (formData) => {

        console.log(formData)

        let passwordToUse;

        if (formData.newPassword == null) {
            passwordToUse = formData.oldPassword
        } else {
            passwordToUse = formData.newPassword
        }

        const dataForJwt = {
            username: formData.username,
            password: passwordToUse
        }
        console.log(dataForJwt);
        return dataForJwt
    }

    const transformEditProfileData = (userProfileInfo) => {
        const transformedData = {
            firstName : userProfileInfo.firstName,
            lastName : userProfileInfo.lastName,
            email : userProfileInfo.email,
            phoneNumber : userProfileInfo.phoneNumber,
            username : userProfileInfo.username,
            oldPassword : userProfileInfo.oldPassword,
            newPassword : userProfileInfo.newPassword,
            address : {
                street: userProfileInfo.address.street,
                city : userProfileInfo.address.city,
                state : userProfileInfo.address.state,
                zipcode : userProfileInfo.address.zipcode
            }
        }

        return transformedData;
    }

    return (
        <section className={`profile ${theme}`}>
            <h4>Profile</h4>
            <div className='profile-container'>
                <div className='ps1 profile-section'>
                    <div className="profile-icon-large">
                        {
                            username[0].toUpperCase()
                        }
                    </div>
                    <Link to="/favorites">Favorite Pets</Link>
                    <Link to="/applications">Applications</Link>
                </div>
                    
                {
                    !isEdit ? (
                        <div className='ps2 profile-section'>
                        <div className='personal-profile'>
                        <h3>Personal Information</h3>
                            <ul className='profile-list'>
                                <li>First Name: {userProfileInfo.firstName}</li>
                                <li>Last Name: {userProfileInfo.lastName}</li> 
                                <li>Email: {userProfileInfo.email}</li>
                                <li>Phone Number: {userProfileInfo.phoneNumber}</li>
                                <li>Username: {userProfileInfo.username}</li>
                            </ul>
                        </div>
                    
                        <div className="address-profile">
                            <h3>Address</h3>
                            <ul className='profile-list'>
                                <li>Street Address: {userProfileInfo.address.street}</li>
                                <li>City: {userProfileInfo.address.city}</li>
                                <li>State: {userProfileInfo.address.state}</li>
                                <li>Zipcode: {userProfileInfo.address.zipcode}</li>
                            </ul>
                        </div>
                        
                        <div className="profile-buttons">
                            <div className='edit-button'>
                                <Button text={'Edit Profile'} style={"save-changes"} handleClick={onEditToggle}/>
                            </div>
                            <div className='delete-button'>
                                <Button text={'Delete Account'} style={"delete"} handleClick={onDeleteClick} cssId={"red-button"}/>
                            </div>
                        </div>

                        </div>) :
                        <ProfileEditForm userProfileInfo={userProfileInfo}
                                setUserProfileInfo={setUserProfileInfo}
                                onEditToggle={onEditToggle} 
                                handleProfileChange={handleProfileChange}
                                errorMessage={errorMessage} />
                }
      
                
            </div>

        </section>
    )
}

export default Profile
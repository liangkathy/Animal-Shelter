import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../../contexts/AuthContext"
import './AdminSignUpSuccess.css'
import { postData } from "../../../../api/api"

const AdminSignUpSuccess = ({signupFormData, setIsSignedUp}) => {
    const {currentUsername, setCurrentUsername} = useContext(AuthContext)

    const handleNewLogin = () => {
        const newUser = signupFormData.username
        sessionStorage.setItem('username', newUser) //switch stored username
        setCurrentUsername(newUser)

        //generates jwt
        const dataForJwt = bodyForJwtFromSignup(signupFormData)
        getTokenOnSignup(dataForJwt)

        navigate("/")
        handleIsSignedUp()
    }

    const bodyForJwtFromSignup = (signupFormData) => {
        const dataForJwt = {
            username: signupFormData.username,
            password: signupFormData.password
        }

        return dataForJwt
    }

    const getTokenOnSignup = async (dataForJwt) => {
        const response = await postData("login", dataForJwt);
        console.log(response);
        
        localStorage.setItem('token', response.data.token) //set jwt token to localStorage
    }

    const handleIsSignedUp = () => {
        setIsSignedUp(false)
    }
    
    return (
        <section className="admin-success">
            <h4>Admin user successfully created!</h4>
            <Link onClick={handleNewLogin}>Log in with new account</Link>
            <p>OR</p>
            <Link onClick={handleIsSignedUp}>Continue in current account</Link>
        </section>
    )
}

export default AdminSignUpSuccess
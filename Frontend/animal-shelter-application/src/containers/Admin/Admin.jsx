import { useContext, useState, useEffect } from "react"
import SignUp from "../../components/Auth/SignUp/SignUp"
import { postDataRestricted, verifyAdmin } from "../../api/api.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext.js";
import AdminSignUp from "./AdminSignUp/AdminSignUp.jsx";
import AdminSignUpSuccess from "./AdminSignUp/AdminSignUpSuccess/AdminSignUpSuccess.jsx";

const Admin = () => {
    const {theme} = useContext(ThemeContext)
    const [isSignedUp, setIsSignedUp] = useState(false)
    
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const response = await verifyAdmin("authorization")
            console.log(response);
            if (response.hasError) {
                console.log("message", response.message);
                navigate("/accessdenied")
            }
        }
        fetchData();
    }, [])

    const [signupFormData, setSignUpFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        username: "",
        password: "",
        street: "",
        city: "",
        state: "",
        zipcode: ""
    })

    const [errorMessage, setErrorMessage] = useState([null])

    const handleSignup = async () => {
        //creates user
        const transformedData = transformSignUpData(signupFormData)
        const response = await postDataRestricted("admin/signup", transformedData)
        
        console.log(response)

        if (response.hasError) {
            setErrorMessage(response.message.valueOf())
            if (response.hasError) {
                console.log("message", response.message);
                navigate("/accessdenied")
            }
        } else {
            setErrorMessage([null])
            setIsSignedUp(true)
            
            responseToPass = response.data
            console.log(responseToPass);
        } 
    }

    const transformSignUpData = (signupFormData) => {
        const transformedData = {
            firstName : signupFormData.firstName,
            lastName : signupFormData.lastName,
            email : signupFormData.email,
            phoneNumber : signupFormData.phoneNumber,
            username : signupFormData.username,
            password : signupFormData.password,
            address : {
                street: signupFormData.street,
                city : signupFormData.city,
                state : signupFormData.state,
                zipcode : signupFormData.zipcode
            }
        }

        return transformedData;
    }


    return (
        <section className={`${theme} admin-auth-section`}>
            {
                !isSignedUp ? <AdminSignUp signupFormData={signupFormData} 
                setSignUpFormData={setSignUpFormData}
                handleSignup={handleSignup}
                errorMessage={errorMessage} 
                setErrorMessage={setErrorMessage}/>
                :
                <AdminSignUpSuccess signupFormData={signupFormData}
                setIsSignedUp={setIsSignedUp}/>
            } 
            
        </section>
        
    )
}

export default Admin
import { useContext, useState, useEffect } from "react"
import Login from "../../components/Auth/Login/Login"
import SignUp from "../../components/Auth/SignUp/SignUp"
import { postData } from "../../api/api.js";
import { AuthContext } from "../../contexts/AuthContext.js";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../contexts/ThemeContext.js";
import { decodeJWTRoles } from "../../utils/utils.js";
import { AdminPathContext } from "../../contexts/AdminPathContext.js";
import { UserPathContext } from "../../contexts/UserPathContext.js";


const Auth = ({isLogin, setIsLogin}) => {
    const {theme} = useContext(ThemeContext)
    const {isAdminPath, setIsAdminPath} = useContext(AdminPathContext)
    const {setIsUserPath} = useContext(UserPathContext)
    const navigate = useNavigate()
    const {currentUsername, setCurrentUsername} = useContext(AuthContext);
    const usernameFromSessionStorage = sessionStorage.getItem("username")

    // useEffect(() => {
    //     if(usernameFromSessionStorage) {
    //         setCurrentUsername(usernameFromSessionStorage)
    //         navigate("/")
    //     } 
    // },[])

    const [loginFormData, setLoginFormData] = useState({
        username: "",
        password: ""
    })


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

    const handleLogin = async () => {
        const response = await postData("login", loginFormData);
        console.log(response);
        
        if (response.hasError) {
            setErrorMessage(response.message.valueOf())
            localStorage.removeItem("token")
        } else {
            sessionStorage.setItem('username', response.data.user.username.valueOf())
            setCurrentUsername(sessionStorage.getItem('username'))

            localStorage.setItem('token', response.data.token) //set jwt token to localStorage
            setErrorMessage(null)

            if(decodeJWTRoles(response.data.token)) {
                sessionStorage.setItem('adminPath', true)
                setIsAdminPath(true)
                sessionStorage.setItem('userPath', false)
                setIsUserPath(false)
                navigate("/admin/home")
            } else {
                sessionStorage.setItem('adminPath', false)
                setIsAdminPath(false)
                sessionStorage.setItem('userPath', true)
                setIsUserPath(true)
                navigate("/")
            }
            
        }
        
    }

    const handleSignup = async () => {
        //creates user
        const transformedData = transformSignUpData(signupFormData)
        const response = await postData("signup", transformedData)
        
        console.log(response)

        if (response.hasError) {
            setErrorMessage(response.message.valueOf())
        } else {
            sessionStorage.setItem('username', response.data.username.valueOf())
            setCurrentUsername(sessionStorage.getItem('username'))
            //setCurrentUsername(response.data.username.valueOf())

            //generates jwt
            const dataForJwt = bodyForJwtFromSignup(signupFormData)
            getTokenOnSignup(dataForJwt)

            setIsAdminPath(false)
            sessionStorage.setItem('userPath', true)
            setIsUserPath(true)

            setErrorMessage(null)
            navigate("/")
        } 
    }

    const getTokenOnSignup = async (dataForJwt) => {
        const response = await postData("login", dataForJwt);
        console.log(response);
        
        localStorage.setItem('token', response.data.token) //set jwt token to localStorage
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

    const bodyForJwtFromSignup = (signupFormData) => {
        const dataForJwt = {
            username: signupFormData.username,
            password: signupFormData.password
        }

        return dataForJwt
    }

    const toggleAuthMode = () => {
        setIsLogin(!isLogin)
        setErrorMessage(null) //ensure username disappears on toggle
    }

    return (
        <section className={`${theme} auth-section`}> 
            {isLogin ? <Login loginFormData={loginFormData}
                setLoginFormData={setLoginFormData}
                handleLogin={handleLogin} 
                toggleAuthMode={toggleAuthMode} 
                errorMessage={errorMessage} 
                setErrorMessage={setErrorMessage}/> 
            : 
            <SignUp signupFormData={signupFormData} 
                setSignUpFormData={setSignUpFormData}
                handleSignup={handleSignup}
                toggleAuthMode={toggleAuthMode} 
                errorMessage={errorMessage} 
                setErrorMessage={setErrorMessage} />}

        </section>
    )
}

export default Auth
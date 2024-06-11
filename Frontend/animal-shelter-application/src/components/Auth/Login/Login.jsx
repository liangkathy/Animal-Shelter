import Button from '../../Button/Button'
import Input from '../../Input/Input'
import { Link } from 'react-router-dom'
import './Login.css'
import { useContext } from 'react'
import { ThemeContext } from '../../../contexts/ThemeContext'
import GoogleLogin from "../../../assets/Google.png";
import FacebookLogin from "../../../assets/Facebook.png";
import AppleLogin from "../../../assets/Apple.png";

const Login = ({setLoginFormData, handleLogin, toggleAuthMode, errorMessage}) => {
    const {theme} = useContext(ThemeContext)

    const handleChange = (e) => {
        const {name, value} = e.target

        setLoginFormData((prevFormData) => ({...prevFormData, [name]: value}))
    }

    const onLoginButtonClick = (e) => {
        e.preventDefault();

        handleLogin();
        
    }

    return (
        <div className="auth-container">
            
            
            <div className={`login-container auth-${theme}`}>
                
                <h4 className="login-header">Log in</h4>
                
                <div className="internal-login">
                    <form className="login-form">
                        <Input type={'text'}name={'username'} placeholder={'Username'} onChange={handleChange} />
                        <Input type={'password'}name={'password'} placeholder={'Password'} onChange={handleChange} />
                        <div className="error">{errorMessage}</div>
                        <div className="extra-features">
                            <div className="rm-container">
                                <Input type={'checkbox'}name={'remember-me'} labelTextAfter={'Remember me'}/>
                            </div>
                            <Link to="/forgotpassword">Forgot password?</Link>
                        </div>
                        
                        <div className="login-button">
                            <Button text={"Log in"} handleClick={onLoginButtonClick} />
                        </div>
                    </form>
                

                    <div className="divider">
                        <div className="line"></div>
                        <p className="or">OR</p>
                        <div className="line"></div>
                    </div>

                    <div className="other-logins">
                        <img src={GoogleLogin} className='other-button'/>
                        <img src={FacebookLogin} className='other-button'/>
                        <img src={AppleLogin} className='other-button'/>
                    </div>

                </div>

                <div className="to-signup">Need an account? <Link onClick={toggleAuthMode}>Sign up</Link></div>

            </div> 
            
        </div>

    )
}

export default Login
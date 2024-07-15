
import React, { useContext } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import './LoginModal.css'
import { ThemeContext } from '../../contexts/ThemeContext';

const LoginModal = ({closeLoginModal, setIsLogin}) => {
    const {theme} = useContext(ThemeContext)
    const navigate = useNavigate()

    const setSignUp = () => {
        setIsLogin(false)
    }

    const setLogIn = () => {
      setIsLogin(true)
  }

  return (
    <div className={`modal-container modal-container-${theme}`}>
        <div id="login-modal" className={`modal-${theme}`}>
                <IoClose onClick={closeLoginModal} className='close-modal' size="1.5em"/>
                <h3>This feature requires an account</h3>
                <div>Please <Link to="/auth" onClick={setLogIn}>log in</Link> or <Link to='/auth' onClick={setSignUp}>sign up</Link></div>
        </div>
    </div>
  )
}

export default LoginModal

import Login from '../Auth/Login/Login'
import SignUp from '../Auth/SignUp/SignUp'
import './Modal.css'

import { IoClose } from "react-icons/io5";

const AuthModal = ({className}) => {

  const closeModal = () => {

  }
  return (
    <div className={`modal ${className}`}>
        <IoClose className='close-modal' onClick={closeModal}/>
        <h3>Sign up or Log in</h3>
        
    </div>
  )
}

export default AuthModal


import { useContext, useState } from 'react'
import './PetDetails.css'
import { ThemeContext } from '../../contexts/ThemeContext.js'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { calculateAge } from "../../utils/utils.js";
import petImage from "../../assets/hold-img.png";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { PetsContext } from '../../contexts/PetsContext.js';
import { AuthContext } from '../../contexts/AuthContext.js';
import LoginModal from '../../components/LoginModal/LoginModal.jsx';

const PetDetails = ({setIsLogin}) => {
    const {theme} = useContext(ThemeContext)
    const {allPets} = useContext(PetsContext)
    const {currentUsername} = useContext(AuthContext)
    const {petId} = useParams()
    const pet = allPets.find(p => p.id === parseInt(petId))
    const [isLoginPrompt, setIsLoginPrompt] = useState(false)
    const navigate = useNavigate()

    if (!pet) {
        return (<h4>Pet not found!</h4>)
    }

    const handleBackOnClick = () =>{
        window.history.back()
    }

    const onApply = () => {
        if (!currentUsername) {
            console.log("User not logged in");
            openLoginModal();
        } else {
            navigate("/apply")
        }
    }

    const openLoginModal = () => {
        setIsLoginPrompt(true)
    }

    const closeLoginModal = () => {
        setIsLoginPrompt(false)
    }
    

    return (
        <section className={`${theme} details-container`}>
            <div>
                <Link onClick={handleBackOnClick} className='back-link'><IoIosArrowRoundBack size="2em"/> Back</Link>
            </div>

            <div className="pet-details">
                <h4>{pet.name}</h4>
                <img src=
                {
                    pet.imgURL === "./assets/hold-img.png" ? `${petImage}` : `${imgURL}`
                } 
                    alt="pet image" width="250px" />
                <div>Age: {calculateAge(pet.dob)}</div>
                <div>Breed: {pet.breed}</div>
                <div>Sex: {pet.sex}</div>
                <div>Weight: {`${pet.weight} pounds`}</div>
                <div>Date of birth: {pet.dob}</div>
                <Link onClick={onApply} className="apply-link">{`Apply for ${pet.name} here`}
                    <IoIosArrowRoundForward size="2.1em"/>
                </Link>
            </div>
            
            {
                isLoginPrompt && 
                <LoginModal 
                    closeLoginModal={closeLoginModal}
                    setIsLoginPrompt={setIsLoginPrompt} 
                    setIsLogin={setIsLogin} />
            } 
            
        </section>
    )
}

export default PetDetails
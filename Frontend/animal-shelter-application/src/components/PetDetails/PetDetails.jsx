
import { useContext } from 'react'
import './PetDetails.css'
import { ThemeContext } from '../../contexts/ThemeContext'
import { Link, useParams } from 'react-router-dom'
import { calculateAge } from "../../utils/utils.js";
import petImage from "../../assets/hold-img.png";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { PetsContext } from '../../contexts/PetsContext.js';

const PetDetails = () => {
    const {theme} = useContext(ThemeContext)
    const {allPets} = useContext(PetsContext)
    const {petId} = useParams()
    const pet = allPets.find(p => p.id === parseInt(petId))

    if (!pet) {
        return (<h4>Pet not found!</h4>)
    }

    const handleBackOnClick = () =>{
        window.history.back()
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
                <Link to="/apply" className="apply-link">{`Apply for ${pet.name} here`}
                    <IoIosArrowRoundForward size="2.1em"/>
                </Link>
            </div>

            
        </section>
    )
}

export default PetDetails
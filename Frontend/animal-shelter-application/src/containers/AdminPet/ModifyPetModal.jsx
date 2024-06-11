import { useContext, useEffect, useState } from 'react';
import './AdminPet.css'
import { IoClose } from "react-icons/io5";
import { PetsContext } from '../../contexts/PetsContext';
import petImage from '../../assets/hold-img.png'
import { ThemeContext } from '../../contexts/ThemeContext';
import { MdModeEdit } from "react-icons/md";
import { getData } from '../../api/api';
import Multiselect from 'multiselect-react-dropdown';

const ModifyPetModal = ({setModalClose, petId}) => {
    const {theme} = useContext(ThemeContext)
    const {allPets} = useContext(PetsContext)
    const pet = allPets.find(p => p.id === parseInt(petId))
    const [availableMicrochips, setAvailableMicrochips] = useState([null])

    const closeModal = () => {
        setModalClose(true)
    }

    if (!pet) {
        return (<h4>Pet not found!</h4>)
    }

    useEffect(() => {

        const fetchData = async () => {
            const response = await getData("microchips?available=true")
            console.log(response);
            if (response.hasError) {
                console.log("message", response.message);
                navigate("/accessdenied")
            }
            setAvailableMicrochips(response.data.map(chip => chip.id))
        }
        fetchData();
    
    }, [])

    return (
    <div className="modal-container">
        <div className={`pet-modal modal-${theme}`}>
            <IoClose onClick={closeModal} className='close-modal' size="1.5em"/>
            <h3>Edit Pet Details</h3>
            <div className="modal-pet-details">
                <div className='img-div'>
                    <img src=
                    {
                        pet.imgURL === "./assets/hold-img.png" ? `${petImage}` : `${imgURL}`
                    } 
                        alt="pet image" width="35%" />
                    <MdModeEdit className='img-edit pencil'/>
                </div>
                <div>Name: {pet.name}</div>
                <div>Breed: {pet.breed}</div>
                <div>Sex: {pet.sex}</div>
                <div>Date of birth: {pet.dob}</div>
                <div className='weight-div'>Weight: {`${pet.weight} pounds`} 
                    <MdModeEdit className='weight-edit pencil'/>
                </div>
                <div>Microchip: {pet.microchip ? pet.microchip.id : 
                        availableMicrochips.length > 0 && 
                        availableMicrochips.map((chip, i) => {
                            return <div>{chip}</div>
                        })
                        // <Multiselect /> : "None"
                    }
                </div>
            </div>
        </div>
    </div>
    )
}

export default ModifyPetModal
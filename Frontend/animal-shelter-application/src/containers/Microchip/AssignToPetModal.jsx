import React, { useState } from 'react'
import { useContext } from 'react'
import { IoClose } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';
import Button from '../../components/Button/Button';
import { PetsContext } from '../../contexts/PetsContext';
import { putDataBody } from '../../api/api';

const AssignToPetModal = ({petsWithoutChip, setPetsWithoutChip, closeAssignToPetModal, chipId, company, setAllMicrochips, allMicrochips}) => {
    const {theme} = useContext(ThemeContext)
    const {allPets} = useContext(PetsContext)
    const [errorMessage, setErrorMessage] = useState(null)

    const [formData, setFormData] = useState({
        id: chipId,
        company: company,
        petId: null,
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
    
        // Update microchip dto form
        setFormData((prevFormData) => {
            return {...prevFormData, [name]: value}
        })
    };

    const handleSave = async () => {
        console.log(formData);
        const response = await putDataBody(`microchips/${chipId}`, formData)
        console.log(response);

        if (response.hasError) {
            console.log(response.message);
            setErrorMessage(response.message)
        } else {
            handleClose(response.data)
            setErrorMessage([null])
        }
    }

    const handleClose = (chip) => {
        if (chip != allMicrochips.find(c => c.id === parseInt(chipId))) {
            console.log("creating new chips list");
            const removedChip = allMicrochips.filter(c => c.id != chipId)
            const updatedChips = [...removedChip, chip]

            setAllMicrochips(updatedChips)
        }
        if (formData.petId != null) {
            const updatedPetsWithoutChip = petsWithoutChip.filter(id => id != parseInt(formData.petId))
            setPetsWithoutChip(updatedPetsWithoutChip)
        }

        closeAssignToPetModal()
    }

    return (
        <div className={`modal-container modal-container-${theme}`}>
            <div id="assign-pet-modal" className={`modal-${theme}`}>
                <IoClose onClick={closeAssignToPetModal} className='close-modal' size="1.5em"/>
                <h3>Assign to Pet</h3>
                    {
                        errorMessage !== null && (
                                Array.isArray(errorMessage) ? (
                                    errorMessage.map((error, i) => <div key={i} className='error'>{error}</div>)
                                ) : (
                                    <div className='error'>{errorMessage}</div>
                                )
                            )
                    }
                <select className='assign-pet-dropdown' 
                        type="text" 
                        name="petId" 
                        onChange={handleChange}
                        >
                        
                        <option value="null">None</option>
                        {
                            petsWithoutChip.length > 0 &&
                            petsWithoutChip.map((pet, i) => {
                                return <option key={i} value={pet.id}>{pet.name}</option>
                            })
                        }
                </select>
                <div className='add-buttons'>
                    <Button text={'Assign pet'}
                    handleClick={() => handleSave()}
                        />
                    <Button text={'Cancel'} 
                        cssId={'red-button'}
                        handleClick={closeAssignToPetModal} />
            </div>
            </div>

            
        </div>
  )
}

export default AssignToPetModal

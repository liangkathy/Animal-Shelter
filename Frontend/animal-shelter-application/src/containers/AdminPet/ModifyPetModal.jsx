import { useContext, useEffect, useRef, useState } from 'react';
import './AdminPet.css'
import { IoClose } from "react-icons/io5";
import { PetsContext } from '../../contexts/PetsContext';
import petImage from '../../assets/hold-img.png'
import { ThemeContext } from '../../contexts/ThemeContext';
import { MdModeEdit } from "react-icons/md";
import { getData, putDataBody } from '../../api/api';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

const ModifyPetModal = ({closeModal, petId, availableMicrochipsIds, availableMicrochips, setAvailableMicrochips, setAvailableMicrochipsIds}) => {
    const {theme} = useContext(ThemeContext)
    const {allPets, setAllPets} = useContext(PetsContext)
    const [pet, setPet] = useState(allPets.find(p => p.id === parseInt(petId)))
    const [isEditImage, setIsEditImage] = useState(false)
    const [isEditWeight, setIsEditWeight] = useState(false)
    const [isEditMicrochip, setIsEditMicrochip] = useState(false)

    const [petEditForm, setPetEditForm] = useState(
        {
            name: pet.name,
            type: pet.type,
            breed: pet.breed,
            dob: pet.dob,
            sex: pet.sex,
            weight: pet.weight,
            microchipId: pet.microchip ? parseInt(pet.microchip.id) : null,
            imgURL: pet.imgURL ? pet.imgURL : null
        }
    )


    if (!pet) {
        return (<h4>Pet not found!</h4>)
    }

    const handleMicrochipEdit = () => {
        setIsEditMicrochip(true)
    }

    const handleImageEdit = () => {
        setIsEditImage(true)
    }

    const handleWeightEdit = () => {
        setIsEditWeight(true)
    }

    const cancelEdits = () => {
        setIsEditImage(false)
        setIsEditMicrochip(false)
        setIsEditWeight(false)
    }

    const handleChange = (e) => {
        const {name, value} = e.target
        console.log(value, name);

        setPetEditForm((prevFormData) => {
            return {...prevFormData, [name]: value}
        })
    }

    const handleSave = async () => {
        const response = await putDataBody(`pets/${petId}`, petEditForm)
        console.log(response);

        if (response.hasError) {
            console.log(response.message);
        } else {
            setIsEditImage(false)
            setIsEditMicrochip(false)
            setIsEditWeight(false)

            if (pet != petEditForm) {

                setPet((prevPet) => {
                    return {...prevPet, 
                        weight: petEditForm.weight, 
                        imgURL: petEditForm.imgURL,
                        microchip: availableMicrochips.find(chip => chip.id = petEditForm.microchipId)
                    }
                })

            }


        }
    }

    const handleClose = () => {
        
        if (pet != allPets.find(p => p.id === parseInt(petId))) {
            console.log("creating new pets list");
            const removedPet = allPets.filter(pet => pet.id != petId)
            const updatedPets = [...removedPet, pet]

            setAllPets(updatedPets)
        }

        if (petEditForm.microchipId != null) {
            const updatedIds = availableMicrochipsIds.filter(id => id != parseInt(petEditForm.microchipId))
            setAvailableMicrochipsIds(updatedIds)
            const updatedChips = availableMicrochips.filter(chip => chip.id != parseInt(petEditForm.microchipId))
            setAvailableMicrochips(updatedChips)
        }
        
        closeModal()   
    }

    useEffect(() => {

    },[allPets, pet])

    
    return (
        <div className={`modal-container modal-container-${theme}`}>
            <div className={`pet-modal modal-${theme}`}>
                <IoClose onClick={handleClose} className='close-modal' size="1.5em"/>
                <h3>Edit Pet Details</h3>
                <div className="modal-pet-details">
                    <div className='img-div'>
                        <img src=
                        {   
                            pet.imgURL ?
                            (pet.imgURL === "./assets/hold-img.png" ? `${petImage}` : `${pet.imgURL}`)
                            :` ${petImage}`
                        } 
                            alt="pet image" width="35%" />
                        <MdModeEdit className={`img-edit pencil pencil-${theme}`} onClick={handleImageEdit}/>
                    </div>
                    <div>Name: {pet.name}</div>
                    <div>Breed: {pet.breed}</div>
                    <div>Sex: {pet.sex}</div>
                    <div>Date of birth: {pet.dob}</div>
                    <div className='weight-div'>Weight: 
                        { !isEditWeight ?
                            <>
                                {` ${pet.weight} pounds`}
                                <MdModeEdit className={`weight-edit pencil pencil-${theme}`} onClick={handleWeightEdit}/>
                            </>
                            :
                            <Input type={'number'} 
                                name={'weight'} 
                                placeholder={'Weight'} 
                                value={`${pet.weight}`} 
                                labelTextAfter={"pounds"} 
                                style={'weight-input'}
                                onChange={handleChange} />
                        }
                    </div>
                    <div className='chip-edit-div'>Microchip:
                        {
                            pet.microchip ? (` ${pet.microchip.id}`) : 
                            !isEditMicrochip ? <> None<MdModeEdit className={`chip-edit pencil pencil-${theme}`} onClick={handleMicrochipEdit}/></> :
                            availableMicrochipsIds.length > 0 &&
                                <select className='chip-dropdown' type="text" name="microchipId" onChange={handleChange}>
                                    <option value="null">None</option>
                                    {
                                        availableMicrochipsIds.map((chip, i) => {
                                            return <option key={i} value={chip}>{chip}</option>
                                        })
                                    }
                                </select>
                        }
                    </div>
                </div>
                <div className='edit-buttons'>
                    <Button text={'Save changes'} 
                        style={isEditImage || isEditMicrochip || isEditWeight ? undefined : "hidden"}
                        handleClick={() => handleSave(petEditForm)} />
                    
                    <Button text={'Cancel'} 
                        style={isEditImage || isEditMicrochip || isEditWeight ? undefined : "hidden"} 
                        cssId={"red-button"} 
                        handleClick={cancelEdits}/>
                </div>
                

            </div>
        </div>
    )
}

export default ModifyPetModal
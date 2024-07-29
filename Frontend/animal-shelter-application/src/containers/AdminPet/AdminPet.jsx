import { useContext, useEffect, useState } from 'react'
import './AdminPet.css'
import { ThemeContext } from '../../contexts/ThemeContext'
import { PetsContext } from '../../contexts/PetsContext'
import ModifyPetCard from './ModifyPetCard/ModifyPetCard'
import { calculateAge } from '../../utils/utils'
import { deleteData, getData } from '../../api/api'
import { FaPlus } from "react-icons/fa6";
import ModifyPetModal from './ModifyPetModal'
import { Link } from 'react-router-dom'
import AddPetModal from './AddPetModal'

const AdminPet = () => {
    const {theme} = useContext(ThemeContext)
    const {allPets, setAllPets} = useContext(PetsContext)
    const [modalClose, setModalClose] = useState(true)
    const [petId, setPetId] = useState()
    const [isAddPet, setIsAddPet] = useState(false)
    const [availableMicrochipsIds, setAvailableMicrochipsIds] = useState([null])
    const [availableMicrochips, setAvailableMicrochips] = useState([])

    const handleDelete = async (id) => {
        console.log("Deleting pet..." + id);
        const response = await deleteData(`pets/${id}`)
        console.log(response)
        if (response.hasError) {
            console.log("Error deleting pet", response.message);
        } else {
            setAllPets(allPets.filter(pet => pet.id !== id))
        }
    }

    //fetch pets when component mounts (ensures re-render with updated pets)
    useEffect(() => {
    }, [allPets, petId, availableMicrochips, availableMicrochipsIds])

    useEffect(() => {

        const fetchData = async () => {
            const response = await getData("microchips?available=true")
            if (response.hasError) {
                console.log("message", response.message);
                navigate("/accessdenied")
            }
            setAvailableMicrochipsIds(response.data.map(chip => chip.id))
            setAvailableMicrochips(response.data)
        }
        fetchData();
    
    }, [])
   
    const openEditModal = (id) => {
        setModalClose(false)
        setPetId(id)
    }

    const closeEditModal = () => {
        setModalClose(true)
       
    }

    const openAddModal = () => {
        setIsAddPet(true)
    }

    const closeAddModal = () => {
        setIsAddPet(false)
    }

    return (
        <section className={`modify-pet-section ${theme}`}>
            <h4>Modify Pet Information</h4>
            <Link id="plus" className={`add-container a-${theme}`} onClick={openAddModal}>
                <FaPlus className='add-button' size="1em"/>
                Add Pet
            </Link>

            <div className="pet-card-container">
                {
                    allPets.length === 0 ? 
                    <div>
                        <h3 id='no-pets'>No pets were found!</h3>
                        <div className='add-prompt'>Add to the database <Link onClick={openAddModal}>here</Link></div>
                    </div>
                    :
                    allPets.map((pet, i) => {
                        return <ModifyPetCard key={i} 
                                    id={pet.id}
                                    name={pet.name} 
                                    sex={pet.sex} 
                                    age={calculateAge(pet.dob)} 
                                    breed={pet.breed} 
                                    imgURL={pet.imgURL}
                                    chip={!pet.microchip ? 'No microchip' : `Microchip: ${pet.microchip.id}`}
                                    addId={pet.type} 
                                    handleDelete={handleDelete}
                                    openEditModal={openEditModal} />
                        })
                }
            </div>
             
            {
                !modalClose && <ModifyPetModal 
                    petId={petId} 
                    closeModal={closeEditModal}
                    availableMicrochips={availableMicrochips}
                    setAvailableMicrochips={setAvailableMicrochips}
                    availableMicrochipsIds={availableMicrochipsIds}
                    setAvailableMicrochipsIds={setAvailableMicrochipsIds}
                    />
            }

            {
                isAddPet && <AddPetModal 
                    closeAddModal={closeAddModal}
                    availableMicrochips={availableMicrochips}
                    setAvailableMicrochips={setAvailableMicrochips}
                    availableMicrochipsIds={availableMicrochipsIds}
                    setAvailableMicrochipsIds={setAvailableMicrochipsIds} 
                    />
            }

            
        </section>
    )
}

export default AdminPet
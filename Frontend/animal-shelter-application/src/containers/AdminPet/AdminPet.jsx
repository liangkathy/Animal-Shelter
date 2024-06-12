import { useContext, useEffect, useState } from 'react'
import './AdminPet.css'
import { ThemeContext } from '../../contexts/ThemeContext'
import { PetsContext } from '../../contexts/PetsContext'
import ModifyPetCard from './ModifyPetCard/ModifyPetCard'
import { calculateAge } from '../../utils/utils'
import { deleteData, getData, putDataBody } from '../../api/api'
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
            console.log(response);
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
            <Link id="plus" className='add-container' onClick={openAddModal}>
                <FaPlus className='add-button' size="1em"/>
                Add Pet
            </Link>

            <div className="pet-card-container">
                {
                    allPets.length === 0 ? <h3>No pets found!</h3> :
                    
                    
                    allPets.map((pet, i) => {
                        return <ModifyPetCard key={i} 
                                    id={pet.id}
                                    name={pet.name} 
                                    sex={pet.sex} 
                                    age={calculateAge(pet.dob)} 
                                    breed={pet.breed} 
                                    imgURL={pet.imgURL}
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
                    availableMicrochipsIds={availableMicrochipsIds}
                    />
            }

            {
                isAddPet && <AddPetModal 
                    closeAddModal={closeAddModal}
                    availableMicrochips={availableMicrochips}
                    setAvailableMicrochips={setAvailableMicrochips}
                    availableMicrochipsIds={availableMicrochipsIds}
                    setAvailableMicrochipsIds={setAvailableMicrochipsIds} />
            }

            
        </section>
    )
}

export default AdminPet
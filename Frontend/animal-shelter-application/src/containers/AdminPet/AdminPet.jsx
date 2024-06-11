import { useContext, useEffect, useState } from 'react'
import './AdminPet.css'
import { ThemeContext } from '../../contexts/ThemeContext'
import { PetsContext } from '../../contexts/PetsContext'
import ModifyPetCard from './ModifyPetCard/ModifyPetCard'
import { calculateAge } from '../../utils/utils'
import { deleteData } from '../../api/api'
import { render } from 'react-dom'
import { AiFillFilePpt } from 'react-icons/ai'
import ModifyPetModal from './ModifyPetModal'

const AdminPet = () => {
    const {theme} = useContext(ThemeContext)
    const {allPets, setAllPets} = useContext(PetsContext)
    const [modalClose, setModalClose] = useState(true)
    const [petId, setPetId] = useState()
    

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
    }, [allPets])
   
    const openEditModal = (id) => {
        setModalClose(false)
        setPetId(id)
    }

    return (
        <section className={`modify-pet-section ${theme}`}>
            <h4>Modify Pet Information</h4>

            <div className="pet-card-container">
                {
                    allPets.length === 0 ? <h3>No pets here, check back again later!</h3> :
                    
                    
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
                !modalClose && <ModifyPetModal setModalClose={setModalClose} petId={petId}/>
            }
            
        </section>
    )
}

export default AdminPet
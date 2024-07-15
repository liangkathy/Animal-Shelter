import { useContext } from 'react'
import petImage from '../../../assets/hold-img.png'
import Button from '../../../components/Button/Button'
import { ThemeContext } from '../../../contexts/ThemeContext'


const ModifyPetCard = ({id, name, sex, age, breed, imgURL, chip, addId, handleDelete, openEditModal}) => {

    return (
        <div className="modify-pet-container pet-snapshot" id={id}>
            <img src=
            {
                imgURL === "./assets/hold-img.png" ? `${petImage}` : `${imgURL}`
            } 
                alt="pet image" width="180px" />

            <h3>{name}</h3>
            <div>{age}</div>
            <div>{sex}</div>
            <div>{breed}</div>
            <div>{chip}</div>
            
            <div className='modify-pet-buttons'>
                <Button text={"Edit"} handleClick={() => openEditModal(id)}/>
                <Button text={"Delete"} 
                    cssId={"red-button"} 
                    handleClick={() => handleDelete(id)}/>
            </div>
        </div>
    )
}

export default ModifyPetCard
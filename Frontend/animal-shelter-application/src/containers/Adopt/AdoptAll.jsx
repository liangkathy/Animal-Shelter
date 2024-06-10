import Pet from "../Pet/Pet.jsx"
import { useContext, useEffect, useState } from "react"
import "./Adopt.css"
import { getData } from "../../api/api"
import { calculateAge } from '../../utils/utils.js'
import { Link } from "react-router-dom"
import { ThemeContext } from "../../contexts/ThemeContext.js"
import { PetsContext } from "../../contexts/PetsContext.js"
import FavoritesHeart from "../../components/FavoritesHeart/FavoritesHeart.jsx"


const AdoptAll = ({count}) => {
    const {theme} = useContext(ThemeContext)
    const {allPets, setAllPets} = useContext(PetsContext)

    return (
        <section className={`adopt-section ${theme}`}>
            <div className="adopt-header">
                <h4>All Adoptable Pets</h4>
                <FavoritesHeart />
            </div>
            <div className="adopt-nav">
                <Link to="/adopt/dogs">See Adoptable Dogs</Link>
                <Link to="/adopt/cats">See Adoptable Cats</Link>
                <Link to="/adopt/other">See Other Animals</Link>
            </div>
            <div className="pet-card-container">
                {
                    allPets.length === 0 ? <h3>No pets here, check back again later!</h3> :
                    
                    
                    allPets.map((pet, i) => {
                        return <Pet key={i} 
                                    id={pet.id}
                                    name={pet.name} 
                                    sex={pet.sex} 
                                    age={calculateAge(pet.dob)} 
                                    breed={pet.breed} 
                                    imgURL={pet.imgURL}
                                    addId={pet.type} />
                        })
                }
            </div>
        </section>
    )
}

export default AdoptAll
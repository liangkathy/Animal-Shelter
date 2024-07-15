import Pet from '../../Pet/Pet.jsx'
import { calculateAge } from '../../../utils/utils.js'
import { useContext, useEffect, useState } from "react"
import "../Adopt.jsx"
import { getDataPublic } from "../../../api/api.js"
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../../contexts/ThemeContext.js'
import FavoritesHeart from "../../../components/FavoritesHeart/FavoritesHeart.jsx"


const AdoptOther = ({setIsLogin}) => {
    const {theme} = useContext(ThemeContext)
    const [otherPets, setOtherPets] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getDataPublic("pets?type=other")
            if (response.hasError) {
                console.log("message", response.message);
            }
            setOtherPets(response.data)
        }
        
        fetchData();
    }, [])

    return (
        <section className={`adopt-section ${theme}`}>
            <div className="adopt-header">
                <h4>Other Adoptable Animals</h4>
                <FavoritesHeart />
            </div>
            <div className="adopt-nav">
                <Link to="/adopt/all">See All Adoptables</Link>
                <Link to="/adopt/dogs">See Adoptable Dogs</Link>
                <Link to="/adopt/cats">See Adoptable Cats</Link>
            </div>
            <div className="pet-card-container">
                {
                    otherPets.length === 0 ? <h3>No pets here, check back again later!</h3> : 

                    otherPets.map((pet, i) => {
                        return <Pet key={i} 
                                    id={pet.id}
                                    name={pet.name} 
                                    sex={pet.sex} 
                                    age={calculateAge(pet.dob)} 
                                    breed={pet.breed} 
                                    imgURL={pet.imgURL}
                                    addId={'other'} 
                                    setIsLogin={setIsLogin} />
                        })
                }
            </div>
        
        </section>
    )
}

export default AdoptOther
import Pet from '../../Pet/Pet.jsx'
import { calculateAge } from '../../../utils/utils.js'
import { useContext, useEffect, useState } from "react"
import "../Adopt.jsx"
import { getDataPublic } from "../../../api/api.js"
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../../contexts/ThemeContext.js'
import FavoritesHeart from "../../../components/FavoritesHeart/FavoritesHeart.jsx"

const AdoptDogs = ({setIsLogin}) => {
    const {theme} = useContext(ThemeContext)
    const [allDogs, setAllDogs] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const response = await getDataPublic("pets?type=dog")
            if (response.hasError) {
                console.log("message", response.message);
            }
            setAllDogs(response.data)
        }
        
        fetchData();
    }, [])

    return (
        <section className={`adopt-section ${theme}`}>
            <div className="adopt-header">
                <h4>Adoptable Dogs</h4>
                <FavoritesHeart />
            </div>
            <div className="adopt-nav">
                <Link to="/adopt/all">See All Adoptables</Link>
                <Link to="/adopt/cats">See Adoptable Cats</Link>
                <Link to="/adopt/other">See Other Animals</Link>
            </div>
            <div className="pet-card-container">
                {
                    allDogs.length === 0 ? <h3>No pets here, check back again later!</h3> : 

                    allDogs.map((pet, i) => {
                        return <Pet key={i} 
                                    id={pet.id}
                                    name={pet.name} 
                                    sex={pet.sex} 
                                    age={calculateAge(pet.dob)} 
                                    breed={pet.breed} 
                                    imgURL={pet.imgURL} 
                                    addId={'dog'} 
                                    setIsLogin={setIsLogin} />
                        })
                }
            </div>
        </section>
    )
}

export default AdoptDogs
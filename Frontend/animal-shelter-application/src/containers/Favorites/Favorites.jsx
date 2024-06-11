import './Favorites.css'
import { useContext, useState } from 'react'
import { useEffect } from 'react'
import { putData, getData } from "../../api/api"
import Pet from '../Pet/Pet'
import { calculateAge } from "../../utils/utils";
import { Link, useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../contexts/ThemeContext'
import { FavoritesContext } from '../../contexts/FavoritesContext'

const Favorites = () => {
    const {theme} = useContext(ThemeContext)
    const [favoritePets, setFavoritePets] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const username = sessionStorage.getItem("username");
  
        const fetchData = async () => {
            const response = await getData(`pets/users/${username}`)
  
            if (response.hasError) {
                console.log("message", response.message);
                if (response.status == 401) {
                    navigate("/accessdenied")
                }
            }
            setFavoritePets(response.data)
        }
        
        fetchData();

    }, [])

    return (
        <section className={`favorites-main ${theme}`}>
            <h4>Favorites</h4>

            <div className="favorites-container">
                {
                    favoritePets.length === 0 ? <h3>No favorites added yet! See all of our adoptable pets <Link to="/adopt/all">here</Link>.</h3> :

                    favoritePets.map((pet, i) => {
                        return <Pet key={i} 
                                    id={pet.id}
                                    name={pet.name} 
                                    sex={pet.sex} 
                                    age={calculateAge(pet.dob)} 
                                    breed={pet.breed} 
                                    imgURL={pet.imgURL}
                                    addId={pet.type}  />
                        })
                }
            </div>
        </section>
    )
}

export default Favorites
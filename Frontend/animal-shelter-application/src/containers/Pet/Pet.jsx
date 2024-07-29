import { Link } from 'react-router-dom'
import petImage from '../../assets/hold-img.png'
import { IoIosArrowRoundForward } from "react-icons/io";
import { useState, useEffect, useContext } from 'react';
import { putData, getData } from "../../api/api"
import Heart from '../../components/Heart/Heart';
import './Pet.css'
import { FavoritesContext } from '../../contexts/FavoritesContext';
import { ThemeContext } from '../../contexts/ThemeContext';

const Pet = ({id, name, sex, age, breed, imgURL, addId, setIsLogin}) => {
    const username = sessionStorage.getItem("username");
    const {theme} = useContext(ThemeContext)
    const {favoritedPetIds, setFavoritedPetIds} = useContext(FavoritesContext)
    // const [isClicked, setIsClicked] = useState(false)
    // const [isLoggedIn, setIsLoggedIn] = useState(false)

    // useEffect(()=> {
    //     const checkLoggedIn = () => {
            
    //         if (sessionStorage.username != null) {
    //             setIsLoggedIn(true)
    //         } else {
    //             setIsLoggedIn(false)
    //         }
    //     }
    //     checkLoggedIn()
    // },[])
    
    useEffect(() => {
        const username = sessionStorage.getItem("username");
        
        const fetchData = async () => {
            const response = await getData(`pets/users/${username}`)
            console.log("Call response: " + response)
            if (response.hasError) {
                console.log("message", response.message);
            }
            //setFavoritePets(response.data)
            const petIds = response.data ? response.data.map(pet => pet.id.valueOf()): [];
            setFavoritedPetIds(petIds);
        }
        
        fetchData();

    }, [])


    const handleFavoriteAdd = async (petId) => {
        console.log("Adding to favorites", petId);

        const response = await putData(`users/${username}/pets/${petId}/add`) //run patch request > will ensure username and pet id are valid
        console.log(response);

        if (response.hasError) {
            console.log(response.message);
        } else {
            setFavoritedPetIds(prevData => ([
                ...prevData, petId
            ])) //add petId to list
        }
    }

    const handleFavoriteDelete = async (petId) => {
        console.log("Already exists as favorite", petId)
        const response = await putData(`users/${username}/pets/${petId}/delete`)
        console.log(response);

        if (response.hasError) {
            console.log(response.message);
        } 
        else {
            const newPetIds = favoritedPetIds.filter(id => id != petId); //keep all ids that are not the petId
            setFavoritedPetIds(newPetIds) //set list to the new one
        }
    }


    return (
        <div className={`pet-snapshot pet-snapshot-${theme}`} id={addId}>
            <img src=
            {
                imgURL === "./assets/hold-img.png" ? `${petImage}` : `${imgURL}`
            } 
                alt="pet image" width="180px" />

            <h3>{name}</h3>
            <div>{age}</div>
            <div>{sex}</div>
            <div>{breed}</div>

            <Link to={`/pets/${id}`} className={`meet-link a-${theme}`}>Meet 
                <IoIosArrowRoundForward size="2em"/>
            </Link>
            <Heart size={'1.5em'} 
                    petId={id} 
                    handleFavoriteAdd={handleFavoriteAdd}
                    handleFavoriteDelete={handleFavoriteDelete} 
                    favoritedPetIds={favoritedPetIds}
                    setIsLogin={setIsLogin}
                    />
        </div>
    )
}

export default Pet
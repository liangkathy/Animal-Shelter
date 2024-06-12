
import './Heart.css'
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import AuthModal from '../Modal/AuthModal';
import { useContext, useEffect, useState } from 'react';
import { IoIosLogIn } from 'react-icons/io';
import { AuthContext } from '../../contexts/AuthContext';

const Heart = ({petId, handleFavoriteAdd, handleFavoriteDelete, size, favoritedPetIds}) => {
    const {currentUsername} = useContext(AuthContext)
    const isFavorited = favoritedPetIds.some(id => id === petId)

    const onHeartToggle = (e) => {
        if (!currentUsername) {
            console.log("User not logged in");
        } else {
            //handling based whether pet is part of the favorited list
            if(!isFavorited) {
                console.log("Is not favorite", isFavorited, petId);
                handleFavoriteAdd(petId); //should be pet id
            }
            if (isFavorited) {
                console.log("Is favorite", isFavorited, petId);
                handleFavoriteDelete(petId);
            }
        }
    
    }

    return (
        <div >
            {
                !isFavorited ? 
                    <FaRegHeart id={petId} 
                        className="heart-outline" 
                        size={size} 
                        onClick={onHeartToggle}/> :
                    <FaHeart id={petId} 
                        className="heart-solid" 
                        size={size} 
                        onClick={onHeartToggle}/> 
            }   
        </div>
    )
}

export default Heart
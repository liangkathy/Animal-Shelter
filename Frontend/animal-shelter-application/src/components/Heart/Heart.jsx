
import './Heart.css'
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { useContext, useEffect, useState } from 'react';
import { IoIosLogIn } from 'react-icons/io';
import { AuthContext } from '../../contexts/AuthContext';
import LoginModal from '../LoginModal/LoginModal';

const Heart = ({petId, handleFavoriteAdd, handleFavoriteDelete, size, favoritedPetIds, setIsLogin}) => {
    const {currentUsername} = useContext(AuthContext)
    const isFavorited = favoritedPetIds.some(id => id === petId)
    const [isLoginPrompt, setIsLoginPrompt] = useState(false)

    const onHeartToggle = (e) => {
        if (!currentUsername) {
            console.log("User not logged in");
            openLoginModal();
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

    const openLoginModal = () => {
        setIsLoginPrompt(true)
    }

    const closeLoginModal = () => {
        setIsLoginPrompt(false)
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
            {
                isLoginPrompt && 
                <LoginModal 
                    closeLoginModal={closeLoginModal}
                    setIsLoginPrompt={setIsLoginPrompt} 
                    setIsLogin={setIsLogin} />
            } 

        </div>
    )
}

export default Heart
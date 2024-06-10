
import './Heart.css'
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

const Heart = ({petId, handleFavoriteAdd, handleFavoriteDelete, size, favoritedPetIds}) => {

    const isFavorited = favoritedPetIds.some(id => id === petId)

    const onHeartToggle = (e) => {
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
    return (
        <div  >
            {
                !isFavorited ? <FaRegHeart id={petId} className="heart-outline" size={size} onClick={onHeartToggle}/> :
                <FaHeart id={petId} className="heart-solid" size={size} onClick={onHeartToggle}/>
            }
            
            
        </div>
    )
}

export default Heart
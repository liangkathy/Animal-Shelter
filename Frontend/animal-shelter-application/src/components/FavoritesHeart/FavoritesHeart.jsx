import { useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import './FavoriteHeart.css'
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuthContext } from "../../contexts/AuthContext";

const FavoritesHeart = () => {
    const {theme} = useContext(ThemeContext)
    const {favoritedPetIds} = useContext(FavoritesContext)
    const count = favoritedPetIds.length
    const {currentUsername} = useContext(AuthContext)
    
    let isLoggedIn = false
    if (currentUsername != null) {
        isLoggedIn = true
    }

    return (
        <div className='favorite-heart'>
            <Link to="/favorites"className={!isLoggedIn ? "hidden" : undefined} ><FaHeart size="3em" className={`heart-${theme}`} /></Link>
            {count > 0 && <span className={`list-count count-${theme}`} >{count}</span>}
        </div>
    )
}

export default FavoritesHeart
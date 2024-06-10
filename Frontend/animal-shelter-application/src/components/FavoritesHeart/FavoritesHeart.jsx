import { useContext } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FavoritesContext } from "../../contexts/FavoritesContext";
import './FavoriteHeart.css'
import { ThemeContext } from "../../contexts/ThemeContext";

const FavoritesHeart = () => {
    const {theme} = useContext(ThemeContext)
    const {favoritedPetIds} = useContext(FavoritesContext)
    const count = favoritedPetIds.length

    return (
        <div className='favorite-heart'>
            <Link to="/favorites" ><FaHeart size="3em" className={`heart-${theme}`} /></Link>
            {count > 0 && <span className={`list-count count-${theme}`} >{count}</span>}
        </div>
    )
}

export default FavoritesHeart
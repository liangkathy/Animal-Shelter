import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom"
import './PetCard.css'
import { useContext } from "react";
import { ThemeContext } from "../../../contexts/ThemeContext";

const PetCard = ({icon, link, text}) => {
    const {theme} = useContext(ThemeContext)

    return (
        <div className="pet-card">
            {icon}
            <Link to={link} className={`a-${theme}`}>{text}
                <IoIosArrowRoundForward size="2em"/>
            </Link>

        </div>
    )
}

export default PetCard
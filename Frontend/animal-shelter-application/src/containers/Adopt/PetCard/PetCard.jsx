import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom"
import './PetCard.css'

const PetCard = ({icon, link, text, theme}) => {
    return (
        <div className="pet-card">
            {icon}
            <Link to={link}>{text}
                <IoIosArrowRoundForward size="2em"/>
            </Link>

        </div>
    )
}

export default PetCard
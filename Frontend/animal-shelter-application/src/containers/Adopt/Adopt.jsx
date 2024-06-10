import { FaDog } from "react-icons/fa";
import { FaCat } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import darkModeRabbit from "../../assets/white-rabbit.png";
import lightModeRabbit from "../../assets/rabbit.png";

import './Adopt.css'
import { Link } from "react-router-dom";
import PetCard from "./PetCard/PetCard";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import FavoritesHeart from "../../components/FavoritesHeart/FavoritesHeart.jsx"


const Adopt = () => {
    const {theme} = useContext(ThemeContext)
    const petTypes = [
        {
            icon: <FaDog size="11em" />,
            link: "/adopt/dogs",
            text: "Adoptable Dogs"
        },
        {
            icon: <FaCat size="10em" />,
            link: "/adopt/cats",
            text: "Adoptable Cats"
        },
        {
            icon: <img src={theme === 'light' ? lightModeRabbit : darkModeRabbit} width="170px" theme={theme} />,
            link: "/adopt/other",
            text: "Other Animals"
        }
    ]


    return (
        <section className={`adopt-main ${theme}`}>
            <div className="adopt-header">
                <h4>Adopt</h4>
                <FavoritesHeart />
            </div>
            <div className="pet-card-container">
                {
                    petTypes.map((pet, i) => {
                        return <PetCard key={i} icon={pet.icon} link={pet.link} text={pet.text} />
                    })
                }
            </div>
            <Link className="view-all" to="/adopt/all">View All
                <IoIosArrowRoundForward size="2em"/>
            </Link>

            <p className="learn-more">Learn more about the <Link to="/process&fees">Process & Fees</Link></p>
        </section>
    )
}

export default Adopt
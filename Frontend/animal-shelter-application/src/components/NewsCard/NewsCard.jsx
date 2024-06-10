
import { Link } from 'react-router-dom'
import { IoIosArrowRoundForward } from "react-icons/io";
import './NewsCard.css'
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

const NewsCard = ({src, alt, title, text, linkText, linkPath}) => {
    const {theme} = useContext(ThemeContext)
    return (
        <div className={`news-card news-card-${theme}`}>
            <img src={src} alt={alt} className="news-img"/>
            <div className="card-text">
                <p><strong>{title}</strong></p>
                <p>{text}</p>
                <Link to={linkPath}>{linkText}
                    <IoIosArrowRoundForward size="2em"/>
                </Link>
            </div>
        </div>
    )
}

export default NewsCard
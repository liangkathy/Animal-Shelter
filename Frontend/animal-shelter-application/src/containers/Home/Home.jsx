import NewsCard from '../../components/NewsCard/NewsCard'
import Header from '../Header/Header'
import Slider from "react-slick";
import './Home.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useContext, useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';

import cat from "../../assets/home/cat.png";
import foster from "../../assets/home/foster.png";
import kittens from "../../assets/home/kittens.png";
import pets from "../../assets/home/pets.png";
import adopt from "../../assets/home/adopt.png";


const Home = () => {
    const {theme} = useContext(ThemeContext)
    
    const newsItems = [
        {
            src: foster,
            alt: "image icon",
            title: "Become a Foster",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            linkText: "Find out more",
            linkPath: "/unavailable"
        },
        {
            src: adopt,
            alt: "image icon",
            title: "Pet Adoption Event",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            linkText: "RSVP",
            linkPath: "/unavailable"
        },
        {
            src: kittens,
            alt: "kittens",
            title: "Kitten Season",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            linkText: "See available cats",
            linkPath: "/unavailable"
        },
        {
            src: pets,
            alt: "image icon",
            title: "New Pet Friends",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            linkText: "Read more",
            linkPath: "/unavailable"
        },
        {
            src: cat,
            alt: "image icon",
            title: "Preparing to Adopt",
            text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            linkText: "Read more",
            linkPath: "/unavailable"
        }
    ]

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1000, 
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 630, 
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
    };


    return (
        <section className={`homepage ${theme}`}>
            <h4>Latest News</h4>
            <div className="slider-container">
            
            <Slider {...settings}>
                {
                    newsItems.map((item,i) => {
                        return <NewsCard key={i} 
                            src={item.src} 
                            alt={item.alt} 
                            title={item.title} 
                            text={item.text} 
                            linkText={item.linkText} 
                            linkPath={item.linkPath}/>
                    })
                }       
            </Slider>            
            </div>
                
            {/* <div className="featured-container home-section">
                <h4>Featured Pets</h4>
                
            </div> */}
        </section>

    )
}

export default Home
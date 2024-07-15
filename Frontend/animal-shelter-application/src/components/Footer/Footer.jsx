import logo from '../../assets/logo.png'
import './Footer.css'
import { AiOutlineInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { useContext, useEffect } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import Toggle from '../Toggle/Toggle';
import { UserPathContext } from '../../contexts/UserPathContext';
import { useLocation } from 'react-router-dom';

const Footer = () => {
    const {theme} = useContext(ThemeContext)
    const userPath = sessionStorage.getItem("userPath")
    // const {isUserPath, setIsUserPath} = useContext(UserPathContext)
    const location = useLocation()

    // useEffect(() => {
    //     if (isUserPath) {
    //         setIsUserPath(sessionStorage.getItem("userPath"))
    //     }
    // },[isUserPath])

    const fixFooter = location.pathname === '/auth';

    const address = [
        "1000 Address Lane",
        "Austin, TX 78701",
        "(512)111-1111"
    ]

    const socials = [
        {
            name: "Instagram",
            link: "#",
            logo: <AiOutlineInstagram size="2em"/>
        },
        {
            name: "Facebook",
            link: "#",
            logo: <FaFacebookSquare size="1.8em"/>
        },
        {
            name: "X",
            link: "#",
            logo: <FaXTwitter size="1.8em"/>
        }
    ]
    return (
        <footer className={`footer-${theme} ${fixFooter ? "footer-fixed" : undefined}`}>
            <div className="footer-left">
                
                <div>
                    <div>
                        {
                            address.map((line, i) => {
                                return <div key={i}>{line}</div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="footer-center">
                <div className='footer-name'>Site by: Kathy Liang</div>
                <div className={`toggle-container ${userPath == "true"|| userPath == null ? "hidden" : undefined}`}>
                    <Toggle className={'user-Toggle'} />
                    <label>Admin Mode</label>
                </div>
            </div>

            <div className="footer-right">
                <div className="logo-footer" >Critters Animal Rescue</div>
                <ul className='social-list'>
                    {
                        socials.map((each,i) => {
                            return <li key={i} className={`socials ${each.name}`}>
                                        <a href={each.link}>{each.logo}</a>
                                </li>
                        })
                    }

                </ul>
                
            </div>
        </footer>
    )

}

export default Footer
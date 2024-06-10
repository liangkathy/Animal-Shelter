import logo from '../../assets/logo.png'
import './Footer.css'
import { AiOutlineInstagram } from "react-icons/ai";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import Toggle from '../Toggle/Toggle';
import { UserPathContext } from '../../contexts/UserPathContext';

const Footer = () => {
    const {theme} = useContext(ThemeContext)
    const userPath = sessionStorage.getItem('userPath')

    const address = [
        "1000 Address Lane",
        "Austin, TX 78701",
        "(512)111-1111"
    ]

    const socials = [
        {
            name: "Instagram",
            link: "#",
            logo: <AiOutlineInstagram size="2.8em"/>
        },
        {
            name: "Facebook",
            link: "#",
            logo: <FaFacebookSquare size="2.3em"/>
        },
        {
            name: "X",
            link: "#",
            logo: <FaXTwitter size="2.3em"/>
        }
    ]
    return (
        <footer className={`footer-${theme}`}>
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
                <div className={`toggle-container ${userPath == 'true'|| userPath == null ? "hidden" : undefined}`}>
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
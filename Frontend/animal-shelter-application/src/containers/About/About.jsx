
import { useContext } from 'react'
import './About.css'
import { ThemeContext } from '../../contexts/ThemeContext'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import { Link } from 'react-router-dom'

const About = () => {
    const {theme} = useContext(ThemeContext)

    const handleContactFormSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <section className={`about-section ${theme}`}>
            <h4>About Us</h4>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
            <div className='about-links'>
                <Link to="/unavailable">Get involved</Link>
                <Link to="/adopt">Meet our adoptable pets</Link>
                <Link to="/unavailable">Upcoming events</Link>
            </div>

            <div className='contact-container'>
                <h4>Contact Us</h4>
                <form action="#">
                    <div className = "input-box">
                        <div className = "input-field field">
                            <Input type={"text"} placeholder={"Full Name"} style={"item"} name={'name'} required={true}/>
                            <div className="error-text">Full Name cannot be blank</div>
                        </div>
                        <div className = "input-field field">
                            <Input type={"email"} placeholder={"Email Address"} style={"item"} name={'email'} required={true}/>
                            <div className="error-text">Email Address cannot be blank</div>
                        </div>
                    </div>

                    <div className = "input-box">
                        <div className = "input-field field">
                            <Input type={"text"} placeholder={"Phone Number"} style={"item"} name={'phone'} required={true}/>
                            <div className="error-text">Phone Number cannot be blank</div>
                        </div>
                        <div className = "input-field field">
                            <Input type={"text"} placeholder={"Subject"} style={"item"} name={'subject'} required={true}/>  
                            <div className="error-text">Subject cannot be blank</div>
                        </div>
                    </div>

                    <div className="textarea-field field">
                        <textarea name="" cols="30" rows="10" placeholder="Your Message" className={"item"} required></textarea>
                    </div>

                    <Input type={"submit"} onChange={handleContactFormSubmit} style={"button"} />
                </form>
            </div>

        </section>
    )
}

export default About
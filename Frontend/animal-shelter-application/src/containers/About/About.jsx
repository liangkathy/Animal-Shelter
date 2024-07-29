
import { forwardRef, useContext, useRef, useState } from 'react'
import { ThemeContext } from '../../contexts/ThemeContext'
import { Link } from 'react-router-dom'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import emailjs from "@emailjs/browser";
import './About.css'

const About = () => {
    const {theme} = useContext(ThemeContext)
    const [errorMessage, setErrorMessage] = useState([null])
    const [isMessageSent, setIsMessageSent] = useState(false)
    const form = useRef()
    const nameInput = useRef()
    const emailInput = useRef()
    const phoneInput = useRef()
    const subjectInput = useRef()
    const messageInput = useRef()


    const validateForm = (e) => {
        e.preventDefault()
        const isValidEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        const name = nameInput.current.value
        const email = emailInput.current.value
        const phone = phoneInput.current.value
        const subject = subjectInput.current.value
        const message = messageInput.current.value

        let isFormValid = false;

        if (name.trim() == "" || email.trim() == "" || phone.trim() == "" || subject.trim() == "" || message.trim() == "") {
            setErrorMessage("All fields are required")
            isFormValid = false
        } else if (!isValidEmail.test(email)) {
            setErrorMessage("Invalid email address")
            isFormValid = false
        } else {
            isFormValid = true
            setErrorMessage(null)
        }

        if (isFormValid) {
            sendEmail()
        }
    }

    const sendEmail = () => {

        emailjs
          .sendForm('service_5859o2f', 'template_0wxgyz9', form.current, {
            publicKey: 'LjcrPQJvNzzJRFcnK',
          })
          .then(
            () => {
              setIsMessageSent(true)
              console.log("SUCCESS")
              nameInput.current.value = ""
              emailInput.current.value = ""
              messageInput.current.value = ""
            },
            (error) => {
              setIsMessageSent(false)
              console.log("FAIL")
            },
          );

      }

    return (
        <section className={`about-section ${theme}`}>
            <h4>About Us</h4>

            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
            <div className='about-links'>
                <Link to="/unavailable" className={`a-${theme}`}>Get involved</Link>
                <Link to="/adopt" className={`a-${theme}`}>Meet our adoptable pets</Link>
                <Link to="/unavailable" className={`a-${theme}`}>Upcoming events</Link>
            </div>

            <div className='contact-container'>
                <h4>Contact Us</h4>
                {
                    errorMessage ? <div className='error'>{errorMessage}</div> : <p></p>
                }

                {
                    isMessageSent ? <div>Thanks for reaching out! We will be in touch as soon as possible.</div> :
                    <form ref={form}>
                        <div className = "input-box">
                            <div className = "input-field field">
                                <Input type={"text"} placeholder={"Full Name"} style={"item"} name={'name'} required={true} propRef={nameInput}/>
                                <div className="error-text">Full Name cannot be blank</div>
                            </div>
                            <div className = "input-field field">
                                <Input type={"email"} placeholder={"Email Address"} style={"item"} name={'email'} required={true} propRef={emailInput}/>
                                <div className="error-text">Email Address cannot be blank</div>
                            </div>
                        </div>

                        <div className = "input-box">
                            <div className = "input-field field">
                                <Input type={"text"} placeholder={"Phone Number"} style={"item"} name={'phone'} required={true} propRef={phoneInput}/>
                                <div className="error-text">Phone Number cannot be blank</div>
                            </div>
                            <div className = "input-field field">
                                <Input type={"text"} placeholder={"Subject"} style={"item"} name={'subject'} required={true} propRef={subjectInput}/>  
                                <div className="error-text">Subject cannot be blank</div>
                            </div>
                        </div>

                        <div className="textarea-field field">
                            <textarea name="message" cols="30" rows="10" placeholder="Your Message" className={"item"} required ref={messageInput}></textarea>
                        </div>
                        <Button text={"Submit"} handleClick={(e) => validateForm(e)}/>
                    </form>
                }
                
            </div>

        </section>
    )
}

export default About
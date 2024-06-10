
import { useContext, useState } from 'react'
import Input from '../../components/Input/Input'
import './Apply.css'
import { PetsContext } from '../../contexts/PetsContext'
import { ThemeContext } from '../../contexts/ThemeContext';
import Multiselect from 'multiselect-react-dropdown';
import Button from '../../components/Button/Button';
import { postDataRestricted } from '../../api/api';
import { useNavigate } from 'react-router-dom';

const Apply = () => {
    const navigate = useNavigate()
    const {theme} = useContext(ThemeContext)
    const usernameFromSession = sessionStorage.getItem("username")
    const {allPets} = useContext(PetsContext)
    const [errorMessage, setErrorMessage] = useState([null])

    const [applyFormData, setApplyFormData] = useState({
        response1: "",
        response2: "",
        response3: "",
        petIds: [],
        username: usernameFromSession
    })


    const options = allPets.length > 0 ? allPets.map((pet) => ({
        key: pet.name.valueOf(),
        value: pet.id})): [{}];

    //console.log(options);

    const applicationQuestions = [
        {
            name: "response1",
            question: "1. Tell us about your household, such as other pets, family members, or activity level."
        },
        {
            name: "response2",
            question: "2. Will your pet spend time indoors, outdoors or both?"
        },
        {
            name: "response3",
            question: "3. Do you have a plan for preventative treatments such as heartworm/flea/tick medications and/or vaccinations?"
        }
    ]

    const handleSelectAndRemove = (e) => {
        //event gives an array list of objects selected
        const petIdList = e ? e.map((item) => item.value) : [];

        //grabbed ids from selected objects and set to petId's in form data
        setApplyFormData(prevFormData => ({
            ...prevFormData, petIds: petIdList
        }))

    }
    const handleChange = (e, name) => {
        const value = e.target.value; //gets text area value

        setApplyFormData(prevFormData => ({
            ...prevFormData,
            [name] : value //name = field name in backend
        }))
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(applyFormData);

        const response = await postDataRestricted("applications", applyFormData)
        console.log(response);

        if (response.hasError) {
            setErrorMessage(response.message)
        } else {
            navigate("/apply/success")
        }
    }

    return (
        <section className={`apply-container ${theme}`}>
            <h4>Online Application Form</h4>
            <div className='error'>
                {
                    errorMessage !== null && (
                            Array.isArray(errorMessage) ? (
                                errorMessage.map((error, i) => <div key={i}>{error}</div>)
                            ) : (
                                <div>{errorMessage}</div>
                            )
                        )
                }
            </div>
            <form className='application-form'>

                {
                    applicationQuestions.map((q,i) => {
                        return (
                            <div className='question-input' key={i}>
                                <label htmlFor={q.name}>{q.question}</label>
                                <textarea className= "apply-textarea" 
                                    name={q.name} 
                                    cols="50" 
                                    rows="3" 
                                    required="true" 
                                    onChange={(e) => handleChange(e, q.name)}
                                    >
                                </textarea>
                            </div>
                        )
                    })
                }
                <div className="pet=select">
                    <label htmlFor='pets'>If any, please select the pets you are interested in: </label>
                    <Multiselect
                        className="multi-select"
                        displayValue="key"
                        onRemove={handleSelectAndRemove}
                        onSelect={handleSelectAndRemove}
                        options={options}
                        showCheckbox
                        />
                </div>

                <Button text={'Submit'} handleClick={handleSubmit} type="submit"/>
                
            </form>
        </section>
    )
}

export default Apply
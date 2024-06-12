import { useContext, useEffect, useState } from 'react'
import './AdminPet.css'
import { ThemeContext } from '../../contexts/ThemeContext'
import { IoClose } from "react-icons/io5";
import Input from '../../components/Input/Input';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from '../../components/Button/Button';
import { postDataRestricted } from '../../api/api';
import { PetsContext } from '../../contexts/PetsContext';


const AddPetModal = ({closeAddModal, availableMicrochipsIds, availableMicrochips, setAvailableMicrochips, setAvailableMicrochipsIds}) => {
    const {theme} = useContext(ThemeContext)
    const {allPets, setAllPets} = useContext(PetsContext)
    const [errorMessage, setErrorMessage] = useState([null])
    const [date, setDate] = useState(new Date());
    const [petAddForm, setPetAddForm] = useState(
        {
            name: "",
            type: "",
            breed: "",
            dob: "",
            sex: "",
            weight: "",
            microchipId: null,
            imgURL: null
        }
    )

    const handleChange = (e) => {
        const {name, value} = e.target
        console.log(value, name);

        setPetAddForm((prevFormData) => {
            return {...prevFormData, [name]: value}
        })
    }

    const getDate = (e) => {
        console.log(e);
        setDate(e)
        
        setPetAddForm((prevFormData) => {
            return {...prevFormData, dob: e.toISOString().slice(0,10)}
        })
    }

    const handleSave = async () => {
        console.log(petAddForm);
        const response = await postDataRestricted(`pets`, petAddForm)
        console.log(response);

        if (response.hasError) {
            console.log(response.message);
            setErrorMessage(response.message)
        } else {
            handleClose(response.data)
            setErrorMessage([null])
        }
    }

    const handleClose = (pet) => {
        setAllPets([...allPets, pet])

        if (petAddForm.microchipId != null) {
            const updatedIds = availableMicrochipsIds.filter(id => id != parseInt(petAddForm.microchipId))
            setAvailableMicrochipsIds(updatedIds)
            const updatedChips = availableMicrochips.filter(chip => chip.id != parseInt(petAddForm.microchipId))
            setAvailableMicrochips(updatedChips)
        }

        closeAddModal()
    }

    useEffect(() => {

    },[allPets])

    return (
        <div className={`modal-container modal-container-${theme}`}>
            <div id="add-modal" className={`modal-${theme}`}>
                <IoClose onClick={closeAddModal} className='close-modal' size="1.5em"/>
                <h3>Add New Pet</h3>
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
                <form className="add-pet-form">
                    <div className="pet-input">
                        <Input type={'text'} name={'name'} placeholder={'Name'} labelTextBefore={'Name'} onChange={handleChange} />
                    </div>
                    <div className="type-sex-container pet-input">
                        <div className='pet-type-input'>
                            <label htmlFor='type'>Type</label>
                            <select name="type"  placeholder="Type" onChange={handleChange}>
                                <option value="null"></option>
                                <option value="Dog">Dog</option>
                                <option value="Cat">Cat</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className='pet-sex-input'>
                            <label htmlFor='sex'>Sex</label>
                            <select name="sex"  placeholder="Sex" onChange={handleChange}>
                                <option value="null"></option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="pet-input">
                        <Input type={'text'}name={'breed'} placeholder={'Breed'} labelTextBefore={'Breed'} onChange={handleChange} />
                    </div>
                    <div id="date-input" className="pet-input">
                        <label>Date</label>
                        <DatePicker 
                            name='date'
                            onChange={getDate}
                            selected={date}
                            dateFormat="yyyy-MM-dd"
                             />
                        <label className='date-format-ex'>YYYY-MM-DD</label>
                        
                    </div>

                    <div className=" pet-input">
                        <Input type={'number'}
                            name={'weight'} 
                            placeholder={'0'} 
                            labelTextBefore={'Weight'} 
                            labelTextAfter={'pounds'} 
                            onChange={handleChange} 
                            style={"weight-input"}/>
                    </div>

                    <div className=" pet-input">
                        <label htmlFor='microchipId'>Microchip ID</label>
                        <select className='chip-dropdown' type="text" name="microchipId" onChange={handleChange}>
                            <option value="null">None</option>
                            {
                                availableMicrochipsIds.length > 0 &&
                                availableMicrochipsIds.map((chip, i) => {
                                    return <option key={i} value={chip}>{chip}</option>
                                })
                            }
                        </select>
                    </div>

                    <div className="pet-input file">
                        <Input type={'file'}
                            name={'imgURL'} 
                            placeholder={'Image'} 
                            labelTextBefore={'Image'} 
                            onChange={handleChange}
                            style={"file-input"} />
                    </div>
                </form>

                <div className='add-buttons'>
                    <Button text={'Create Pet'}
                        handleClick={handleSave} />
                    <Button text={'Cancel'} 
                        cssId={'red-button'}
                        handleClick={closeAddModal} />
                </div>
            </div>
        </div>
    )
}

export default AddPetModal
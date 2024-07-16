import { useContext, useState } from 'react'
import './Microchip.css'
import { ThemeContext } from '../../contexts/ThemeContext'
import { IoClose } from "react-icons/io5";
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { postDataRestricted } from '../../api/api';
import AddMicrochipModalPage from './AddMicrochipModalPage';

const AddMicrochipModal = ({closeChipModal, petsWithoutChip, setPetsWithoutChip, allMicrochips, setAllMicrochips}) => {
    const {theme} = useContext(ThemeContext)
    const [errorMessage, setErrorMessage] = useState([null])
    const [page, setPage] = useState(null)
    const [showForm, setShowForm] = useState(false)
    const [chipAddForm, setChipAddForm] = useState(
        {
        id: "",
        company: "",
        petId: ""
        }
    )

    const handleChange = (e) => {
        const {name, value} = e.target
        console.log(value, name);

        setChipAddForm((prevFormData) => {
            return {...prevFormData, [name]: value}
        })
    }

    const handlePage = (e) => {
        console.log(e.target.value)

        setPage(e.target.value)
    }

    const addChip = (formData) => {
        const transformedData = formData.map((chip) => {
            return {
                id: parseInt(chip.id),
                company: chip.company,
                petId: chip.petId == null ? null : parseInt(chip.petId)
            }
        })

        handleSave(transformedData)
    }

    const handlePageSet = () => {

        if (page == null) {
            setErrorMessage(["Total is required"])
        } else {
            setShowForm(true)
            setErrorMessage([null])
        }
    }

    const handleSave = async(transformedData) => {
        console.log(transformedData);
        const response = await postDataRestricted('microchips', transformedData)
        console.log(response);

        if (response.hasError) {
            console.log(response.message);
            setErrorMessage(response.message)
        } else {
            handleClose(response.data)
            setErrorMessage([null])
        }
    }

    const handleClose = (data) => {
        const microchips = data.map(chip => chip)
        setAllMicrochips([...allMicrochips, ...microchips])

        if (chipAddForm.petId != null) {
            const updatedPets = petsWithoutChip.filter(pet => pet.id != parseInt(chipAddForm.petId))
            setPetsWithoutChip(updatedPets)
        }

        closeChipModal()
    }

    return (
        <div className={`modal-container modal-container-${theme}`}>
            <div id="chip-modal" className={`modal-${theme}`}>
                <IoClose onClick={closeChipModal} className='close-modal' size="1.5em"/>
                <h3>Add New Microchips</h3>
                {
                    errorMessage !== null && (
                            Array.isArray(errorMessage) ? (
                                errorMessage.map((error, i) => <div key={i} className='error'>{error}</div>)
                            ) : (
                                <div>{errorMessage}</div>
                            )
                        )
                }
                
                {
                    !showForm ? 
                    <form className='page-form'>
                        <div>
                        <Input type={'number'} 
                            labelTextBefore={'Total microchips to be added: '} 
                            style={'page-total'} 
                            name={'page'}
                            onChange={handlePage}
                            required={true} />
                        </div>
                        <div className='chip-add-buttons'>
                            <Button text={'Cancel'} 
                                cssId={'red-button'}
                                handleClick={closeChipModal} />
                            <Button text={'Next'}
                                handleClick={handlePageSet}
                                />
                        </div>
                    </form>
                    :
                    <AddMicrochipModalPage 
                        pageTotal={page} 
                        petsWithoutChip={petsWithoutChip} 
                        setPetsWithoutChip={setPetsWithoutChip}
                        handleChange={handleChange}
                        closeChipModal={closeChipModal} 
                        addChip={addChip}
                        handleSave={handleSave}
                        setErrorMessage={setErrorMessage} />
                }
                {/* <form className='add-chip-form'>
                    <div className="chip-input">
                        <Input type={'text'} name={'id'} placeholder={'Microchip ID'} labelTextBefore={'Microchip ID'} onChange={handleChange} />
                    </div>
                    <div className="chip-input">
                        <Input type={'text'} name={'company'} placeholder={'Company'} labelTextBefore={'Company'} onChange={handleChange} />
                    </div>
                    <div className='pet-select'>
                        <label htmlFor='petId'>Assign Pet</label>
                        <select className='pet-dropdown' type="text" name="petId" onChange={handleChange}>
                            <option value="null">None</option>
                            {
                                petsWithoutChip.length > 0 &&
                                petsWithoutChip.map((pet, i) => {
                                    return <option key={i} value={pet.id}>{pet.name}</option>
                                })
                            }
                        </select>
                    </div>
                </form> */}

            </div>
        </div>
    )
}

export default AddMicrochipModal
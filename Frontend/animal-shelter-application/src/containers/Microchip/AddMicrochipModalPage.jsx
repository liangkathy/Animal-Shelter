import './Microchip.css'
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { useEffect, useState } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

const AddMicrochipModalPage = ({pageTotal, petsWithoutChip, closeChipModal, addChip, setPetsWithoutChip}) => {

    const [currentPage, setCurrentPage] = useState(1)
    const [formData, setFormData] = useState(Array.from({ length: pageTotal }, () => ({
        id: '',
        company: '',
        petId: null,
    })));

    const handleChange = (event) => {
        const { name, value } = event.target;
        const pageIndex = currentPage - 1;
    
        // Update formData for the current page with the new value
        setFormData((prevFormData) => {
            const updatedFormData = [...prevFormData];
            updatedFormData[pageIndex] = {
              ...updatedFormData[pageIndex],
              [name]: value,
            };
            return updatedFormData;
        });
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
        //handleNextPage(formData)
        console.log(formData);

        const pageIndex = currentPage - 1;
        if (formData[pageIndex].petId != null) {
            const updatedPets = petsWithoutChip.filter(pet => pet.id != parseInt(formData[pageIndex].petId))
            setPetsWithoutChip(updatedPets)
            console.log(updatedPets);
            console.log(petsWithoutChip);
        }
    }

    const prevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
        //handleBackPage()
        console.log(formData);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addChip(formData)

        console.log('Form data:', formData);
        
        //reset
        setFormData(Array.from({ length: pageTotal }, () => ({
            id: '',
            company: '',
            petId: null,
        })));

        // Example: Reset form or navigate away after submission
        // Resetting formData for illustration
        setFormData([]);
        setCurrentPage(1); // Reset to first page
    }

    useEffect(() => {
        if (currentPage < 1) {
          setCurrentPage(1);
        } else if (currentPage > pageTotal) {
          setCurrentPage(pageTotal);
        }
      }, [currentPage, pageTotal]);

    return (

        <form id={`page-${currentPage}`} className='add-chip-form' onSubmit={handleSubmit}>
            <div className='page-number'>Page {currentPage} of {pageTotal}</div>
            <div className="chip-input">
                <Input type={'text'} 
                    name={'id'} 
                    placeholder={'Microchip ID'} 
                    labelTextBefore={'Microchip ID'} 
                    onChange={handleChange} 
                    val={formData[currentPage - 1]?.id || ''} />
            </div>
            <div className="chip-input">
                <Input type={'text'} 
                    name={'company'} 
                    placeholder={'Company'} 
                    labelTextBefore={'Company'} 
                    onChange={handleChange}
                    val={formData[currentPage - 1]?.company || ''} />
            </div>
            <div className='pet-select'>
                <label htmlFor='petId'>Assign Pet</label>
                <select className='pet-dropdown' 
                    type="text" 
                    name="petId" 
                    onChange={handleChange}
                    val={formData[currentPage - 1]?.petId || 'null'}>
                    <option value="null">None</option>
                    {
                        petsWithoutChip.length > 0 &&
                        petsWithoutChip.map((pet, i) => {
                            return <option key={i} value={pet.id}>{pet.name}</option>
                        })
                    }
                </select>
            </div>
            
            <IoIosArrowBack onClick={prevPage} 
                className={currentPage === 1 ? "hidden": "arrow-back chip-arrow"}
                size="1.2em" />

            <IoIosArrowForward onClick={nextPage} 
                className={currentPage == pageTotal ? "hidden": "arrow-next chip-arrow"}
                size="1.2em" />

            <div className='chip-add-buttons'>
                <Button text={'Cancel'} 
                    cssId={'red-button'}
                    handleClick={closeChipModal} />
                <Button text={'Submit'}
                    handleClick={handleSubmit}
                    condition={currentPage != pageTotal}
                    cssId={currentPage != pageTotal ? "disabled-button" : "undefined"}
                    />
            </div>
        </form>
        
    )
}

export default AddMicrochipModalPage
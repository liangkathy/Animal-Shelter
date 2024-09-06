
import { useContext, useEffect, useRef, useState } from 'react'
import './Microchip.css'
import { ThemeContext } from '../../contexts/ThemeContext'
import Input from '../../components/Input/Input'
import { getData } from '../../api/api'
import Button from '../../components/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import ForbiddenError from '../Error/ForbiddenError'
import { UserPathContext } from '../../contexts/UserPathContext'
import { FaPlus } from "react-icons/fa6";
import AddMicrochipModal from './AddMicrochipModal'
import AssignToPetModal from './AssignToPetModal'
import { PetsContext } from '../../contexts/PetsContext'

const Microchip = () => {
    const navigate = useNavigate()
    const {theme} = useContext(ThemeContext)
    const {allPets} = useContext(PetsContext)
    const [allMicrochips, setAllMicrochips] = useState([])
    const [petsWithoutChip, setPetsWithoutChip] = useState([])
    const [searchInput, setSearchInput] = useState()
    const [filterBy, setFilterBy] = useState("All")
    const [isAddMicrochip, setIsAddMicrochip] = useState(false)
    const [isAssignToPet, setIsAssignToPet] = useState(false)
    const [chipId, setChipId] = useState()
    const [companyName, setCompanyName] = useState()

    useEffect(() => {

        const fetchData = async () => {
            const response = await getData("microchips")
            console.log(response);
            if (response.hasError) {
                console.log("message", response.message);
                navigate("/accessdenied")
            }
            setAllMicrochips(response.data)
            
        }
        fetchData();
    
    }, [])

    useEffect(() => {

        const fetchData = async () => {
            const response = await getData("pets/microchips/null")
            console.log(response);
            if (response.hasError) {
                console.log("message", response.message);
                navigate("/accessdenied")
            }
            setPetsWithoutChip(response.data)  
        }
        fetchData();
    
    }, [])
    
    //dynamically shows results while typing input
    const handleChange = (e) => {
        const input = e.target.value
        setSearchInput(input)

    }

    //set the sort by when option changes
    const handleFilter = (e) => {
        const selected = e.target.value
        setFilterBy(selected)
    }

    //filter data by status (comes as boolean from backend)
    const filteredData = allMicrochips.filter(chip => {
        if (filterBy === "All") {
            return true;
        } else if (filterBy === "Available") {
            return chip.available;
        } else {
            return !chip.available;
        }
    })

    //creates new array where filtered items also meet search input
    const combinedSearchAndFilteredData = searchInput ? filteredData.filter(chip => chip.id.toString().includes(searchInput)) : filteredData

    const openChipModal = () => {
        setIsAddMicrochip(true)
    }

    const closeChipModal = () => {
        setIsAddMicrochip(false)
    }

    const openAssignToPetModal = (id, company) => {
        setIsAssignToPet(true)
        setChipId(id)
        setCompanyName(company)
        console.log(petsWithoutChip)
    }

    const closeAssignToPetModal = () => {
        setIsAssignToPet(false)
        console.log(petsWithoutChip)
    }

    const navigateToPet = (chipId) => {
        const pet = allPets.find(p => p.microchip && p.microchip.id == parseInt(chipId));
        const petId = pet.id;
        navigate(`/pets/${petId}`)
    }

    // useEffect(() => {
    //     console.log(allPets);
    // },[allMicrochips])

    return (
        <section className={`microchip-database ${theme}`}>
            <h4>Microchip Database</h4>

            <Link id="plus" className={`add-container add-microchips a-${theme}`} onClick={openChipModal} >
                <FaPlus className='add-button' size="1em"/>
                Add Microchips
            </Link>

            <div className='matching-container'>
                <form className="search-form">
                    <Input type={'search'} 
                        placeholder={'Search for microchip ID...'} 
                        name={"searchResult"} 
                        style={"search-input"} 
                        onChange={handleChange} 
                        labelTextBefore={"Search: "}/>                 
                </form>

                <div className='filter-div'>
                    <label>Filter: </label>
                    <select className='filter-status' onChange={handleFilter}>
                        <option value="All">View All</option>
                        <option value="Available">View Available</option>
                        <option value="Unavailable">View Unavailable</option>
                    </select>
                </div>

            </div>
            <div className='chip-container'>
                {
                    combinedSearchAndFilteredData.length > 0 ? (
                        combinedSearchAndFilteredData.map((chip, i) => (
                            <div key={i} className='chip-div'>
                                <div>ID: {chip.id}</div>
                                <div>Company: {chip.company}</div>
                                <div>Status: {chip.available ? "Available" : "Unavailable"}</div>
                                {chip.available ? (
                                    <Button text={"Assign to Pet"} handleClick={() => {openAssignToPetModal(chip.id, chip.company)}}/>
                                ) : (
                                    <Button text={"See Assigned Pet"} cssId={"chip-button"} handleClick={() => {navigateToPet(chip.id)}}/>
                                )}
                            </div>
                        ))
                    ) : (
                        allMicrochips.length === 0 || combinedSearchAndFilteredData.length === 0 ? (
                            <div>
                                <h3>No microchips were found!</h3>
                                <div>Add to the database <Link to="/unavailable">here</Link></div>
                            </div>
                        ) : (
                            allMicrochips.map((chip, i) => (
                                <div key={i} className='chip-div'>
                                    <div>ID: {chip.id}</div>
                                    <div>Company: {chip.company}</div>
                                    <div>Status: {chip.available ? "Available" : "Unavailable"}</div>
                                    {chip.available ? (
                                        <Button text={"Assign to Pet"} handleClick={() => {openAssignToPetModal(chip.id, chip.company)}}/>
                                    ) : (
                                        <Button text={"See Assigned Pet"} cssId={"chip-button"} handleClick={() => {navigateToPet(chip.id)}}/>
                                    )}
                                </div>
                            ))
                        )
                    )
                }
            </div>
            {
                isAddMicrochip &&
                <AddMicrochipModal 
                petsWithoutChip={petsWithoutChip}
                setPetsWithoutChip={setPetsWithoutChip}
                allMicrochips={allMicrochips}
                setAllMicrochips={setAllMicrochips}
                closeChipModal={closeChipModal} />
            }

            {
                isAssignToPet && 
                <AssignToPetModal
                petsWithoutChip={petsWithoutChip}
                setPetsWithoutChip={setPetsWithoutChip}
                closeAssignToPetModal={closeAssignToPetModal}
                chipId={chipId}
                company={companyName} 
                setAllMicrochips={setAllMicrochips}
                allMicrochips={allMicrochips}/>
            }

        </section>
    )
}

export default Microchip
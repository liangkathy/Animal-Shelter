
import { useContext, useEffect, useRef, useState } from 'react'
import './Microchip.css'
import { ThemeContext } from '../../contexts/ThemeContext'
import Input from '../../components/Input/Input'
import { getData } from '../../api/api'
import Button from '../../components/Button/Button'
import { Link, useNavigate } from 'react-router-dom'
import ForbiddenError from '../Error/ForbiddenError'

const Microchip = () => {
    const navigate = useNavigate()
    const {theme} = useContext(ThemeContext)
    const [allMicrochips, setAllMicrochips] = useState([])
    const [searchInput, setSearchInput] = useState()
    const [filterBy, setFilterBy] = useState("All")
    const userPathFromSession = sessionStorage.getItem('userPath')

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
    
    
    

    return (
        // !userPathFromSession ? <ForbiddenError /> :
        <section className={`microchip-database ${theme}`}>
            <h4>Microchip Database</h4>
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
                                    <Button text={"Assign to Pet"} />
                                ) : (
                                    <Button text={"See Assigned Pet"} cssId={"chip-button"} />
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
                                        <Button text={"Assign to Pet"} />
                                    ) : (
                                        <Button text={"See Assigned Pet"} cssId={"chip-button"} />
                                    )}
                                </div>
                            ))
                        )
                    )
                }
            </div>

        </section>
    )
}

export default Microchip
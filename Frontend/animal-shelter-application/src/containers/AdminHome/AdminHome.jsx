import { useContext, useEffect } from 'react'
import './AdminHome.css'
import { ThemeContext } from '../../contexts/ThemeContext'
import { MdOutlinePets } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { BsClipboardPlusFill } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { verifyAdmin } from '../../api/api';


const AdminHome = () => {
    const navigate = useNavigate()
    const {theme} = useContext(ThemeContext)

    useEffect(() => {
        const fetchData = async () => {
            const response = await verifyAdmin("authorization")
            console.log(response);
            if (response.hasError) {
                console.log("message", response.message);
                navigate("/accessdenied")
            }
        }
        fetchData();
    }, [])

    return (
        <section className={`admin-home ${theme}`}>
            <h4>Admin Home</h4>
            <div className='admin-tools-container'>
                <div className='admin-tool'>
                    <Link to="/admin/pets" className={`a-${theme}`}><h5>Modify Pet Information</h5></Link>
                    <MdOutlinePets size="10.5em"/>
                </div>
                <div className='admin-tool'>
                    <Link to="/admin/applications" className={`a-${theme}`}><h5>View Pending Applications</h5></Link>
                    <ImProfile size="10em"/>
                </div>
                <div className='admin-tool'>
                    <Link to="/admin/microchips" className={`a-${theme}`}><h5>View Microchip Database</h5></Link>
                    <BsClipboardPlusFill size="10em"/>
                </div>
                <div className='admin-tool'>
                    <Link to="/admin/signup" className={`a-${theme}`}><h5>Create New Admin User</h5></Link>
                    <FaUser size="10em"/>
                </div>
            </div>
        </section>
    )
}

export default AdminHome
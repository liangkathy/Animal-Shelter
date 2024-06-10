import { useContext } from 'react'
import './AdminHome.css'
import { ThemeContext } from '../../contexts/ThemeContext'
import { MdOutlinePets } from "react-icons/md";
import { ImProfile } from "react-icons/im";
import { BsClipboardPlusFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import AdminHeader from '../AdminHeader/AdminHeader';
import { UserPathContext } from '../../contexts/UserPathContext';
import ForbiddenError from '../Error/ForbiddenError';


const AdminHome = () => {
    const {theme} = useContext(ThemeContext)


    return (
    

        <section className={`admin-home ${theme}`}>
            <h4>Admin Home</h4>
            <div className='admin-tools-container'>
                <div className='admin-tool'>
                    <Link to="/unavailable"><h5>Modify Pet Information</h5></Link>
                    <MdOutlinePets size="10.5em"/>
                </div>
                <div className='admin-tool'>
                    <Link to="/unavailable"><h5>View Pending Applications</h5></Link>
                    <ImProfile size="10em"/>
                </div>
                <div className='admin-tool'>
                    <Link to="/admin/microchips"><h5>View Microchip Database</h5></Link>
                    <BsClipboardPlusFill size="10em"/>
                </div>
                <div className='admin-tool'>
                    <Link to="/admin/signup"><h5>Create New Admin User</h5></Link>
                    <FaUser size="10em"/>
                </div>
            </div>
        </section>

    )
}

export default AdminHome
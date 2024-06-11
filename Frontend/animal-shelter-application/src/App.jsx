import Header from './containers/Header/Header'
import Footer from './components/Footer/Footer'
import Home from './containers/Home/Home'
import Error from './containers/Error/Error'
import Adopt from './containers/Adopt/Adopt'
import AdoptCats from './containers/Adopt/AdoptCats/AdoptCats'
import AdoptDogs from './containers/Adopt/AdoptDogs/AdoptDogs'
import AdoptOther from './containers/Adopt/AdoptOther/AdoptOther'
import About from './containers/About/About'
import PetDetails from './components/PetDetails/PetDetails'
import Profile from './containers/Profile/Profile'
import Auth from './containers/Auth/Auth'
import Admin from './containers/Admin/Admin'
import ForgotPassword from './containers/ForgotPassword/ForgotPassword'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ThemeContext } from './contexts/ThemeContext'
import { AuthContext } from './contexts/AuthContext'
import { useState, useEffect } from 'react'
import './App.css'
import AdoptAll from './containers/Adopt/AdoptAll'
import Favorites from './containers/Favorites/Favorites'
import { AdminPathContext } from './contexts/AdminPathContext.js'
import { getData, getDataPublic, verifyAdmin } from "./api/api.js";
import { PetsContext } from './contexts/PetsContext.js'
import { FavoritesContext } from './contexts/FavoritesContext.js'
import Application from './containers/Application/Application.jsx'
import Apply from './containers/Apply/Apply.jsx'
import ApplySuccess from './containers/Apply/ApplySuccess/ApplySuccess.jsx'
import { ApplicationsContext } from './contexts/ApplicationsContext.js'
import ApplicationDetails from './components/ApplicationDetails/ApplicationDetails.jsx'
import AdminHome from './containers/AdminHome/AdminHome.jsx'
import ForbiddenError from './containers/Error/ForbiddenError.jsx'
import UnderConstruction from './containers/Error/UnderConstruction.jsx'
import Microchip from './containers/Microchip/Microchip.jsx'
import { UserPathContext } from './contexts/UserPathContext.js'
import { components } from 'react-select'
import AdminSignUp from './containers/Admin/AdminSignUp/AdminSignUp.jsx'
import AdminPet from './containers/AdminPet/AdminPet.jsx'

const App = () => {
  const navigate = useNavigate()
  const[theme, setTheme] = useState("light")
  const[currentUsername, setCurrentUsername] = useState(null)
  const [isAdminPath, setIsAdminPath] = useState(false)
  const [isUserPath, setIsUserPath] = useState(true)
  const [allPets, setAllPets] = useState([])
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
        const response = await getDataPublic("pets")
        if (response.hasError) {
            console.log("message", response.message);
        }
        setAllPets(response.data)
    }
    
    fetchData();
  }, [])

  const [favoritedPetIds, setFavoritedPetIds] = useState([])

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    
    const fetchData = async () => {
        const response = await getData(`pets/users/${username}`)
        
        if (response.hasError) {
            console.log("message", response.message);

        }
        //setFavoritePets(response.data)
        const petIds = response.data ? response.data.map(pet => pet.id.valueOf()): [];
        setFavoritedPetIds(petIds);
    }
    
    fetchData();

  }, [])

   const [applications, setApplications] = useState([])

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    
    const fetchData = async () => {
        const response = await getData(`applications/users/${username}`)
       
        if (response.hasError) {
            console.log("message", response.message);
        }
        setApplications(response.data)
    }
    
    fetchData();

  }, [])

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <AuthContext.Provider value={{currentUsername, setCurrentUsername}}>
        <PetsContext.Provider value={{allPets, setAllPets}}>
          <FavoritesContext.Provider value={{favoritedPetIds, setFavoritedPetIds}}>
            <ApplicationsContext.Provider value={{applications, setApplications}}>
              <AdminPathContext.Provider value={{isAdminPath, setIsAdminPath}}>
                <UserPathContext.Provider value={{isUserPath, setIsUserPath}}>
                    <Header isLogin={isLogin} setIsLogin={setIsLogin}/>

                    <Routes>
                      <Route path="/auth" element={<Auth isLogin={isLogin} setIsLogin={setIsLogin}/>} />
                      <Route path="/" element={<Home />} />
                      <Route path="/adopt" element={<Adopt />} />
                      <Route path="/adopt/all" element={<AdoptAll />} />
                      <Route path="/adopt/dogs" element={<AdoptDogs />} />
                      <Route path="/adopt/cats" element={<AdoptCats />} />
                      <Route path="/adopt/other" element={<AdoptOther />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/pets/:petId" element={<PetDetails />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/*" element={<Error />} />
                      <Route path="/unavailable" element={<UnderConstruction />} />
                      <Route path="/accessdenied" element={<ForbiddenError />} />
                      <Route path="/forgotpassword" element={<ForgotPassword />} />  
                      <Route path="/favorites" element={<Favorites /> } />
                      <Route path="/applications" element={<Application />} />
                      <Route path="/apply" element={<Apply />} />
                      <Route path="/apply/success" element={<ApplySuccess />} />
                      <Route path="/applications/:applicationId" element={<ApplicationDetails />} />

                      <Route path="/admin/signup" element={<Admin />} />
                      <Route path="/admin/home" element={<AdminHome />} />
                      <Route path="/admin/microchips" element={<Microchip />} />
                      <Route path="/admin/pets" element={<AdminPet />} />
                      
                    </Routes>

                    <Footer />
                </UserPathContext.Provider>
              </AdminPathContext.Provider>
            </ApplicationsContext.Provider>
          </FavoritesContext.Provider>
        </PetsContext.Provider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App


import {useContext, useState, useEffect } from "react"
import { ProfileContext } from "../context/ProfileContext"
import ProfileModal from "../Profile/ProfileModal"
import { FaMoon } from "react-icons/fa"
import { MdLightMode } from "react-icons/md"



function Navbar({ setOpenSidebar }) {

const [openModal, setOpenModal] = useState(false)
const { profile } = useContext(ProfileContext)
const [darkMode, setDarkMode] = useState(false)

useEffect(() => {

  const savedTheme =
    localStorage.getItem("theme")

  if(savedTheme === "dark"){

    setDarkMode(true)

    document.body.classList.add("dark")

  }

}, [])


function toggleTheme(){

  if(darkMode){

    document.body.classList.remove("dark")

    localStorage.setItem("theme","light")

  }

  else{

    document.body.classList.add("dark")

    localStorage.setItem("theme","dark")

  }

  setDarkMode(!darkMode)

}


  return (
<>
    <div className="navbar">

        <button
  className="menu-btn"
  onClick={() => setOpenSidebar(true)}
>
  ☰
</button>

      <div className="search-box">

        <input
          type="text"
          placeholder="Search..."
        />

      </div>


<button
  className="theme-toggle"
  onClick={toggleTheme}
>

  {
    darkMode? <MdLightMode /> : <FaMoon />
  }

</button>

<div className="profile-section">

  <h4>
    {profile?.name || "Admin"}
  </h4>

  <div
    className="profile-icon"
    onClick={() => setOpenModal(true)}
  >

    {
      profile?.image ? (

        <img
          src={profile.image}
          alt="profile"
          className="profile-image"
        />

      ) : (

        "R"

      )
    }

  </div>

</div>

    </div>

{
  openModal && (
    <ProfileModal
      setOpenModal={setOpenModal}
    />
  )
}

</>


  )
}

export default Navbar
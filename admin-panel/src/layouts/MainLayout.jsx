import { Outlet } from "react-router-dom"
import { useState } from "react"
import Sidebar from "../components/layout/Sidebar"
import Navbar from "../components/layout/Navbar"

function MainLayout() {
    const [openSidebar, setOpenSidebar] = useState(false)

 return (

    <div className="dashboard-layout">

    <Sidebar
  openSidebar={openSidebar}
  setOpenSidebar={setOpenSidebar}
/>

      <div className="main-section">

       <Navbar
  setOpenSidebar={setOpenSidebar}
/>

        <div className="page-content">

          <Outlet />

        </div>

      </div>

    </div>

  )
}

export default MainLayout
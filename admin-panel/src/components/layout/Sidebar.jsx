
import {NavLink,useNavigate} from "react-router-dom"
import { useContext } from "react"
import { AuthContext }from "../context/AuthContext"



function Sidebar({

  openSidebar,
  setOpenSidebar

}) {

  const navigate = useNavigate()

  const { logout } =
  useContext(AuthContext)



  function handleLogout(){

    logout()

    navigate("/login")

  }



  function closeSidebar(){

    setOpenSidebar(false)

  }



  return (

    <div
      className={
        openSidebar
        ? "sidebar active-sidebar"
        : "sidebar"
      }
    >

      <button
        className="close-sidebar"

        onClick={closeSidebar}
      >
        ✕
      </button>



      <h2 className="logo">
        Admin Panel
      </h2>



      <ul className="sidebar-links">

        <li>

          <NavLink
            to="/dashboard"
            end

            className={({ isActive }) =>

              isActive
              ? "active-link"
              : ""

            }

            onClick={closeSidebar}
          >

            Dashboard

          </NavLink>

        </li>



        <li>

          <NavLink
            to="/dashboard/users"

            className={({ isActive }) =>

              isActive
              ? "active-link"
              : ""

            }

            onClick={closeSidebar}
          >

            Users

          </NavLink>

        </li>



        <li>

          <NavLink
            to="/dashboard/products"

            className={({ isActive }) =>

              isActive
              ? "active-link"
              : ""

            }

            onClick={closeSidebar}
          >

            Products

          </NavLink>

        </li>



        <li>

          <NavLink
            to="/dashboard/orders"

            className={({ isActive }) =>

              isActive
              ? "active-link"
              : ""

            }

            onClick={closeSidebar}
          >

            Orders

          </NavLink>

        </li>



        <li>

          <NavLink
            to="/dashboard/messages"

            className={({ isActive }) =>

              isActive
              ? "active-link"
              : ""

            }

            onClick={closeSidebar}
          >

            Messages

          </NavLink>

        </li>

      </ul>



      <button
        className="logout-btn"

        onClick={handleLogout}
      >

        Logout

      </button>

    </div>

  )

}

export default Sidebar
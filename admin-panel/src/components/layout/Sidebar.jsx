import { NavLink,useNavigate } from "react-router-dom"


function Sidebar({
  openSidebar,
  setOpenSidebar
}) 
{
    const navigate = useNavigate()

    function handleLogout() {

  localStorage.removeItem("token")

  navigate("/login")

}


function closeSidebar() {

  setOpenSidebar(false)

}

  return (

    <div  className={
    openSidebar
      ? "sidebar active-sidebar"
      : "sidebar"
  }>

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
              isActive ? "active-link" : ""
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
              isActive ? "active-link" : ""
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
              isActive ? "active-link" : ""
            }
            onClick={closeSidebar}
          >
            Products
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
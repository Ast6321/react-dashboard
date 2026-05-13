import {useEffect,useState} from "react"

import {fetchUsers} from "../services/userservice"
import ViewToggle from "../reusableitems/viewtoggle"
import Pagination from "../reusableitems/pagination"

function Users() {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState("table")
  const usersPerPage = 5

  useEffect(() => {

  getUsers()

}, [])

async function getUsers(){

  const data = await fetchUsers()
   console.log(data)
   setUsers(data)


  
}

 const lastUserIndex =
currentPage * usersPerPage

const firstUserIndex =
lastUserIndex - usersPerPage

const currentUsers =
users.slice(
  firstUserIndex,
  lastUserIndex
)

const totalPages =
Math.ceil(
  users.length / usersPerPage
)

return(

  <div>

   <div className="page-header">

  <div>

    <h1>
      Users Management
    </h1>

    <p>
      Manage all registered users
    </p>

  </div>

</div>

    <ViewToggle
  viewMode={viewMode}
  setViewMode={setViewMode}
/>

{
  viewMode === "table"

  ? (

    <div className="table-section">

  <h2>
    Users List
  </h2>

  <div className="table-wrapper">

    <table>

      <thead>

        <tr>

          <th>ID</th>

          <th>Name</th>

          <th>Username</th>

          <th>Email</th>

          <th>Phone</th>

          <th>City</th>

        </tr>

      </thead>



      <tbody>

        {
          currentUsers.map((user) => (

            <tr key={user.id}>

              <td>
                {user.id}
              </td>

              <td>
                {user.name}
              </td>

              <td>
                {user.username}
              </td>

              <td>
                {user.email}
              </td>

              <td>
                {user.phone}
              </td>

              <td>
                {user.address.city}
              </td>

            </tr>

          ))
        }

      </tbody>

    </table>

  </div>

</div>

  )

  : (

  <div className="grid-section">

  {
    currentUsers.map((user) => (

      <div
        className="user-card"
        key={user.id}
      >

        <h3>
         Name: {user.name}
        </h3>

        <p>
        Username:  @{user.username}
        </p>

        <p>
         Email: {user.email}
        </p>

        <p>
         Phone: {user.phone}
        </p>

        <p>
         Address: {user.address.city}
        </p>

      </div>

    ))
  }

</div>

  )
}

<Pagination

  currentPage={currentPage}

  totalPages={totalPages}

  setCurrentPage={setCurrentPage}

/>


  </div>

)
}

export default Users
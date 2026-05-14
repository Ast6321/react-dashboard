import { useEffect, useState, useContext } from "react"
import { fetchUsers } from "../services/userservice"
import ViewToggle from "../reusableitems/viewtoggle"
import Pagination from "../reusableitems/pagination"
import ActionButtons from "../reusableitems/ActionButtons"
import { SearchContext } from "../context/searchContext"
import EditModal from "../reusableitems/Editmodal"



function Users() {
  const [users, setUsers] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState("table")
  const { searchQuery } = useContext(SearchContext)
  const [editingUser, setEditingUser] = useState(null)
  const usersPerPage = 5

  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  useEffect(() => {
    getUsers()
  }, [])

  async function getUsers() {

    const data = await fetchUsers()
    console.log(data)
    setUsers(data)

  }

  function handleDelete(userId){

  const updatedUsers =

    users.filter(

      (user) =>

        user.id !== userId

    )

  setUsers(updatedUsers)

}

function handleChange(event){

  const { name, value } = event.target

  if(name === "city"){

    setEditingUser({

      ...editingUser,

      address: {

        ...editingUser.address,

        city: value

      }

    })

  }

  else{

    setEditingUser({

      ...editingUser,

      [name]: value

    })

  }

}

function handleSave(){

  const updatedUsers = users.map((user) =>

    user.id === editingUser.id

      ? editingUser

      : user

  )

  setUsers(updatedUsers)

  setEditingUser(null)

}


function handleEdit(user){

  setEditingUser(user)

}

  const filteredUsers =

    users.filter((user) =>

      user.username
        .toLowerCase()
        .includes(
          searchQuery.toLowerCase()
        )

    )

  const lastUserIndex =
    currentPage * usersPerPage

  const firstUserIndex =
    lastUserIndex - usersPerPage

  const currentUsers =
    filteredUsers.slice(
      firstUserIndex,
      lastUserIndex
    )

  const totalPages =
    Math.ceil(
      filteredUsers.length / usersPerPage
    )

  return (

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

                      <th>Actions</th>

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


                          <td>

                            <ActionButtons

                             onEdit={() => handleEdit(user)}

                             onDelete={() =>
                              handleDelete(user.id)
                                  }

                            />

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


                    <ActionButtons

                      onEdit={() => handleEdit(user)}

                      onDelete={() =>
                          handleDelete(user.id)
                           }

                    />

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




<div className="edit-form">

  <EditModal

  isOpen={editingUser}

  title="Edit User"

  onClose={() => setEditingUser(null)}

  onSave={handleSave}

>

  <label>
    Full Name
  </label>

  <input
    type="text"
    name="name"
    value={editingUser?.name || ""}
    onChange={handleChange}
    placeholder="Enter Name"
  />



  <label>
    Username
  </label>

  <input
    type="text"
    name="username"
    value={editingUser?.username || ""}
    onChange={handleChange}
    placeholder="Enter Username"
  />



  <label>
    Email
  </label>

  <input
    type="email"
    name="email"
    value={editingUser?.email || ""}
    onChange={handleChange}
    placeholder="Enter Email"
  />



  <label>
    Phone Number
  </label>

  <input
    type="text"
    name="phone"
    value={editingUser?.phone || ""}
    onChange={handleChange}
    placeholder="Enter Phone"
  />



  <label>
    City
  </label>

  <input
    type="text"
    name="city"
    value={editingUser?.address?.city || ""}
    onChange={handleChange}
    placeholder="Enter City"
  />

</EditModal>
</div>











    </div>

  )
}

export default Users
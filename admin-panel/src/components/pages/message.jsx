import { useEffect, useState,useContext } from "react"
import { fetchMessages } from "../services/messageservice"
import ViewToggle from "../reusableitems/viewtoggle"
import Pagination from "../reusableitems/Pagination"
import { SearchContext } from "../context/searchContext"
import EditModal from "../reusableitems/Editmodal"
import ActionButtons from "../reusableitems/ActionButtons"



function Messages(){



const [messages, setMessages] = useState([])

const [viewMode, setViewMode] = useState("table")

const [currentPage, setCurrentPage] = useState(1)

const {searchQuery} = useContext(SearchContext)

const [editingMessage, setEditingMessage] = useState(null)

 const messagesPerPage = 8


 useEffect(() => {

  setCurrentPage(1)

}, [searchQuery])


useEffect(() => {

  getMessages()

}, [])



async function getMessages(){

  const data = await fetchMessages()

  console.log(data)

  setMessages(data)

}


function handleEdit(message){

  setEditingMessage(message)

}



function handleChange(event){

  const { name, value } = event.target

  setEditingMessage({

    ...editingMessage,

    [name]: value

  })

}



function handleSave(){

  const updatedMessages = messages.map((message) =>

    message.id === editingMessage.id

      ? editingMessage

      : message

  )

  setMessages(updatedMessages)

  setEditingMessage(null)

}

const filteredMessages =

messages.filter((message) =>

  message.name
  .toLowerCase()
  .includes(
    searchQuery.toLowerCase()
  )

)

const lastMessageIndex =

currentPage * messagesPerPage



const firstMessageIndex =

lastMessageIndex - messagesPerPage



const currentMessages =

filteredMessages.slice(

  firstMessageIndex,

  lastMessageIndex

)



const totalPages =

Math.ceil(

 filteredMessages.length / messagesPerPage

)



return(

  <div>

          <div className="page-header">

  <div>

    <h1>
      Message Management
    </h1>

    <p>
      Manage all the messages
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

      <div className="table-wrapper">

        <table>

          <thead>

            <tr>

              <th>ID</th>

              <th>Name</th>

              <th>Email</th>

              <th>Message</th>

              <th>Actions</th>

            </tr>

          </thead>



          <tbody>

            {

              currentMessages.map((message) => (

                <tr key={message.id}>

                  <td>
                    {message.id}
                  </td>

                  <td>
                    {message.name}
                  </td>

                  <td>
                    {message.email}
                  </td>

                  <td>
                    {message.body}
                  </td>

                  <td>

  <ActionButtons
    onEdit={() => handleEdit(message)}
    onDelete={() => handleDelete(message.id)}
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

        currentMessages.map((message) => (

          <div
            className="message-card"

            key={message.id}
          >

            <h3>
              {message.name}
            </h3>



            <p>
              {message.email}
            </p>



            <p>
              {message.body}
            </p>


            <ActionButtons
  onEdit={() => handleEdit(message)}
  onDelete={() => handleDelete(message.id)}
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

  isOpen={editingMessage}

  title="Edit Message"

  onClose={() => setEditingMessage(null)}

  onSave={handleSave}

>

  <label>
    Name
  </label>

  <input
    type="text"
    name="name"
    value={editingMessage?.name || ""}
    onChange={handleChange}
    placeholder="Name"
  />



  <label>
    Email
  </label>

  <input
    type="email"
    name="email"
    value={editingMessage?.email || ""}
    onChange={handleChange}
    placeholder="Email"
  />



  <label>
    Message
  </label>

  <input
    type="text"
    name="body"
    value={editingMessage?.body || ""}
    onChange={handleChange}
    placeholder="Message"
  />

</EditModal>
</div>




  </div>

)

}

export default Messages
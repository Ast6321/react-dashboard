import { useEffect, useState } from "react"
import { fetchMessages } from "../services/messageservice"
import ViewToggle from "../reusableitems/viewtoggle"
import Pagination from "../reusableitems/Pagination"



function Messages(){



const [messages, setMessages] = useState([])

const [viewMode, setViewMode] = useState("table")

const [currentPage, setCurrentPage] = useState(1)

const messagesPerPage = 8



useEffect(() => {

  getMessages()

}, [])



async function getMessages(){

  const data = await fetchMessages()

  console.log(data)

  setMessages(data)

}



const lastMessageIndex =

currentPage * messagesPerPage



const firstMessageIndex =

lastMessageIndex - messagesPerPage



const currentMessages =

messages.slice(

  firstMessageIndex,

  lastMessageIndex

)



const totalPages =

Math.ceil(

  messages.length / messagesPerPage

)



return(

  <div>

    <h1 className="page-title">
      Messages Page
    </h1>



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

export default Messages
import { useEffect, useState,useContext } from "react"
import { fetchOrders } from "../services/orderservice"
import ViewToggle from "../reusableitems/viewtoggle"
import Pagination from "../reusableitems/Pagination"
import { SearchContext } from "../context/searchContext"
import EditModal from "../reusableitems/Editmodal"
import ActionButtons from "../reusableitems/ActionButtons"



function Orders(){



const [orders, setOrders] = useState([])

const [viewMode, setViewMode] = useState("table")

const [currentPage, setCurrentPage] = useState(1)

const {searchQuery} = useContext(SearchContext)

const [editingOrder, setEditingOrder] = useState(null)


const ordersPerPage = 6

useEffect(() => {

  setCurrentPage(1)

}, [searchQuery])


useEffect(() => {

  getOrders()

}, [])



async function getOrders(){

  const data = await fetchOrders()

  console.log(data)

  setOrders(data)

}


function handleEdit(order){

  setEditingOrder(order)

}



function handleChange(event){

  const { name, value } = event.target

  setEditingOrder({

    ...editingOrder,

    [name]: value

  })

}



function handleSave(){

  const updatedOrders = orders.map((order) =>

    order.id === editingOrder.id

      ? editingOrder

      : order

  )

  setOrders(updatedOrders)

  setEditingOrder(null)

}


const filteredOrders =

orders.filter((order) =>

  String(order.id)
  .includes(searchQuery)

)


const lastOrderIndex =

currentPage * ordersPerPage



const firstOrderIndex =

lastOrderIndex - ordersPerPage



const currentOrders =

filteredOrders.slice(

  firstOrderIndex,

  lastOrderIndex

)



const totalPages =

Math.ceil(

  filteredOrders.length / ordersPerPage

)



return(

  <div>

      <div className="page-header">

  <div>

    <h1>
      Orders Management
    </h1>

    <p>
      Manage all the orders
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

              <th>Order ID</th>

              <th>User ID</th>

              <th>Total</th>

              <th>Products</th>

              <th>Quantity</th>

              <th>Discounted</th>

              <th>Actions</th>

            </tr>

          </thead>



          <tbody>

            {

              currentOrders.map((order) => (

                <tr key={order.id}>

                  <td>
                    #{order.id}
                  </td>

                  <td>
                    {order.userId}
                  </td>

                  <td>
                    ${order.total}
                  </td>

                  <td>
                    {order.totalProducts}
                  </td>

                  <td>
                    {order.totalQuantity}
                  </td>

                  <td>
                    ${order.discountedTotal}
                  </td>

                  <td>

                   <ActionButtons
                    onEdit={() => handleEdit(order)}
                    onDelete={() => handleDelete(order.id)}
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

        currentOrders.map((order) => (

          <div
            className="order-card"

            key={order.id}
          >

            <h3>
              Order #{order.id}
            </h3>



            <p>
              User ID:
              {order.userId}
            </p>



            <p>
              Total:
              ${order.total}
            </p>



            <p>
              Products:
              {order.totalProducts}
            </p>



            <p>
              Quantity:
              {order.totalQuantity}
            </p>



            <p>
              Discounted:
              ${order.discountedTotal}
            </p>


             <ActionButtons
  onEdit={() => handleEdit(order)}
  onDelete={() => handleDelete(order.id)}
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

  isOpen={editingOrder}

  title="Edit Order"

  onClose={() => setEditingOrder(null)}

  onSave={handleSave}

>

  <label>
    Total Amount
  </label>

  <input
    type="number"
    name="total"
    value={editingOrder?.total || ""}
    onChange={handleChange}
    placeholder="Total Amount"
  />



  <label>
    Total Products
  </label>

  <input
    type="number"
    name="totalProducts"
    value={editingOrder?.totalProducts || ""}
    onChange={handleChange}
    placeholder="Total Products"
  />

</EditModal>
</div>





  </div>

)

}

export default Orders
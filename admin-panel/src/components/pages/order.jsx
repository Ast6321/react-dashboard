import { useEffect, useState }
from "react"

import { fetchOrders }
from "../services/orderservice"

import ViewToggle
from "../reusableitems/viewtoggle"

import Pagination
from "../reusableitems/Pagination"



function Orders(){



const [orders, setOrders] = useState([])

const [viewMode, setViewMode] = useState("table")

const [currentPage, setCurrentPage] = useState(1)

const ordersPerPage = 6



useEffect(() => {

  getOrders()

}, [])



async function getOrders(){

  const data = await fetchOrders()

  console.log(data)

  setOrders(data)

}



const lastOrderIndex =

currentPage * ordersPerPage



const firstOrderIndex =

lastOrderIndex - ordersPerPage



const currentOrders =

orders.slice(

  firstOrderIndex,

  lastOrderIndex

)



const totalPages =

Math.ceil(

  orders.length / ordersPerPage

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

export default Orders
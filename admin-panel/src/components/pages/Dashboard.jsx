import { useEffect, useState,useContext} from "react"
import { getUsers, getProducts, getCarts } from "../services/dashboardservice"

import ViewToggle from "../reusableitems/viewtoggle"
import Pagination from "../reusableitems/Pagination"
import { SearchContext } from "../context/searchContext"



function Dashboard() {

  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [orders, setOrders] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode,setViewMode] = useState("table")
  const {searchQuery} = useContext(SearchContext)

  const itemsPerPage = 5



  async function fetchDashboardData() {

    try {

      setLoading(true)

      const usersData = await getUsers()

      const productsData = await getProducts()

      const cartsData = await getCarts()



      const dashboardStats = [

        {
          title: "Total Users",
          value: usersData.total,
          growth: "↑ 12.5%"
        },

        {
          title: "Total Products",
          value: productsData.total,
          growth: "↑ 8.2%"
        },

        {
          title: "Total Orders",
          value: cartsData.total,
          growth: "↑ 15.6%"
        },

        {
          title: "Revenue",
          value: "$48,920",
          growth: "↑ 5.1%"
        }

      ]



      setStats(dashboardStats)
      setOrders(cartsData.carts)

    }

    catch (error) {

      setError("Failed to load dashboard data")

      console.log(error)

    }

    finally {

      setLoading(false)

    }

  }


    useEffect(() => {

  setCurrentPage(1)

}, [searchQuery])

  useEffect(() => {

    fetchDashboardData()

  }, [])


  if (loading) {

    return <h2>Loading Dashboard...</h2>

  }

  if (error) {

    return <h2>{error}</h2>

  }

  function getStatus(orderId) {

    if (orderId % 3 === 0) {

      return "Processing"

    }

    if (orderId % 2 === 0) {

      return "Shipped"

    }

    return "Completed"

  }



  const filteredOrders =

orders.filter((order) =>

  String(order.id)
  .includes(searchQuery)

)

  const lastItemIndex = currentPage * itemsPerPage
  const firstItemIndex = lastItemIndex - itemsPerPage
  const currentOrders = filteredOrders.slice(firstItemIndex, lastItemIndex)

  const totalPages =
    Math.ceil(
      filteredOrders.length / itemsPerPage
    )



function renderPaginationButtons(){

  let buttons = []



  for(

    let i = 1;

    i <= totalPages;

    i++

  ){




    if(

      i === 1 ||

      i === totalPages ||

      (

        i >= currentPage - 1 &&

        i <= currentPage + 1

      )

    ){




      buttons.push(

        <button

          key={i}

          className={

            currentPage === i

            ? "active-page"

            : ""

          }

          onClick={() =>

            setCurrentPage(i)

          }
        >

          {i}

        </button>

      )

    }




    else if(

      i === currentPage - 2 ||

      i === currentPage + 2

    ){




      buttons.push(

        <span

          key={i}

          className="dots"
        >

          ...

        </span>

      )

    }

  }



  return buttons

}





  return (

    <div className="dashboard-page">

      <div className="stats-section">

        {
          stats.map((item, index) => (

            <div
              className="stat-card"
              key={index}
            >

              <h4>
                {item.title}
              </h4>

              <h2>
                {item.value}
              </h2>

              <p>
                {item.growth}
              </p>

            </div>

          ))
        }

      </div>

{/* <div className="view-toggle">

  <button
    className={
      viewMode === "table"
      ? "active-view"
      : ""
    }

    onClick={() =>
      setViewMode("table")
    }
  >

    Table View

  </button>

  <button
    className={
      viewMode === "grid"
      ? "active-view"
      : ""
    }

    onClick={() =>
      setViewMode("grid")
    }
  >

    Grid View

  </button>

</div> */}
<ViewToggle
  viewMode={viewMode}
  setViewMode={setViewMode}
/>


{
  viewMode === "table"

  ? (

   <div className="table-section">

        <h3>
          Recent Orders
        </h3>

        <div className="table-wrapper">
          <table>

            <thead>

              <tr>

                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Items</th>

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
                      User {order.userId}
                    </td>

                    <td>

                      <span
                        className={`status ${getStatus(order.id).toLowerCase()}`}
                      >

                        {getStatus(order.id)}

                      </span>

                    </td>

                    <td>
                      ${order.total}
                    </td>

                    <td>
                      {order.totalProducts} Items
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
          Customer:
          User {order.userId}
        </p>

        <p>
          Amount:
          ${order.total}
        </p>

        <p>
          Items:
          {order.totalProducts}
        </p>

        <span
          className={`status ${getStatus(order.id).toLowerCase()}`}
        >

          {getStatus(order.id)}

        </span>

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

export default Dashboard
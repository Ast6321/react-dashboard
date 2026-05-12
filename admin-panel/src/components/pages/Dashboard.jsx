import { useEffect, useState } from "react"
import { getUsers, getProducts, getCarts } from "../services/dashboardservice"





function Dashboard() {

  const [stats, setStats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [orders, setOrders] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

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

  const lastItemIndex = currentPage * itemsPerPage
  const firstItemIndex = lastItemIndex - itemsPerPage
  const currentOrders = orders.slice(firstItemIndex, lastItemIndex)

  const totalPages =
    Math.ceil(
      orders.length / itemsPerPage
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

      (i >= currentPage - 1 &&
       i <= currentPage + 1)

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
                <th>Date</th>

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

      <div className="pagination">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            setCurrentPage(currentPage - 1)
          }
        >
          Prev
        </button>

          {renderPaginationButtons()}

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            setCurrentPage(currentPage + 1)
          }
        >
          Next
        </button>

      </div>

    </div>

  )

}

export default Dashboard
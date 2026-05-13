import { useEffect, useState } from "react"
import { fetchProducts } from "../services/productservice"
import ViewToggle from "../reusableitems/viewtoggle"
import Pagination from "../reusableitems/Pagination"



function Products(){



const [products, setProducts] = useState([])

const [viewMode, setViewMode] = useState("table")

const [currentPage, setCurrentPage] = useState(1)

const productsPerPage = 6



useEffect(() => {

  getProducts()

}, [])



async function getProducts(){

  const data = await fetchProducts()

  console.log(data)

  setProducts(data)

}



const lastProductIndex =

currentPage * productsPerPage



const firstProductIndex =

lastProductIndex - productsPerPage



const currentProducts =

products.slice(

  firstProductIndex,

  lastProductIndex

)



const totalPages =

Math.ceil(

  products.length / productsPerPage

)



return(

  <div>

    <h1 className="page-title">
      Products Page
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

              <th>Title</th>

              <th>Category</th>

              <th>Price</th>

              <th>Stock</th>

              <th>Rating</th>

            </tr>

          </thead>



          <tbody>

            {

              currentProducts.map((product) => (

                <tr key={product.id}>

                  <td>
                    {product.id}
                  </td>

                  <td>
                    {product.title}
                  </td>

                  <td>
                    {product.category}
                  </td>

                  <td>
                    ${product.price}
                  </td>

                  <td>
                    {product.stock}
                  </td>

                  <td>
                    ⭐ {product.rating}
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

        currentProducts.map((product) => (

          <div
            className="product-card"

            key={product.id}
          >

            <img
              src={product.thumbnail}

              alt={product.title}

              className="product-image"
            />



            <h3>
              {product.title}
            </h3>



            <p>
              {product.category}
            </p>



           



            <p>
              Price:
              ${product.price}
            </p>



            <p>
              Stock:
              {product.stock}
            </p>



            <p>
              ⭐ {product.rating}
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

export default Products
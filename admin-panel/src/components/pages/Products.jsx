import { useEffect, useState,useContext } from "react"
import { fetchProducts } from "../services/productservice"
import ViewToggle from "../reusableitems/viewtoggle"
import Pagination from "../reusableitems/Pagination"
import { SearchContext } from "../context/searchContext"
import ActionButtons from "../reusableitems/ActionButtons"
import EditModal from "../reusableitems/EditModal"



function Products(){



const [products, setProducts] = useState([])

const [viewMode, setViewMode] = useState("table")

const [currentPage, setCurrentPage] = useState(1)
const {searchQuery} = useContext(SearchContext)
const [editingProduct, setEditingProduct] = useState(null)
const productsPerPage = 6


useEffect(() => {

  setCurrentPage(1)

}, [searchQuery])

useEffect(() => {

  getProducts()

}, [])



async function getProducts(){

  const data = await fetchProducts()

  console.log(data)

  setProducts(data)

}

function handleDelete(id){

  const filteredProducts =

  products.filter(
    (product) => product.id !== id
  )

  setProducts(filteredProducts)

}

function handleEdit(product){

  setEditingProduct(product)

}

function handleChange(event){

  const {name,value} = event.target

  setEditingProduct({

    ...editingProduct,

    [name]: value

  })

}


function handleSave(){

  const updatedProducts =

  products.map((product) =>

    product.id === editingProduct.id

      ? editingProduct

      : product

  )

  setProducts(updatedProducts)

  setEditingProduct(null)

}


const filteredProducts =

products.filter((product) =>

  product.title
  .toLowerCase()
  .includes(
    searchQuery.toLowerCase()
  )

)



const lastProductIndex =

currentPage * productsPerPage



const firstProductIndex =

lastProductIndex - productsPerPage



const currentProducts =

filteredProducts.slice(

  firstProductIndex,

  lastProductIndex

)



const totalPages =

Math.ceil(

 filteredProducts.length / productsPerPage

)



return(

  <div>

      <div className="page-header">

  <div>

    <h1>
      Products Management
    </h1>

    <p>
      Manage all the products
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

              <th>Title</th>

              <th>Category</th>

              <th>Price</th>

              <th>Stock</th>

              <th>Rating</th>

              <th>Actions</th>

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

                  <td>

  <ActionButtons

    onEdit={() =>
      handleEdit(product)
    }

    onDelete={() =>
      handleDelete(product.id)
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


            <ActionButtons

  onEdit={() =>
    handleEdit(product)
  }

  onDelete={() =>
    handleDelete(product.id)
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

    isOpen={editingProduct}

    title="Edit Product"

    onClose={() =>
      setEditingProduct(null)
    }

    onSave={handleSave}

  >

    <label>
      Product Title
    </label>

    <input
      type="text"
      name="title"
      value={editingProduct?.title || ""}
      onChange={handleChange}
      placeholder="Enter Product Title"
    />



    <label>
      Category
    </label>

    <input
      type="text"
      name="category"
      value={editingProduct?.category || ""}
      onChange={handleChange}
      placeholder="Enter Category"
    />



    <label>
      Price
    </label>

    <input
      type="number"
      name="price"
      value={editingProduct?.price || ""}
      onChange={handleChange}
      placeholder="Enter Price"
    />



    <label>
      Stock
    </label>

    <input
      type="number"
      name="stock"
      value={editingProduct?.stock || ""}
      onChange={handleChange}
      placeholder="Enter Stock"
    />

  </EditModal>

</div>

  </div>

)

}

export default Products
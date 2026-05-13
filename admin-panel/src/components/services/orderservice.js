import axios from "axios"



export async function fetchOrders(){

  const response =

  await axios.get(
    "https://dummyjson.com/carts"
  )

  return response.data.carts

}
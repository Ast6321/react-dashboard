import axios from "axios"

const BASE_URL = "https://dummyjson.com"



export async function getUsers(){

  const response = await axios.get(
    `${BASE_URL}/users`
  )

  return response.data
}



export async function getProducts(){

  const response = await axios.get(
    `${BASE_URL}/products`
  )

  return response.data
}



export async function getCarts(){

  const response = await axios.get(
    `${BASE_URL}/carts`
  )

  return response.data
}
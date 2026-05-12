import axios from "axios"

export async function loginUser(formData) {

  try {

    const response = await axios.post(
      "https://fakestoreapi.com/auth/login",
      formData
    )

    return response.data

  } catch (error) {

    throw error.response.data

  }

}
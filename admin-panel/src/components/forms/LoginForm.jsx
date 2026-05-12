import { useState } from "react"
import { Link ,useNavigate} from "react-router-dom"
import { loginUser } from "../services/authservice"


function LoginForm() {
    const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  function handleChange(event) {

    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value
    })

  }

async function handleSubmit(event) {

  event.preventDefault()

  try {

    const data = await loginUser(formData)

    console.log(data)

    localStorage.setItem("token", data.token)

    navigate("/dashboard")

  } catch (error) {

    console.log(error)

    alert("Invalid Credentials")

  }

}

  return (

    <form onSubmit={handleSubmit}>

     <input
  type="text"
  name="username"
  placeholder="Enter Username"
  value={formData.username}
  onChange={handleChange}
/>

      <br />
      <br />

      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={formData.password}
        onChange={handleChange}
      />

      <br />
      <br />

      <button type="submit">
        Login
      </button>

      

      

    </form>

  )
}

export default LoginForm
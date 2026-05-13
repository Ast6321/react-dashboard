import LoginForm from "../forms/LoginForm"
import {useContext} from "react"

import {AuthContext} from "../context/AuthContext"

function Login() {

  const { login } = useContext(AuthContext)
  return (

    <div className="auth-page">

      <div className="auth-container">

        <h1>Admin Login</h1>

        <p>Welcome Back</p>

        <LoginForm />

      </div>

    </div>

  )
}

export default Login
import { Navigate } from "react-router-dom"
import {useContext} from "react"
import {AuthContext} from "../context/AuthContext"

function PublicRoute({children}) {

  const {isAuthenticated,loading} = useContext(AuthContext)


  if(loading){

    return (

      <div className="page-loader">

        Loading...

      </div>

    )

  }



  if(isAuthenticated){

    return <Navigate to="/dashboard" />

  }



  return children

}

export default PublicRoute
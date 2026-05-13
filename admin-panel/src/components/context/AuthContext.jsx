import {createContext,useEffect,useState} from "react"
import Cookies from "js-cookie"



export const AuthContext = createContext()



function AuthProvider({ children }) {

    const [loading,setLoading] = useState(true)
  const [token, setToken] = useState(null)



 useEffect(() => {

  const savedToken =
  Cookies.get("token")

  if(savedToken){

    setToken(savedToken)

  }

  setLoading(false)

}, [])



  function login(userToken){

    Cookies.set(
      "token",
      userToken,
      {
        expires: 7
      }
    )

    setToken(userToken)

  }



  function logout(){

    Cookies.remove("token")

    setToken(null)

  }



  return(

    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        loading,
        isAuthenticated: !!token
      }}
    >

      {children}

    </AuthContext.Provider>

  )

}



export default AuthProvider
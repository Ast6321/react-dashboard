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



async function login(userToken){

    Cookies.set(
      "token",
      userToken,
      {
        expires: 7,
        path:"/",
        sameSite: "Lax"
      }
       
    )

    console.log(
  "cookie after set:",
  document.cookie
)

   await setToken(userToken)

  }



  function logout(){

    Cookies.remove(
      "token",
       {
    path:"/"
  }
    )

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
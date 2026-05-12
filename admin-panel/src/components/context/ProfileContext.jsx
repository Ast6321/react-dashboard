import { createContext, useState, useEffect } from "react"

export const ProfileContext = createContext()

function ProfileProvider({ children }) {

  const [profile, setProfile] = useState(() => {

    const savedProfile = localStorage.getItem("profile")

    return savedProfile
      ? JSON.parse(savedProfile)
      : null

  })

  useEffect(() => {

    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    )

  }, [profile])

  return (

    <ProfileContext.Provider
      value={{
        profile,
        setProfile
      }}
    >

      {children}

    </ProfileContext.Provider>

  )
}

export default ProfileProvider
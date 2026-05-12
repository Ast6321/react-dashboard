import { useState, useContext } from "react"
import { ProfileContext } from "../context/ProfileContext"



function ProfileModal({ setOpenModal }) {

    const { setProfile } = useContext(ProfileContext)

    const [formData, setFormData] = useState({
  name: "",
  email: "",
  role: "",
  image: ""
})

function handleChange(event) {

  const { name, value } = event.target

  setFormData({
    ...formData,
    [name]: value
  })

}


function handleImageUpload(event) {

  const file = event.target.files[0]

  if (!file) return

  const reader = new FileReader()

  reader.readAsDataURL(file)

  reader.onloadend = () => {

    setFormData({
      ...formData,
      image: reader.result
    })

  }

}


function handleSubmit(event) {

  event.preventDefault()

  setProfile(formData)

  setOpenModal(false)

}
return (

  <div className="modal-overlay">

    <div className="profile-modal">

      <div className="modal-header">

        <h2>
          Update Profile
        </h2>

      </div>

      <form
        className="profile-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>
            Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>
            Role
          </label>

          <input
            type="text"
            name="role"
            placeholder="Enter Role"
            value={formData.role}
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>
            Upload Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />

        </div>

        <div className="modal-buttons">

          <button
            type="submit"
            className="save-btn"
          >
            Save Profile
          </button>

          <button
            type="button"
            className="close-btn"
            onClick={() => setOpenModal(false)}
          >
            Close
          </button>

        </div>

      </form>

    </div>

  </div>

)
}

export default ProfileModal
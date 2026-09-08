import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UtilityContext } from "../contexts/UtilityContextProvide";
import { getApiErrorMessage } from "../utils/apiError";
import { uploadImageToCloudinary, validateImageFile } from "../utils/imageUpload";

export default function AddAdminPage() {

  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    image: ""
  })
  const [profileImage, setProfileImage] = useState('https://res.cloudinary.com/dmegiw31y/image/upload/v1687634119/HomeRental/alt-image_rn3zbk.webp')
  const [imageFile, setImageFile] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();

  const { AdminsList, setAdminList } = useContext(UtilityContext)

  const imageHanlder = (e) => {
    const file = e.target.files[0]
    const validationError = validateImageFile(file)
    if (validationError) {
      setErrorMessage(validationError)
      return
    }
    setImageFile(file)
    setProfileImage(URL.createObjectURL(file))
  }

  async function registerUser(e) {
    e.preventDefault();
    setErrorMessage("")

    if (userData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.")
      return
    }

    try {
      const payload = { ...userData }
      if (imageFile != null) {
        payload.image = await uploadImageToCloudinary(imageFile)
      }

      const response = await axios.post(`/admin/add`, payload)
      setAdminList([...(AdminsList || []), response.data.user])
      navigate('/admin/users/admins')
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error))
    }
  }

  return (
    <>
      <div className=" grow flex items-center justify-around">
        <div className="mb-20">
          <h1 className="text-4xl text-center mb-4">Register Admin</h1>


          {/* for image upload part  */}
          <div className="flex flex-col items-center justify-center  py-2">
            <img
              src={profileImage}
              alt="Selected"
              className="h-52 object-fill outline outline-lightBlue outline-[2px] rounded-lg "
            />

            <label htmlFor="image-input" className="  cursor-pointer bg-lightBlue mt-2 text-white p-1.5 hover:bg-lbHover  rounded-md">
              set Profile Picture
            </label>
            <input type="file" id="image-input" accept="image/png,image/jpeg" className="hidden" onChange={imageHanlder} />

          </div>


          <form className="max-w-md mx-auto" onSubmit={registerUser}>
            {errorMessage && (
              <div className="text-[red] outline outline-[1px] rounded-lg pl-2 mb-3">
                {errorMessage}
              </div>
            )}
            <input
              type="text"
              required
              placeholder="first name"
              value={userData.name}
              onChange={e => setUserData({ ...userData, name: e.target.value })}
            />
            <input
              type="text"
              required
              placeholder="last name"
              value={userData.lastName}
              onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
            />

            <input
              type="number"
              required
              placeholder="phone"
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
            />
            <input
              type="email"
              required
              placeholder="example@email.com"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            <input
              type="password"
              required
              minLength={8}
              placeholder="password (min 8 characters)"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
            <button className="primary bg-lightBlue hover:bg-lbHover mt-4">
              Add Admin
            </button>
          </form>
        </div>
      </div>


    </>
  );
}

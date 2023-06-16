import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UtilityContext } from "../contexts/UtilityContextProvide";

export default function AddAdminPage() {

  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    image: ""
  })
  const [profileImage, setProfileImage] = useState('https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG.png')
  const [imageFile, setImageFile] = useState(null)
  const navigate = useNavigate();

  const { AdminsList, setAdminList } = useContext(UtilityContext)

  const imageHanlder = (e) => {
    setImageFile(e.target.files[0])// grab image file
    setProfileImage(URL.createObjectURL(e.target.files[0])) // create a url for locall rendering
    // console.log(e.target.files[0]);
    // console.log(" user profile par : ");
    // console.log(profileImage);
  }

  async function registerUser(e) {
    e.preventDefault();

    let adminAddedData = userData
    if (imageFile != null) {
      const formdata = new FormData();
      formdata.append('file', imageFile);
      formdata.append('upload_preset', process.env.REACT_APP_preset_key);
      axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_cloud_name}/image/upload`, formdata)
        .then(response => {
          console.log("Image uploaded successfully");
          console.log('added data is all about this');
          adminAddedData.image = response.data.secure_url

          // Register the user after image upload
          registerUser(adminAddedData);
        })
        .catch(erro => {
          console.log("Image upload error message");
          console.log(erro);
        });
    } else {
      // No image selected, directly register the user
      registerUser(userData);
    }

    // register user method
    function registerUser(updatedUserData) {
      axios.post(`${process.env.REACT_APP_baseURL}/admin/add`, updatedUserData)
        .then((response) => {
          console.log("Admin added successfully");
          console.log(response.data.user);
          setAdminList([...AdminsList, response.data.user]);
          navigate('/admin/users/admins');
        })
        .catch((error) => {
          console.log("Error on registering admin");
          console.log(error);
        });
    }

  }

  return (
    <>
      <div className=" outline grow flex items-center justify-around">
        <div className="mb-20">
          <h1 className="text-4xl text-center mb-4">Register Admin</h1>


          {/* for image upload part  */}
          <div className="flex flex-col items-center justify-center outline py-2">
            <img
              src={profileImage}
              alt="Selected"
              className="h-32 object-fill outline rounded-lg "
            />

            <label htmlFor="image-input" className="  cursor-pointer bg-lightBlue mt-2 text-white p-1.5 hover:bg-lbHover  rounded-md">
              set Profile Picture
            </label>
            <input type="file" id="image-input" className="hidden" onChange={imageHanlder} />

          </div>


          <form className="max-w-md mx-auto" onSubmit={registerUser}>
            <input
              type="text"
              placeholder="first name"
              value={userData.name}
              onChange={e => setUserData({ ...userData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="last name"
              value={userData.lastName}
              onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
            />

            <input
              type="number"
              placeholder="phone"
              value={userData.phone}
              onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
            />
            <input
              type="email"
              placeholder="example@email.com"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="password"
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
            {/* <div className="my-4">
            <p className="font-medium">Who are you?</p>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="owner"
                  checked={userData.userType === "owner"}
                  onChange={(e) => setUserData({ ...userData, userType: "owner" })}
                />
                <span>Homeowner</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="tenant"
                  checked={userData.userType === "tenant"}
                  onChange={(e) => setUserData({ ...userData, userType: "tenant" })}
                />
                <span>Tenant</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="buyer"
                  checked={userData.userType === "buyer"}
                  onChange={(e) => setUserData({ ...userData, userType: "buyer" })}
                />
                <span>Buyer</span>
              </label>
            </div>
          </div> */}
            <button className="primary bg-lightBlue hover:bg-lbHover mt-4">
              Add Admin
            </button>
            {/* <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div> */}
          </form>
        </div>
      </div>


    </>
  );
}

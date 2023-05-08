import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContextProvider";
// import axios from "axios";

export default function RegisterPage() {

  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    subcity: "",
    woreda: "",
    kebele: "",
    phone: "",
    userType: "",
    image: ""
  })
  const [profileImage, setProfileImage] = useState('https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-Vector-PNG.png')
  const [imageFile, setImageFile] = useState(null)
  const [redirect, setRedirect] = useState(false);

  const { user,setToken, setUser } = useContext(UserContext)

  const imageHanlder = (e) => {
    setImageFile(e.target.files[0])// grab image file
    setProfileImage(URL.createObjectURL(e.target.files[0])) // create a url for locall rendering
    // console.log(e.target.files[0]);
    // console.log(" user profile par : ");
    // console.log(profileImage);
  }

  // const 

  async function registerUser(e) {
    e.preventDefault();
    // console.log("user data is here");
    // console.log(userData);
    // console.log(profileImage);
    // console.log(imageFile);

    // console.log("\nimag file aprt");
    // upload image to cloudinary and grab the url

    if (imageFile != null) {
      const formdata = new FormData()
      formdata.append('file', imageFile)
      formdata.append('upload_preset', process.env.REACT_APP_preset_key)
      axios.post(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_cloud_name}/image/upload`, formdata)
        .then(response => {
          console.log("image uploaded successfully");
          setUserData({ ...userData, image: response.data.secure_url })
          // console.log(response.data.secure_url)
        })
        .catch(erro => {
          console.log("image upload error message ");
          console.log(erro)
        })
    }


    // register the user to the backend
    axios.post(`${process.env.REACT_APP_baseURL}/${userData.userType}/register`, userData)
      .then((response) => {
        console.log("user register successfully ********************");
        console.log(response.data.user)
        setUser(response.data.user)
        setToken(response.data.token)
        setRedirect('/')
        // console.log(response.data);
        // setToken()
      }).catch((error) => {
        console.log("user registion Error-----------------");
        console.log(error);
      });
    
      
    }
    
    if (redirect) {
      console.log('on the navigate part user info: ');
      console.log(user);
      return <Navigate to={"/"} />;
    }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>


        {/* for image upload part  */}
        <div className="flex flex-col items-center justify-center outline py-2">
          <img
            src={profileImage}
            alt="Selected"
            className="h-56 object-fill outline rounded-lg "
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
            type="text"
            placeholder="city"
            value={userData.city}
            onChange={(e) => setUserData({ ...userData, city: e.target.value })}
          />
          <input
            type="text"
            placeholder="subcity"
            value={userData.subcity}
            onChange={(e) => setUserData({ ...userData, subcity: e.target.value })}
          />
          <input
            type="text"
            placeholder="woreda"
            value={userData.woreda}
            onChange={(e) => setUserData({ ...userData, woreda: e.target.value })}
          />
          <input
            type="text"
            placeholder="kebele"
            value={userData.kebele}
            onChange={(e) => setUserData({ ...userData, kebele: e.target.value })}
          />
          <input
            type="number"
            placeholder="phone"
            value={userData.phone}
            onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="password"
            value={userData.password}
            onChange={(e) => setUserData({ ...userData, password: e.target.value })}
          />
          <div className="my-4">
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
                  name="tenant"
                  checked={userData.userType === "tenant"}
                  onChange={(e) => setUserData({ ...userData, userType: "tenant" })}
                />
                <span>Buyer</span>
              </label>
            </div>
          </div>
          <button className="primary bg-lightBlue hover:bg-lbHover mt-4">
            Register
          </button>
          <div className="text-center py-2 text-gray-500">
            Already a member?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContextProvider";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
    const [userType, setUserType] = useState("");
  const { setUser,setToken  } = useContext(UserContext);
  
  async function handleLoginSubmit(ev) {
    
    ev.preventDefault();
    console.log(" email : " + email);
    console.log(" password : " + password);
    console.log(" userType : " + userType );
    axios
        .post(`http://localhost:4000/${userType}/login`, {email, password})
        .then((response) => {
          console.log("success logged in");
          setToken(response.data.token)
          setUser(response.data.user)
          setRedirect('/')
          
          // console.log("user toekn ----");
          // console.log(response.data.token);
          // console.log("user data ----");
          // console.log(response.data.user);
          // setToken(response.data)
            // return response;
        })
        .catch((error) => {
          console.log(" error message ");
            console.log(error);
        });

  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }
  function handleSelect(e) {
    setUserType(e.target.name);
  }




  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
            required
          />
          <div className="my-4">
            <p className="font-medium">Who are you?</p>
            <div className="flex gap-4">
              <label>
                <input

                  type="radio"
                  name="owner"
                  checked={userType === "owner"}
                  onChange={handleSelect}
                />
                <span>Homeowner</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="tenant"
                  checked={userType === "tenant"}
                  onChange={handleSelect}
                />
                <span>Tenant</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="buyer"
                  checked={userType === "buyer"}
                  onChange={handleSelect}
                />
                <span>Buyer</span>
              </label>
              {/* <label>
                <input
                  type="radio"
                  name="admin"
                  checked={userType === "admin"}
                  onChange={handleSelect}
                />
                <span>Admin</span>
              </label> */}
            </div>
          </div>
          <button className="primary bg-lightBlue hover:bg-lbHover mt-4">
            Login
          </button>
          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

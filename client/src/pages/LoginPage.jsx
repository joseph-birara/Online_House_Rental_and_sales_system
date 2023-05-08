import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
// import axios from "axios";
// import { UserContext } from "../UserContext.jsx";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [userType, setUserType] = useState("");
  // const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    console.log(userType);
    // try {
    //   const { data } = await axios.post("/login", { email, password });
    //   setUser(data);
    //   alert("Login successful");
    //   setRedirect(true);
    // } catch (e) {
    //   alert("Login failed");
    //}
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
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <div className="my-4">
            <p className="font-medium">Who are you?</p>
            <div className="flex gap-4">
              <label>
                <input
                  type="radio"
                  name="homeowner"
                  checked={userType === "homeowner"}
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

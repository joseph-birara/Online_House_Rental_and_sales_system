import { Link } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [subcity, setSubcity] = useState("");
  const [woreda, setWoreda] = useState("");
  const [kebele, setKebele] = useState("");
  const [phone, setPhone] = useState("");
  const [userType, setUserType] = useState("");

  function handleSelect(e) {
    setUserType(e.target.name);
  }
  async function registerUser(ev) {
    ev.preventDefault();
    console.log(userType);
    // try {
    //   await axios.post('/register', {
    //     name,
    //     email,
    //     password,
    //   });
    //   alert('Registration successful. Now you can log in');
    // } catch (e) {
    //   alert('Registration failed. Please try again later');
    // }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="first name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="text"
            placeholder="last name"
            value={lastName}
            onChange={(ev) => setLastName(ev.target.value)}
          />
          <input
            type="text"
            placeholder="city"
            value={city}
            onChange={(ev) => setCity(ev.target.value)}
          />
          <input
            type="text"
            placeholder="subcity"
            value={subcity}
            onChange={(ev) => setSubcity(ev.target.value)}
          />
          <input
            type="text"
            placeholder="woreda"
            value={woreda}
            onChange={(ev) => setWoreda(ev.target.value)}
          />
          <input
            type="text"
            placeholder="kebele"
            value={kebele}
            onChange={(ev) => setKebele(ev.target.value)}
          />
          <input
            type="number"
            placeholder="phone"
            value={phone}
            onChange={(ev) => setPhone(ev.target.value)}
          />
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

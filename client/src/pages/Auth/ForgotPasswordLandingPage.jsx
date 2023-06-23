import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay-ts";

export default function ForgotPasswordLandingPage({ isAdmin }) {
  const [email, setEmail] = useState("");
  const [currentUserChoice, setCurrentUserChoice] = useState("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  let [loading, setLoading] = useState(false);

  // save user info on local storage

  // for admin purpose

  // for error message
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 2500);

      // Clean up the timer when the component unmounts or when the dependency changes
      return () => clearTimeout(timer);
    }
  }, [errorMessage]); // Empty dependency array ensures it only runs once

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    setLoading(true); // set teh loading overlay to true

    let backendRoutingPath = currentUserChoice;

    // user types are only two so
    // all buyers should be tenants
    if (currentUserChoice === "buyer") {
      backendRoutingPath = "tenant";
    }
    console.log(" email ****: " + email);
    console.log(" userType ****: " + currentUserChoice);
    console.log("routing link *****" + backendRoutingPath);

    axios
      .post(`https://house-rental.onrender.com/${backendRoutingPath}/reset`, {
        email: email,
      })
      .then((response) => {
        // console.log("the response is--------------------");
        // console.log(response);
        if (response.data === 'success') {
          navigate(`/forgetpassword/reset/${backendRoutingPath}`);
          console.log("password reset is done-----------");
        } else {
          setErrorMessage(response.data);
          console.log(response.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(" error message ");
        setErrorMessage("Server error: " + error.message);
        setLoading(false);
        console.log(error);
      });
  }

  return (
    <div className=" mt-4 grow flex items-center justify-around">
      <div className="mb-64 w-2/4 ">
        <h1 className="text-4xl text-center mb-4">Password Reset</h1>

        {/* for error message */}
        <div
          className={` text-[red]  outline outline-[1px] rounded-lg w-4/6 pl-2 mx-auto ${
            errorMessage ? "" : "invisible"
          }`}
        >
          {errorMessage ? <span> {errorMessage}</span> : <span> == </span>}
        </div>

        {/* user input form */}
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
            required
          />

          {/* for user choice */}
          {!isAdmin && (
            <div className="my-4">
              <p className="font-medium">Who are you?</p>
              <fieldset className="flex gap-6">
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="owner"
                    checked={currentUserChoice === "owner"} // Bound to userType state
                    onChange={(e) => setCurrentUserChoice(e.target.value)} // Update userType state
                    required
                  />
                  <span>Homeowner</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="tenant"
                    checked={currentUserChoice === "tenant"} // Bound to userType state
                    onChange={(e) => setCurrentUserChoice(e.target.value)} // Update userType state
                  />
                  <span>Tenant</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="userType"
                    value="buyer"
                    checked={currentUserChoice === "buyer"} // Bound to userType state
                    onChange={(e) => setCurrentUserChoice(e.target.value)} // Update userType state
                  />
                  <span>Buyer</span>
                </label>
              </fieldset>
            </div>
          )}

          <Link className="underline text-lightBlue text-black" to={"/login"}>
            back to login
          </Link>

          {/* clicked button */}
          <button
            type="submit"
            // onClick={() => setLoading(!loading)}
            className="primary bg-lightBlue hover:bg-lbHover Hover mt-4 relative"
          >
            <LoadingOverlay
              active={loading}
              spinner
              className="loading-overlay"
              spinnerClassName="w-12 h-12"
              contentClassName="opacity-50 pointer-events-none"
              spinnerProps={{
                style: {
                  borderTopColor: "lightblue",
                  borderLeftColor: "lightblue",
                },
              }}
            ></LoadingOverlay>
            {loading ? "Checking..." : " send "}
          </button>
        </form>
      </div>
    </div>
  );
}

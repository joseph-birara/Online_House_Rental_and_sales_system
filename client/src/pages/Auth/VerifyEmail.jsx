import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay-ts";

const VerifyEmail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  let [loading, setLoading] = useState(false);

  // for error message
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
      }, 2000);

      // Clean up the timer when the component unmounts or when the dependency changes
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleClick = () => {
    setLoading(true);
    console.log("button is clicked");
    console.log(" the id is " + id);
    if (id) {
      const routingPath = window.localStorage.getItem("email-verify-path");
      console.log("-----------------------");
      console.log(routingPath);
      if (routingPath) {
        const encodedPath = encodeURIComponent(
          routingPath.replace(/"/g, "") // Remove double quotes from routingPath
        );
        console.log(
          `https://house-rental.onrender.com/${encodedPath}/verify-email/${id}`
        );
        axios
          .get(
            `https://house-rental.onrender.com/${encodedPath}/verify-email/${id}`
          )
          .then((response) => {
            if (response.data === "Email verified successfully.") {
              navigate("/login/");
              window.localStorage.setItem(
                "email-verify-path",
                JSON.stringify("")
              );
            } else {
              setErrorMessage(response.data);
              setLoading(false);
            }
            console.log(response);
          })
          .catch((error) => {
            console.log("Error verifying email");
            console.log(error);
            setErrorMessage("Server Error " + error.message);
            setLoading(false);
          });
      }
    }
  };

  return (
    <>
      {/* for error message */}
      <div
        className={` text-[red]  text-center mb-1  mt-16 outline outline-[1px] rounded-lg pl-2 mx-auto ${
          errorMessage ? "" : "invisible"
        }`}
      >
        {errorMessage ? <span> {errorMessage}</span> : <span> == </span>}
      </div>
      <div className="outline flex justify-center w-3/4 mt-3  mx-auto">
        <div className="p-3 ">
          <button
            onClick={handleClick}
            className="bg-lightBlue text-white py-2 px-4 rounded-sm"
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
            {loading ? "verifying..." : "Verify Email"}
          </button>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay-ts";
import { clearEmailVerifyPath, getEmailVerifyPath } from "../../utils/auth";
import { getApiErrorMessage } from "../../utils/apiError";

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

    const handleClick = async () => {
        setLoading(true);
        if (!id) {
            setErrorMessage("Verification link is invalid.");
            setLoading(false);
            return;
        }

        const storedPath = getEmailVerifyPath();
        const paths = storedPath ? [storedPath] : ["tenant", "owner"];

        try {
            let lastMessage = "Unable to verify email.";
            for (const path of paths) {
                const response = await axios.get(`/${path}/verify-email/${id}`);
                if (response.data === "Email verified successfully.") {
                    clearEmailVerifyPath();
                    navigate("/login/");
                    return;
                }
                lastMessage = response.data;
            }
            setErrorMessage(lastMessage);
        } catch (error) {
            setErrorMessage(getApiErrorMessage(error));
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* for error message */}
            <div className={` text-[red]  text-center mb-1  mt-16 outline outline-[1px] rounded-lg pl-2 mx-auto ${errorMessage ? "" : "invisible"
                }`}>
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

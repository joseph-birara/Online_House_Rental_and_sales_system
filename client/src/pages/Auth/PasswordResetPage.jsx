import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingOverlay from 'react-loading-overlay-ts';

export default function PasswordResetPage({ isAdmin }) {
    const { accountType } = useParams('')
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [newpassword, setnewPassword] = useState("");
    const [currentUserChoice, setCurrentUserChoice] = useState("");
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('')
    let [loading, setLoading] = useState(false);

    // for error message
    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => {
                setErrorMessage('')
            }, 2500);

            // Clean up the timer when the component unmounts or when the dependency changes
            return () => clearTimeout(timer);
        }
    }, [errorMessage]); // Empty dependency array ensures it only runs once

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        setLoading(true); // set teh loading overlay to true


        // user types are only two so
        // all buyers should be tenants
        console.log(" email ****: " + email);
        console.log(" userType ****: " + accountType);

        axios
            .post(`https://house-rental.onrender.com/${accountType}/newPassword`, {
                email: email, token: token, password: newpassword
            })
            .then((response) => {

                // console.log("the response is--------------------");
                // console.log(response);
                if (response.data === 'Password reset successful') {
                    navigate("/login/");
                    console.log("password reset is done-----------");
                } else {
                    setErrorMessage(response.data);
                    setLoading(false);
                }

            })
            .catch((error) => {
                console.log(" error message ");
                setErrorMessage( error.message)
                setLoading(false);
                console.log(error);
            });
    }

    return (
        <div className=" mt-4 grow flex items-center justify-around">
            <div className="mb-64 w-2/4 ">
                <h1 className="text-xl font-normal text-center mb-4">
                    We have sent a verification code to your email address. <br />
                    Enter the code below to proceed with password reset
                </h1>

                {/* for error message */}
                <div className={` text-[red]  outline outline-[1px] rounded-lg w-4/6 pl-2 mx-auto ${errorMessage ? '' : 'invisible'}`}>
                    {errorMessage ? (<span> {errorMessage}</span>) : (<span> == </span>)}
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

                    <input
                        type="text"
                        placeholder="code"
                        value={token}
                        onChange={(ev) => setToken(ev.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="new password"
                        value={newpassword}
                        onChange={(ev) => setnewPassword(ev.target.value)}
                        required
                    />



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
                                    borderTopColor: 'lightblue',
                                    borderLeftColor: 'lightblue',
                                },
                            }}
                        >
                        </LoadingOverlay>
                        {loading ? "Checking..." : " Send "}
                    </button>
                </form>

            </div>
        </div>
    );
}

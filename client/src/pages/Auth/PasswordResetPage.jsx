import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getApiErrorMessage } from "../../utils/apiError";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthButton from "../../components/auth/AuthButton";
import FormAlert from "../../components/auth/FormAlert";

export default function PasswordResetPage({ isAdmin }) {
    const { accountType } = useParams('')
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");
    const [newpassword, setnewPassword] = useState("");
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
        if (newpassword.length < 8) {
            setErrorMessage("Password must be at least 8 characters.");
            setLoading(false);
            return;
        }

        axios
            .post(`/${accountType}/newPassword`, {
                email: email, token: token, password: newpassword
            })
            .then((response) => {
                if (response.data === 'Password reset successful') {
                    navigate("/login/");
                } else {
                    setErrorMessage(response.data);
                    setLoading(false);
                }

            })
            .catch((error) => {
                setErrorMessage(getApiErrorMessage(error))
                setLoading(false);
            });
    }

    return (
        <AuthLayout
            title="Create a new password"
            subtitle="We sent a verification code to your email. Enter it below to continue."
        >
            <FormAlert message={errorMessage} />

            <form className="auth-form max-w-md" onSubmit={handleLoginSubmit}>
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
                    type="password"
                    minLength={8}
                    placeholder="new password (min 8 characters)"
                    value={newpassword}
                    onChange={(ev) => setnewPassword(ev.target.value)}
                    required
                />

                <Link className="text-sm font-medium text-lightBlue hover:underline" to={"/login"}>
                    Back to login
                </Link>

                <AuthButton loading={loading} loadingText="Checking...">
                    Reset password
                </AuthButton>
            </form>
        </AuthLayout>
    );
}

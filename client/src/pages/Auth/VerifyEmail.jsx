import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { clearEmailVerifyPath, getEmailVerifyPath } from "../../utils/auth";
import { getApiErrorMessage } from "../../utils/apiError";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthButton from "../../components/auth/AuthButton";
import FormAlert from "../../components/auth/FormAlert";

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
        <AuthLayout
            title="Verify your email"
            subtitle="Confirm your address to finish setting up your Homiee account."
        >
            <FormAlert message={errorMessage} />
            <p className="mb-6 text-slate-500">
                Click the button below to verify this email link and continue to login.
            </p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleClick();
                }}
            >
                <AuthButton loading={loading} loadingText="Verifying...">
                    Verify email
                </AuthButton>
            </form>
        </AuthLayout>
    );
};

export default VerifyEmail;

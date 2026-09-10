import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getApiErrorMessage } from "../../utils/apiError";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthButton from "../../components/auth/AuthButton";
import FormAlert from "../../components/auth/FormAlert";
import RoleSelector from "../../components/auth/RoleSelector";

export default function ForgotPasswordLandingPage({ isAdmin }) {
  const [email, setEmail] = useState("");
  const [currentUserChoice, setCurrentUserChoice] = useState(isAdmin ? "admin" : "");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('')
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAdmin) {
      setCurrentUserChoice("admin");
    }
  }, [isAdmin]);

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

    let backendRoutingPath = currentUserChoice

    // user types are only two so
    // all buyers should be tenants
    if (currentUserChoice === 'buyer') {
      backendRoutingPath = 'tenant'
    }
    if (!backendRoutingPath) {
      setErrorMessage("Please select your account type.");
      setLoading(false);
      return;
    }

    axios
      .post(`/${backendRoutingPath}/reset`, {
        email: email
      })
      .then((response) => {
        if (response.data === 'success') {
          navigate(`/forgetpassword/reset/${backendRoutingPath}`);
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
      title="Reset your password"
      subtitle="Enter your email and we will send a verification code."
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

        {!isAdmin && (
          <RoleSelector
            value={currentUserChoice}
            onChange={(e) => setCurrentUserChoice(e.target.value)}
          />
        )}

        <Link className="text-sm font-medium text-lightBlue hover:underline" to={"/login"}>
          Back to login
        </Link>

        <AuthButton loading={loading} loadingText="Checking...">
          Send code
        </AuthButton>
      </form>
    </AuthLayout>
  );
}

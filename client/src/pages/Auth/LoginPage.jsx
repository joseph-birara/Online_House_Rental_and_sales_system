import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../contexts/UserContextProvider";
import { getApiErrorMessage } from "../../utils/apiError";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthButton from "../../components/auth/AuthButton";
import FormAlert from "../../components/auth/FormAlert";
import RoleSelector from "../../components/auth/RoleSelector";

export default function LoginPage({ isAdmin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [currentUserChoice, setCurrentUserChoice] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('')
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    setCurrentUserChoice(isAdmin ? "admin" : "");
  }, [isAdmin])

  // for error message
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage('')
      }, 2000);

      // Clean up the timer when the component unmounts or when the dependency changes
      return () => clearTimeout(timer);
    }
  }, [errorMessage]); // Empty dependency array ensures it only runs once

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    setLoading(true); // set teh loading overlay to true


    let routingLink = currentUserChoice
    let USERTYPE = currentUserChoice

    // all buyers should be tenants
    if (currentUserChoice === 'admin') {
      routingLink = 'admin';
    } else if (currentUserChoice === 'buyer') {
      routingLink = 'tenant'
    }

    if (!currentUserChoice) {
      setErrorMessage("Please select your account type.");
      setLoading(false);
      return;
    }

      axios
        .post(`/${routingLink}/login`, {
          email: email,
          password: password,
          userType: USERTYPE
        })
        .then((response) => {
          if (response.data.token) {
            let userData = response.data.user;
            userData.userType = currentUserChoice;
            login(response.data.token, userData);
            navigate("/");
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
      title={isAdmin ? "Admin login" : "Welcome back"}
      subtitle={isAdmin ? "Sign in to manage Homiee." : "Sign in to continue your search."}
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
          type="password"
          required
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
        />

        {!isAdmin && (
          <RoleSelector
            value={currentUserChoice}
            onChange={(e) => setCurrentUserChoice(e.target.value)}
          />
        )}

        <div className="flex justify-end">
          <Link className="text-sm font-medium text-lightBlue hover:underline" to={"/forgetpassword"}>
            Forgot password
          </Link>
        </div>

        <AuthButton loading={loading} loadingText="Checking...">
          Sign in
        </AuthButton>

        {!isAdmin && (
          <p className="pt-5 text-center text-sm text-slate-500">
            Don't have an account yet?{" "}
            <Link className="font-medium text-blueBlack hover:text-lightBlue" to={"/register"}>
              Register now
            </Link>
          </p>
        )}
      </form>
    </AuthLayout>
  );
}

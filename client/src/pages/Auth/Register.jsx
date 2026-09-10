import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { getApiErrorMessage } from "../../utils/apiError";
import { setEmailVerifyPath } from "../../utils/auth";
import { uploadImageToCloudinary, validateImageFile } from "../../utils/imageUpload";
import AuthLayout from "../../components/auth/AuthLayout";
import AuthButton from "../../components/auth/AuthButton";
import FormAlert from "../../components/auth/FormAlert";
import RoleSelector from "../../components/auth/RoleSelector";

export default function RegisterPage() {
  const [userData, setUserData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    city: "",
    subcity: "",
    woreda: "",
    kebele: "",
    phone: "",
    userType: "",
    image: "",
  });
  const [profileImage, setProfileImage] = useState(
    "https://res.cloudinary.com/dmegiw31y/image/upload/v1687634119/HomeRental/alt-image_rn3zbk.webp"
  );
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('')
  let [loading, setLoading] = useState(false);

  const imageHanlder = (e) => {
    const file = e.target.files[0];
    const validationError = validateImageFile(file);
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }
    setImageFile(file);
    setProfileImage(URL.createObjectURL(file));
  };

  async function registerUser(e) {
    e.preventDefault();
    setLoading(true);

    if (userData.password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      setLoading(false);
      return;
    }

    let payload = { ...userData };
    try {
      if (imageFile != null) {
        payload.image = await uploadImageToCloudinary(imageFile);
        setUserData(payload);
      }

      const backendRoutingPath = payload.userType === "buyer" ? "tenant" : payload.userType;
      const response = await axios.post(`/${backendRoutingPath}/register`, payload);

      if (response.data === "check your email") {
        setEmailVerifyPath(backendRoutingPath);
        navigate("/activateEmail");
      } else {
        setErrorMessage(response.data);
        setLoading(false);
      }
    } catch (error) {
      setErrorMessage(getApiErrorMessage(error));
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      wide
      title="Create your account"
      subtitle="Join Homiee as a homeowner, tenant, or buyer."
    >
      <div className="mb-6 flex flex-col items-center">
        <img
          src={profileImage}
          alt="Selected"
          className="h-28 w-28 rounded-full object-cover ring-4 ring-slate-100"
        />
        <label
          htmlFor="image-input"
          className="mt-3 cursor-pointer rounded-full bg-lightBlue px-4 py-2 text-sm font-medium text-white hover:bg-lbHover"
        >
          Set profile picture
        </label>
        <input
          required
          type="file"
          id="image-input"
          accept="image/png,image/jpeg"
          className="hidden"
          onChange={imageHanlder}
        />
      </div>

      <form className="auth-form" onSubmit={registerUser}>
        <FormAlert message={errorMessage} />

        <div className="grid gap-x-3 sm:grid-cols-2">
          <input
            type="text"
            required
            placeholder="first name"
            value={userData.name}
            onChange={(e) =>
              setUserData({ ...userData, name: e.target.value })
            }
          />
          <input
            type="text"
            required
            placeholder="last name"
            value={userData.lastName}
            onChange={(e) =>
              setUserData({ ...userData, lastName: e.target.value })
            }
          />
          <input
            type="text"
            required
            placeholder="city"
            value={userData.city}
            onChange={(e) =>
              setUserData({ ...userData, city: e.target.value })
            }
          />
          <input
            type="text"
            required
            placeholder="subcity"
            value={userData.subcity}
            onChange={(e) =>
              setUserData({ ...userData, subcity: e.target.value })
            }
          />
          <input
            type="text"
            required
            placeholder="woreda"
            value={userData.woreda}
            onChange={(e) =>
              setUserData({ ...userData, woreda: e.target.value })
            }
          />
          <input
            type="text"
            required
            placeholder="kebele"
            value={userData.kebele}
            onChange={(e) =>
              setUserData({ ...userData, kebele: e.target.value })
            }
          />
          <input
            type="number"
            required
            placeholder="phone"
            value={userData.phone}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
          />
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
          />
          <input
            type="password"
            required
            minLength={8}
            placeholder="password (min 8 characters)"
            value={userData.password}
            onChange={(e) =>
              setUserData({ ...userData, password: e.target.value })
            }
            className="sm:col-span-2"
          />
        </div>

        <div className="mt-3 flex items-start gap-2 text-sm text-slate-600">
          <input required className="mt-1" id="agreement" type="checkbox" />
          <label htmlFor="agreement">
            By signing up you agree to our
            <Link className="mx-1 font-medium text-lightBlue hover:underline" to={"#"}>
              Privacy Policy
            </Link>
            and
            <Link className="mx-1 font-medium text-lightBlue hover:underline" to={"#"}>
              Terms of Services
            </Link>
            .
          </label>
        </div>

        <RoleSelector
          value={userData.userType}
          onChange={(e) => setUserData({ ...userData, userType: e.target.value })}
        />

        <AuthButton loading={loading} loadingText="Processing...">
          Register
        </AuthButton>

        <p className="pt-5 text-center text-sm text-slate-500">
          Already a member?{" "}
          <Link className="font-medium text-blueBlack hover:text-lightBlue" to={"/login"}>
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

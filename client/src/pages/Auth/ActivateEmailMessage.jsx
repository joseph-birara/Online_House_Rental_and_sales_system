import { Link } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";

const ActivateEmailMessage = () => {
  return (
    <AuthLayout
      title="Check your inbox"
      subtitle="Your account was created. Open the email we sent to activate it."
    >
      <div className="rounded-2xl bg-green-50 px-5 py-6 text-green-700">
        <p className="text-base leading-relaxed">
          Your account is successfully created. Please check your email to activate.
        </p>
      </div>
      <Link
        to="/login"
        className="mt-6 inline-flex rounded-full bg-lightBlue px-5 py-2.5 text-sm font-medium text-white hover:bg-lbHover"
      >
        Back to login
      </Link>
    </AuthLayout>
  );
};

export default ActivateEmailMessage;

import { Routes, Route } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import Buy from "./pages/Buy";
import LandingPage from "./pages/LandingPage";
import Test from "./pages/Test";
import HomeDetails from "./pages/HomeDetails";
import { DashboardContextProvider } from "./contexts/DashboardContextProvider";
import HomeownerDashboard from "./pages/dashboards/HomeownerDashboard";
import PlacesFormPage from "./pages/PlacesFormPage";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import HomesList from "./pages/HomesList";
import styles from "./App.module.css";
import DetailsPage from "./pages/DetailsPage";
import UsersList from "./pages/UsersList";
import RequestsPage from "./pages/RequestsPage";
import HomesListing from "./pages/HomesListing";
import { UserContextProvider } from "./contexts/UserContextProvider";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/Register";
import UtilityContextProvider from "./contexts/UtilityContextProvide";
import Applicants from "./pages/Applicants";
import OwnerListerPage from "./Admin_Related_Pages/OwnerListerPage";
import BuyerListerPage from "./Admin_Related_Pages/BuyerListerPage";
import TenantListerPage from "./Admin_Related_Pages/TenantListerPage";
import AdminListerPage from "./Admin_Related_Pages/AdminListPage";
import HomesListPage from "./Admin_Related_Pages/HomesListPage";
import AddAdminPage from "./Admin_Related_Pages/AddAdminPage";
import TenantApplications from "./pages/TenantApplications";
import TenantDashboard from "./pages/dashboards/TenantDashboard";
import MaintenanceRequests from "./pages/MaintenanceRequests";
import NewMRequest from "./pages/NewMRequest";
import UpdateProfilePage from "./pages/Auth/UpdateProfile";
import TenantRentedHomes from "./pages/TenantRentedHomes";
import PaymentSuccessMessage from "./pages/Auth/PaymentSuccess";
import PaymentFailedMessage from "./pages/Auth/PaymentFail";
import ActivateEmail from "./pages/Auth/ActivateEmailMessage";
import ActivateEmailMessage from "./pages/Auth/ActivateEmailMessage";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import ForgotPasswordLandingPage from "./pages/Auth/ForgotPasswordLandingPage";
import PasswordResetPage from "./pages/Auth/PasswordResetPage";
import ValidatePayment from "./pages/Auth/ValidatePayment";
import Footer from "./components/Footer";

function App() {
  return (
    <UserContextProvider>
      <UtilityContextProvider>
        <DashboardContextProvider>
          <div>
            <MainHeader />
            <main>

              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/adminlogin" element={<LoginPage isAdmin={true} />} />
                <Route path="/login" element={<LoginPage isAdmin={false} />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/rent" element={<HomesListing />} />
                <Route path="/updateProfile" element={<UpdateProfilePage />} />
                <Route path="/homeDetails/:id" element={<HomeDetails />} />

                {/* activate and verify email */}
                <Route path="activateEmail" element={<ActivateEmailMessage />} />
                <Route path="verifyEmail/:id" element={<VerifyEmail />} />

                {/* for forget passwrod */}
                <Route path="/forgetpassword" element={<ForgotPasswordLandingPage />} />
                <Route path="/admin-forgetpassword" element={<ForgotPasswordLandingPage isAdmin={true} />} />
                <Route path="/forgetpassword/reset/:accountType" element={<PasswordResetPage />} />

                {/* for payment  */}
                <Route path="payment/success" element={<PaymentSuccessMessage />} />
                <Route path="payment/fail" element={<PaymentFailedMessage />} />
                <Route path="payment/verify/:appli_id" element={<ValidatePayment />} />


                {/* HomeOwner Routes */}
                <Route path="/homeOwner" element={<HomeownerDashboard />} >
                  <Route path="homes">
                    <Route path="onListing" element={<HomesList rented={false} />} />
                    <Route path="onListing/:id" element={<PlacesFormPage />} />
                    <Route path="rented" element={<HomesList rented={true} />} />
                    <Route path="new" element={<PlacesFormPage />} />
                  </Route>

                  <Route path="applicants" element={<Applicants />} />
                  <Route path="tenants" element={<UsersList />} />
                  <Route path="maintenanceRequests" element={<RequestsPage />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminDashboard />} >
                  <Route path="homes">
                    <Route path="onListing" element={<HomesListPage />} />
                    <Route path="rented" element={<HomesListPage DisplayRented={true} />} />
                    <Route path="home" element={<HomeDetails forAdmin={true} />} />
                  </Route>

                  <Route path="users">
                    <Route path="homeOwners" element={<OwnerListerPage />} />
                    <Route path="homeOwners/homeOwner" element={<DetailsPage />} />
                    <Route path="tenants" element={<TenantListerPage />} />
                    <Route path="buyers" element={<BuyerListerPage />} />
                    <Route path="admins" element={<AdminListerPage />} />
                    <Route path="addAdmin" element={<AddAdminPage />} />
                  </Route>

                  <Route path="reports" element={<Test />} />
                </Route>

                {/* Tenant Routes */}
                <Route path="/tenant" element={<TenantDashboard />} >
                  <Route path="applications" element={<TenantApplications />} />
                  <Route path="rentedHomes" element={<TenantRentedHomes />} />
                  <Route path="mRequests" element={<MaintenanceRequests />} />
                  <Route path="mRequests/new" element={<NewMRequest />} />
                </Route>

                {/*  Buyer page  and there should be a Buyer dashboard*/}
                <Route path="/buyer" element={<Test />} >
                </Route>

              </Routes>
              <Footer />
            </main>
          </div>
        </DashboardContextProvider>
      </UtilityContextProvider>
    </UserContextProvider>
  );
}

export default App;

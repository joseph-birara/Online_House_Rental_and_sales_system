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
import UsersList from "./pages/UsersList";
import RequestsPage from "./pages/RequestsPage";
import HomesListing from "./pages/HomesListing";
import { UserContextProvider } from "./contexts/UserContextProvider";
import LoginPage from "./pages/Auth/LoginPage";
import RegisterPage from "./pages/Auth/Register";
import UtilityContextProvider from "./contexts/UtilityContextProvide";
// import Applicants from "./pages/OwnerRentApplication";
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
import ActivateEmailMessage from "./pages/Auth/ActivateEmailMessage";
import VerifyEmail from "./pages/Auth/VerifyEmail";
import ForgotPasswordLandingPage from "./pages/Auth/ForgotPasswordLandingPage";
import PasswordResetPage from "./pages/Auth/PasswordResetPage";
import ValidatePayment from "./pages/Auth/ValidatePayment";
import Footer from "./components/Footer";
import RequestForm from "./pages/RequestForm";
import Team from "./AboutUs/Team"
import Services from "./AboutUs/Services"
import TermsOfService from './pages/TermsOfService'
import BuyerDashBoard from "./pages/dashboards/BuyerDashBoard";
import BuyerApplications from "./pages/BuyerApplications";
import OwnerRentApplication from "./pages/OwnerRentApplication";
import OwnerBuyApplications from "./pages/OwnerBuyApplications";
import ListOfApplications from "./Admin_Related_Pages/ListOfAppications";
import { GuestRoute, ProtectedRoute } from "./components/ProtectedRoute";

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
                <Route path="/adminlogin" element={<GuestRoute><LoginPage isAdmin={true} /></GuestRoute>} />
                <Route path="/login" element={<GuestRoute><LoginPage isAdmin={false} /></GuestRoute>} />
                <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/rent" element={<HomesListing />} />
                <Route path="/updateProfile" element={<ProtectedRoute><UpdateProfilePage /></ProtectedRoute>} />
                <Route path="/homeDetails/:id" element={<HomeDetails />} />
                <Route path="/team" element={<Team />} />
                <Route path="/service" element={<Services />} />
                <Route path="/termsofservice" element={<TermsOfService />} />

                {/* activate and verify email */}
                <Route path="activateEmail" element={<ActivateEmailMessage />} />
                <Route path="verifyEmail/:id" element={<VerifyEmail />} />

                {/* for forget passwrod */}
                <Route path="/forgetpassword" element={<ForgotPasswordLandingPage />} />
                <Route path="/admin-forgetpassword" element={<ForgotPasswordLandingPage isAdmin={true} />} />
                <Route path="/forgetpassword/reset/:accountType" element={<PasswordResetPage />} />

                {/* for payment  */}
                <Route path="payment/success" element={<ProtectedRoute roles={['tenant', 'buyer']}><PaymentSuccessMessage /></ProtectedRoute>} />
                <Route path="payment/fail" element={<PaymentFailedMessage />} />
                <Route path="payment/verify/:appli_id" element={<ProtectedRoute roles={['tenant', 'buyer']}><ValidatePayment /></ProtectedRoute>} />


                {/* HomeOwner Routes */}
                <Route path="/homeOwner" element={<ProtectedRoute roles={['owner']}><HomeownerDashboard /></ProtectedRoute>} >
                  <Route path="homes">
                    <Route path="onListing" element={<HomesList rented={false} />} />
                    <Route path="onListing/:id" element={<PlacesFormPage />} />
                    <Route path="rented" element={<HomesList rented={true} />} />
                    <Route path="new" element={<PlacesFormPage />} />
                  </Route>

                  <Route path="rentapplicants" element={<OwnerRentApplication />} />
                  <Route path="buyapplicants" element={<OwnerBuyApplications />} />
                  <Route path="tenants" element={<UsersList />} />
                  <Route path="maintenanceRequests" element={<RequestsPage />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} >
                  <Route path="homes">
                    <Route path="onListing" element={<HomesListPage />} />
                    <Route path="rented" element={<HomesListPage DisplayRented={true} />} />
                    <Route path="home" element={<HomeDetails forAdmin={true} />} />
                    <Route path="applications" element={<ListOfApplications />} />
                  </Route>

                  <Route path="users">
                    <Route path="homeOwners" element={<OwnerListerPage />} />
                    <Route path="tenants" element={<TenantListerPage />} />
                    <Route path="buyers" element={<BuyerListerPage />} />
                    <Route path="admins" element={<ProtectedRoute roles={['admin']} requireSuperAdmin><AdminListerPage /></ProtectedRoute>} />
                    <Route path="addAdmin" element={<ProtectedRoute roles={['admin']} requireSuperAdmin><AddAdminPage /></ProtectedRoute>} />
                  </Route>

                  <Route path="reports" element={<Test />} />
                </Route>

                {/* Tenant Routes */}
                <Route path="/tenant" element={<ProtectedRoute roles={['tenant']}><TenantDashboard /></ProtectedRoute>} >
                  <Route path="applications" element={<TenantApplications />} />
                  <Route path="rentedHomes" element={<TenantRentedHomes />} />
                  <Route path="mRequest" element={<MaintenanceRequests />} />
                  <Route path="mRequests/new" element={<NewMRequest />} />
                  <Route path="mRequests/new/:appId" element={<RequestForm />} />
                </Route>

                {/*  Buyer page  and there should be a Buyer dashboard*/}
                <Route path="/buyer" element={<ProtectedRoute roles={['buyer']}><BuyerDashBoard /></ProtectedRoute>} >
                  <Route path="applications" element={<BuyerApplications />} />
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

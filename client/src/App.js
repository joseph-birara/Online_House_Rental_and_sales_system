import { Routes, Route } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import Buy from "./pages/Buy";
import LandingPage from "./pages/LandingPage";
import Rent from "./pages/Rent";
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
//blue-black: #091240 ,  light-blue: #1890db

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
                <Route
                  path="/homeOwner"
                  element={
                    // <DashboardContextProvider>
                    <HomeownerDashboard />
                    // </DashboardContextProvider>
                  }
                >
                  <Route path="homes">
                    <Route path="onListing" element={<HomesList rented={false} />} />
                    <Route path="onListing/:id" element={<PlacesFormPage />} />
                    <Route path="rented" element={<HomesList rented={true} />} />
                    <Route path="new" element={<PlacesFormPage />} />
                  </Route>
                  <Route
                    path="applicants"
                    element={<Applicants />}
                  />
                  <Route
                    path="tenants"
                    element={
                      <UsersList userType="tenant/plain" removeDropdown={true} />
                    }
                  />
                  <Route path="maintenanceRequests" element={<RequestsPage />} />
                </Route>

                <Route
                  path="/admin"
                  element={
                    // <DashboardContextProvider>
                    <AdminDashboard />
                    //  </DashboardContextProvider>
                  }
                >
                  <Route path="homes">
                    <Route
                      path="onListing"
                      element={<HomesListPage />}
                    />
                    <Route
                      path="rented"
                      // element={<HomesList forAdmin={true} rented={true} />}
                      element={<HomesListPage DisplayRented={true} />}
                    />
                    <Route
                      path="home"
                      element={<HomeDetails forAdmin={true} />}
                    />
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

                <Route path="/homeDetails/:id" element={<HomeDetails />} />
                <Route
                path="/tenant"
                element={
                  //<DashboardContextProvider>
                    <TenantDashboard />
                  //</DashboardContextProvider>
                }
              >
                <Route path="applications" element={<TenantApplications />} />
                <Route path="mRequests" element={<MaintenanceRequests />} />
                <Route path="mRequests/new" element={<NewMRequest />} />
              </Route>
              </Routes>
            </main>
          </div>

        </DashboardContextProvider>

      </UtilityContextProvider>
    </UserContextProvider>
  );
}

export default App;

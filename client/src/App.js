import { Routes, Route } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import Buy from "./pages/Buy";
import LandingPage from "./pages/LandingPage";
import Rent from "./pages/Rent";
import Test from "./pages/Test";
import Home from "./components/home/Home";
import HomeDetails from "./components/home/HomeDetails";
import { DashboardContextProvider } from "./contexts/DashboardContextProvider";
import HomeownerDashboard from "./pages/HomeownerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

//blue-black: #091240 ,  light-blue: #1890db

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Home />} />
          <Route
            path="/homeOwner"
            element={
              <DashboardContextProvider>
                <HomeownerDashboard />
              </DashboardContextProvider>
            }
          >
            <Route path="homes">
              <Route path="onListing" element={<Test />} />
              <Route path="rented" element={<Test />} />
              <Route path="new" element={<Test />} />
            </Route>
            <Route path="applicants" element={<Test />} />
            <Route path="tenants" element={<Test />} />
            <Route path="maintenanceRequests" element={<Test />} />
          </Route>

          <Route
            path="/admin"
            element={
              <DashboardContextProvider>
                <AdminDashboard />
              </DashboardContextProvider>
            }
          >
            <Route path="homes">
              <Route path="onListing" element={<Test />} />
              <Route path="rented" element={<Test />} />
            </Route>
            <Route path="users">
              <Route path="homeOwners" element={<Test />} />
              <Route path="tenants" element={<Test />} />
              <Route path="buyers" element={<Test />} />
            </Route>
            <Route path="reports" element={<Test />} />
          </Route>
          <Route path="/homeDetails" element={<HomeDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

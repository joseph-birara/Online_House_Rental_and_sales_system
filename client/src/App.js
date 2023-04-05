import { Routes, Route } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import Buy from "./pages/Buy";
import HomeOwner from "./pages/HomeOwner";
import LandingPage from "./pages/LandingPage";
import Rent from "./pages/Rent";
import Home from "./components/Home";
import HomeDetails from "./components/HomeDetails";

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
          <Route path="/homeOwner" element={<HomeOwner />} />
          <Route path="/homeDetails" element={<HomeDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

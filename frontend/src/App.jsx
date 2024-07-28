import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import Index from "./pages/Index";
import Login from "./pages/Auth/Login";
import ProfileVolunteer from "./pages/ProfileVolunteer";
import ProfileCitizen from "./pages/ProfileCitizen";
import DetailWaste from "./pages/DetailWaste";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/volunteer" element={<ProfileVolunteer />} />
          <Route path="/profile/citizen" element={<ProfileCitizen />} />
          <Route path="/waste/:id" element={<DetailWaste />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

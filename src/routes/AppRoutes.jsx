import { Routes, Route } from "react-router-dom";

// Layout
import DashboardLayout from "../layouts/DashboardLayout";

// Pages
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import Calendar from "../pages/Calendar/Calendar";
import Missions from "../pages/Missions/Mission";
import Study from "../pages/Study/Study";
import Developer from "../pages/Developer/Developer";
import Projects from "../pages/Projects/Projects";
import Finance from "../pages/Finance/Finance";
import Analytics from "../pages/Analytics/Analytics";
import Mail from "../pages/Mail/Mail";
import Notes from "../pages/Notes/Notes";
import Focus from "../pages/Focus/Focus";
import Achievements from "../pages/Achievements/Achievements";
import Settings from "../pages/Settings/Settings";

function AppRoutes() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Dashboard Layout */}
      <Route path="/" element={<DashboardLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="missions" element={<Missions />} />
        <Route path="study" element={<Study />} />
        <Route path="developer" element={<Developer />} />
        <Route path="projects" element={<Projects />} />
        <Route path="finance" element={<Finance />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="mail" element={<Mail />} />
        <Route path="notes" element={<Notes />} />
        <Route path="focus" element={<Focus />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
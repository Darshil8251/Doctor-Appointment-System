import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoutes from "./components/protectedRoutes";
import PublicRoutes from "./components/publicRoutes";
import ApplyDoctor from "./pages/ApplyDoctor";
import Notification from "./pages/Notification";
import Doctors from "./pages/admin/Doctors";
import Users from "./pages/admin/Users";
import Profile from "./pages/Doctor/Profile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          {/* it for admin routes */}
          <Route
            path="/apply-doctor"
            element={
              <ProtectedRoutes>
                <ApplyDoctor />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <ProtectedRoutes>
                <Doctors />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/Users"
            element={
              <ProtectedRoutes>
                <Users />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/admin/Users"
            element={
              <ProtectedRoutes>
                <Users />
              </ProtectedRoutes>
            }
          />

          {/* user route */}

          <Route
            path="/doctor/profile/:id"
            element={
              <ProtectedRoutes>
                <Profile/>
              </ProtectedRoutes>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoutes>
                <Notification />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

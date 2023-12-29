import DashLayout from "@layouts/DashLayout";
import ProfileLayout from "@layouts/ProfileLayout";
import Home from "@pages/Home";
import Login from "@pages/Login";
import Signup from "@pages/Signup";
import Layout from "Layout";
import { AuthContextProvider } from "context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" />
            <Route path="profile" element={<ProfileLayout />} />
            <Route path="dashboard" element={<DashLayout />} />
          </Route>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;

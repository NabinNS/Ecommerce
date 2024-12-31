import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import { AuthContext } from "./AuthContext";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import authService from "./appwrite/appwrite.js";
// import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, []);
  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Outlet />
        <Footer />
      </AuthContext.Provider>
    </>
  );
}

export default App;

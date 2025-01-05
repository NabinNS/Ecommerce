import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { AuthContext } from "../../AuthContext";
import authService from "../../appwrite/appwrite";

function Admin() {
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
        <Sidebar />
        <div className="content">
          <Outlet />
        </div>
      </AuthContext.Provider>
    </>
  );
}
export default Admin;

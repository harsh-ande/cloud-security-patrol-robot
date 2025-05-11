import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const useAuthCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const Navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check for session ID (auth token) in localStorage
    const token = localStorage.getItem("user");
    // Set authentication status based on token existence
    if (token) {
      setIsAuthenticated(true);
    } else {
      if (window.location.pathname == "/authentication/sign-in") {
        setIsAuthenticated(true);
        console.log({ isAuthenticated });
        console.log({ location });
      } else {
        setIsAuthenticated(false);
        // Navigate("error");
      }
    }
    return () => {};
  }, [isAuthenticated]); // Empty dependency array to run only once on mount

  return isAuthenticated;
};

export default useAuthCheck;

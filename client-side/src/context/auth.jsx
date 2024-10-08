import { useState, useEffect, useContext, createContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);
      setAuth({
        user: parseData.user,
        token: parseData.token,
      });
    }
    axios.defaults.headers.common["Authorization"] = auth?.token; // Set default headers for axios
  }, [auth.token]); // Update axios header whenever token changes

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

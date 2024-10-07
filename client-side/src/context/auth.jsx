import { useState, useEffect, useContext, createContext } from "react";
// for props
import PropTypes from "prop-types";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  return (

      <AuthContext.Provider value={[auth, setAuth]}>
    {children}
    </AuthContext.Provider>
)
}

 const useAuth = () => useContext(AuthContext);

 export{useAuth ,AuthProvider}
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}
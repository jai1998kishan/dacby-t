// import { useState, useEffect, createContext } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");

//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//   }, []);
//   console.l(efefe);

//   const login = (data) => {
//     setUser(data);
//     localStorage.setItem("user", JSON.stringify(data));
//   };

//   const logout = (data) => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

//===============================

import { createContext } from "react";

export const AuthContext = createContext();

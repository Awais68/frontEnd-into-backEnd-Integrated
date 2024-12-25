// import { createContext, useState } from "react";
// // import Cookies from "js-cookie";

// export const AuthContext = createContext();

// export default function AuthContextProvider({ children }) {
//   const [user, setUser] = useState(null);
//   return (
//     <AuthContext.Provider value={{ user, setUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};


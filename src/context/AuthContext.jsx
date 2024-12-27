
import Cookies from 'js-cookie';
import { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';
import appRoutes from '../constant/constant';
import axios from 'axios';



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      const token = Cookies?.get("token")
      if (token) {
        getUser();
      }
    }
  }, [user])

  const getUser = () => {
    axios
      .get(appRoutes.getMyInfo, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      })
      .then((res) => {
        console.log("response from get my Info  API=>>>", res.data);
        setUser(res.data.user);

      })
      .catch((err) => console.log(err))
  }


  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
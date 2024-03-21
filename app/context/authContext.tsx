"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useContext, useState } from "react";
import Cookies from "js-cookie";
type authContextType = {
  idUser: string;
  user: string;
  accessToken: string;
  login: (emai: string, password: string) => Promise<void>;
  logout: () => void;
};

const authContextDefaultValues: authContextType = {
  idUser: null,
  user: null,
  accessToken: null,
  login: async () => {},
  logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<string>("");
  const [idUser, setIdUser] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  const navigate = useRouter();
  const login = async (email: string, password: string) => {
    try {
      const res = await axios
        .post("http://localhost:3000/api/users/sign-in", { email, password })
        .then((res) => {
          const result = res.data.data;
          // console.log(result);
          // setUser(result.email);
          // setIdUser(result._id);
          // setAccessToken(result.accessToken);
          Cookies.set("accessToken-login", result.accessToken, { expires: 1 });
          Cookies.set("email-login", result.email, { expires: 1 });
          Cookies.set("id-login", result._id, { expires: 1 });
          const userEmail = Cookies.get("email-login");
          const userId = Cookies.get("id-login");
          const accessToken = Cookies.get("accessToken-login");
          setUser(userEmail);
          setIdUser(userId);
          setAccessToken(accessToken);

          navigate.push("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    navigate.push("/login");
    const userEmail = Cookies.remove("email-login");
    const userId = Cookies.remove("id-login");
    const accessToken = Cookies.remove("accessToken-login");
  };

  const value = {
    user,
    accessToken,
    idUser,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
// export type User = {
//   _id: String;
//   email: String;
// };
// export const UserContext = createContext(null);

// export function useUserContext() {
//   const userContext = useContext(UserContext);

//   if (!userContext) {
//     throw new Error("useContext must be used in UserProvider");
//   }

//   return userContext;
// }

// export function UserProvider({ children }) {
//   const { user, setUser } = useState("username here");
//   return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
// }

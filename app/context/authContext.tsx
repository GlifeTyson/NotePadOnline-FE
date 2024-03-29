"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useContext, useState } from "react";

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
  let [user, setUser] = useState<string>("");
  let [idUser, setIdUser] = useState<string>("");
  let [accessToken, setAccessToken] = useState<string>("");
  const navigate = useRouter();
  const login = async (email: string, password: string) => {
    try {
      const res = await axios
        .post("http://localhost:3000/api/users/sign-in", { email, password })
        .then((res) => {
          const result = res.data.data;
          // console.log(result);
          localStorage.setItem("email", result.email);
          localStorage.setItem("userId", result._id);
          localStorage.setItem("accessToken", result.accessToken);

          setUser(localStorage.getItem("email"));
          setIdUser(localStorage.getItem("userId"));
          setAccessToken(localStorage.getItem("accessToken"));

          navigate.push("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    navigate.push("/login");
    localStorage.clear();
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

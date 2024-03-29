import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const { logout } = useAuth();
  const [user, setUser] = useState<string>("");
  const navigate = useRouter();
  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const emailUser = localStorage.getItem("email");
    const accessToken = localStorage.getItem("accessToken");
    if (!emailUser || !accessToken) {
      return navigate.push("/login");
    } else {
      setUser(emailUser);
    }
  }, [navigate]);
  return (
    <div className="flex w-full h-10 bg-[#4682b4] text-white justify-between px-10 items-center">
      <div>
        <a href="/">NotePadOnline</a>
      </div>
      <div className="h-full flex items-center">
        <ul className="flex justify-center gap-8">
          {user ? (
            <>
              <li>Email: {user}</li>
              <li>
                <button
                  className="w-20 h-full text-white rounded-md hover:bg-[#286090]"
                  onClick={() => handleLogout()}
                >
                  Log Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>Please login</li>
              <li>
                <Link href={"/login"}>Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

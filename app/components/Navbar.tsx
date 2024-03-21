import Link from "next/link";
import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";
import Cookies from "js-cookie";
const Navbar = () => {
  const { user, logout } = useAuth();
  let email = Cookies.get("email-login");
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="flex w-full h-10 bg-[#4682b4] text-white justify-between px-10 items-center">
      <div>
        <a href="/">NotePadOnline</a>
      </div>
      <div>
        <ul className="flex justify-center gap-8">
          {user ? (
            <>
              <li>Email: {user}</li>
              <li>
                <button onClick={() => handleLogout()}>Log Out</button>
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

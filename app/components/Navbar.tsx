import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuth } from "../context/authContext";

const Navbar = () => {
  const navigate = useRouter();
  const { user, login, logout } = useAuth();
  const handleLogout = () => {
    logout();
  };
  useEffect(() => {
    if (!user) {
      navigate.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <div className="flex w-full h-10 bg-[#4682b4] text-white justify-between px-10 items-center">
      <div className="">NotePadOnline</div>
      <div className="">
        <ul className="flex justify-center gap-8">
          <li>Made from scratch by Tyson</li>
          {user ? (
            <>
              <li>Email: {user}</li>
              <button onClick={() => handleLogout()}>Log Out</button>
            </>
          ) : (
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

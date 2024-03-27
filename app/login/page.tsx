"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAuth } from "../context/authContext";

//...
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const handleClick = () => {
    if (email.length == 0 || password.length == 0) {
      return alert("Email or password cant be null");
    }
    login(email, password);
  };
  return (
    <div className="text-center mt-20">
      <h1 className="text-center">Login Page</h1>
      <br />
      <div className="flex flex-col gap-3 w-80 h-fit rounded-md text-center mx-auto bg-slate-500 p-3">
        <h1>Email</h1>
        <input
          className="border-black border-2 rounded-md placeholder:text-center"
          required
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <h1>Password</h1>
        <input
          className="border-black border-2 rounded-md placeholder:text-center"
          required
          minLength={5}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br />
        <button
          className="bg-slate-400 w-16 mx-auto rounded-md"
          onClick={() => handleClick()}
        >
          Login
        </button>
      </div>
      <br />
      <br />
      <a href="/register">
        <u>Not a member? Please sign up for free</u>
      </a>
    </div>
  );
};

export default Login;

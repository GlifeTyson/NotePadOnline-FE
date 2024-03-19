"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();
  const handleClick = async () => {
    if (name.length == 0 || email.length == 0 || password.length == 0) {
      return console.log("Fill all input");
    }
    try {
      const req = await axios.post("http://localhost:3000/api/users/", {
        name,
        email,
        password,
      });
      console.log(req.data);
      const message = req.data.message;
      if (message) {
        router.push("/login");
        alert("Register success");
      }
    } catch (error) {
      console.log({ message: error });
    }
  };
  return (
    <div className="text-center mt-20">
      <h1 className="text-center">Register Page</h1>
      <br />
      <div className="flex flex-col gap-3 w-80 h-fit rounded-md text-center mx-auto bg-slate-500 p-3">
        <h1>Username</h1>
        <input
          className="border-black border-2 rounded-md placeholder:text-center"
          required
          type="text"
          placeholder="Username"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <h1>Email</h1>
        <input
          className="border-black border-2 rounded-md placeholder:text-center"
          required
          minLength={5}
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <h1>Password</h1>
        <input
          className="border-black border-2 rounded-md placeholder:text-center"
          required
          minLength={5}
          type="text"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <br />
        <button
          className="bg-slate-400 w-16 mx-auto rounded-md"
          onClick={() => handleClick()}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;

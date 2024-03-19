"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Note from "./components/Note";

export default function Home() {
  return (
    <div className="bg-slate-300 h-full">
      <Navbar />
      <Note />
    </div>
  );
}

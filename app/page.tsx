"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [diaries, setDiaries] = useState<any[]>([]);
  useEffect(() => {
    const fetchDiary = async () => {
      try {
        const req = await axios.get("//localhost:3000/api/diaries");
        setDiaries(req.data);
        console.log(req.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDiary();
  }, []);

  return (
    <main className="">
      <div className="">
        <h1>Hello, Home page!</h1>
        {diaries?.map((value, index) => {
          return (
            <div
              className="flex flex-col justify-center items-center w-full h-32"
              key={index}
            >
              <p>{value.title}</p>
              <p>{value.content}</p>
              <p>{value.creator}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}

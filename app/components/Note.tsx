import axios from "axios";
import React, { useEffect, useState } from "react";
import { createNote, fetchNote } from "../service/apiCall";

const Diary = () => {
  const [note, setNote] = useState<any>([]);
  const [title, setTitle] = useState<String>("");
  const [content, setContent] = useState<String>("");

  useEffect(() => {
    fetchNote();
    // console.log(userId);
  }, []);
  return (
    <div className=" flex flex-col mt-10  text-[#10589b] w-full h-screen">
      <div className="flex flex-col justify-center items-center">
        <input
          type="text"
          required
          placeholder="Name Title"
          onChange={(e) => setTitle(e.target.value)}
          className="≈ h-10 w-4/5 placeholder:px-4 text-justify rounded-md"
        ></input>
        <h1 className="p-3">
          <b>Content Part</b>
        </h1>
        <textarea
          className="h-80 w-4/5 rounded-md placeholder:px-4 placeholder:py-2"
          placeholder="Note Content"
          required
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <button
        onClick={() => {
          // createNote(title, content, userId);
        }}
        className="w-20 bg-[#337ab7] border-[#2e6da4] text-white ml-36 mt-10 px-[6px] py-[12px] rounded-md hover:bg-[#286090]"
      >
        Save
      </button>
      <span className="block w-4/5 bg-[#4682b4] h-1 mx-auto rounded-md my-2"></span>
      <div className="flex justify-around items-center">
        <h1>My Notes</h1>
        {note?.map((value: any, index: number) => {
          return (
            <div className="block w-fit h-fit bg-white" key={index}>
              <p className="text-center">
                <u>{value.title}</u>
              </p>
              <p>{value.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Diary;

import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/authContext";

interface Props {
  sharedNote: any;
  // setTitle: React.Dispatch<React.SetStateAction<string>>;
  // setContent: React.Dispatch<React.SetStateAction<string>>;
  // setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}
const SharedNote = ({ sharedNote }) => {
  const [option, setOption] = useState("Default");
  const { accessToken } = useAuth();

  const getNote = async () => {
    try {
      const res = await axios.get(`//localhost:3000/api/diaries/shared`, {
        headers: { "x-token": accessToken },
      });
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <span className="block w-4/5 bg-[#4682b4] h-1 mx-auto rounded-md my-2"></span>
      <div>
        <h1 className="text-center">
          <u>Shared Notes</u>
        </h1>
        <div className="flex flex-row w-full justify-center items-center gap-10">
          {sharedNote ? (
            sharedNote.map((value: any, index: number) => {
              return (
                <div
                  className="flex items-center justify-center gap-1"
                  key={index}
                >
                  <a
                    className="hover:underline text-[12px]"
                    // href="#"
                    onClick={(e) => {
                      getNote();
                      // setTitle(value.title);
                      // setContent(value.content);
                      // setDisabled(true);
                    }}
                  >
                    {value.title}
                  </a>
                  <select
                    name="dropdown"
                    className="w-[14px] left-10 bg-transparent rounded-sm hover:bg-[rgb(59,139,209)]"
                  >
                    <option value={option}>Edit</option>
                    <option
                      value={option}
                      onChange={() => {
                        setOption("Delete");
                      }}
                    >
                      Delete
                    </option>
                  </select>
                </div>
              );
            })
          ) : (
            <p>Not have any shared note yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedNote;

import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/authContext";
interface Props {
  note: any;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
}
const MyNote: React.FC<Props> = ({
  note,
  setTitle,
  setContent,
  setDisabled,
  setHidden,
}) => {
  const { accessToken } = useAuth();
  const [option, setOption] = useState("Default");
  const getNote = async (noteElement: any) => {
    try {
      const res = await axios.get(
        `//localhost:3000/api/diaries/${noteElement._id}`,
        {
          headers: { "x-token": accessToken },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h1 className="text-center">
        <u>My Notes</u>
      </h1>
      <div className="flex flex-row w-full justify-center items-center gap-10">
        {note ? (
          note.map((value: any, index: number) => {
            return (
              <div
                className="flex items-center justify-center gap-1"
                key={index}
              >
                <a
                  className="hover:underline text-[12px]"
                  href="#"
                  onClick={() => {
                    getNote(value);
                    setTitle(value.title);
                    setContent(value.content);
                    setDisabled(true);
                    setHidden(true);
                  }}
                >
                  {value.title}
                </a>
                <select
                  name="dropdown"
                  className="w-[14px] left-10 bg-transparent rounded-sm hover:bg-[rgb(59,139,209)]"
                >
                  <option
                    value={option}
                    onChange={(e) => {
                      setOption("Edit");
                    }}
                  >
                    Edit
                  </option>
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
          <p>Not have any note yet</p>
        )}
      </div>
    </div>
  );
};

export default MyNote;

import axios from "axios";
import React, { useState } from "react";
import { useAuth } from "../context/authContext";

interface Props {
  sharedNote: any;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setToggleComment: React.Dispatch<React.SetStateAction<boolean>>;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  setDisableSaveButton: React.Dispatch<React.SetStateAction<boolean>>;
}
const SharedNote = ({
  sharedNote,
  setTitle,
  setContent,
  setDisabled,
  setToggleComment,
  setHidden,
  setDisableSaveButton,
}) => {
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
          {!!sharedNote && sharedNote.length > 0 ? (
            sharedNote.map((value: any, index: number) => {
              return (
                <div
                  className="flex items-center justify-center gap-1"
                  key={index}
                >
                  <a
                    className="hover:underline text-[12px] cursor-pointer"
                    onClick={() => {
                      getNote();
                      setTitle(value.title);
                      setContent(value.content);
                      setDisabled(true);
                      // setToggleComment(true);
                      setHidden(false);
                      setDisableSaveButton(true);
                    }}
                  >
                    {value.title}
                  </a>
                </div>
              );
            })
          ) : (
            <p className="text-[12px]">Not have any shared note yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SharedNote;

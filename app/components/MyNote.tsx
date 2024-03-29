import axios from "axios";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/navigation";
import CommentSection from "./CommentSection";

interface MyNoteProps {
  notes: any;
  noteId: any;
  toggleComment: boolean;
  colorIndex: number;
  selected: boolean;
  setSelect: React.Dispatch<React.SetStateAction<boolean>>;
  setColorIndex: React.Dispatch<React.SetStateAction<number>>;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  setHidden: React.Dispatch<React.SetStateAction<boolean>>;
  setNoteId: React.Dispatch<React.SetStateAction<string>>;
  setDisableSaveButton: React.Dispatch<React.SetStateAction<boolean>>;
  setViewers: React.Dispatch<React.SetStateAction<any>>;
  setComments: React.Dispatch<React.SetStateAction<any>>;
}
const MyNote: React.FC<MyNoteProps> = ({
  notes,
  noteId,
  toggleComment,
  selected,
  setSelect,
  setTitle,
  setContent,
  setDisabled,
  setHidden,
  setNoteId,
  setDisableSaveButton,
  setViewers,
  setComments,
  colorIndex,
  setColorIndex,
}) => {
  const fetchCommentByUser = async (
    id: string,
    accessTokenLocal: string,
    setComments: React.Dispatch<React.SetStateAction<string>>
  ) => {
    try {
      const res = await axios.get("//localhost:3000/api/comments", {
        params: {
          offset: 0,
          limit: 10,
          orderBy: "createdAt_DESC",
          filter: `{"diaryId":"${id}"}`,
        },
        headers: { "x-token": accessTokenLocal },
      });
      const result = res.data.data;
      console.log(result);
      // // console.log(result.comments);
      setComments(res.data.data.comments);
    } catch (error) {
      console.log(error);
    }
  };
  // const [comment, setComment] = useState<any>([]);
  // const [colorIndex, setColorIndex] = useState<number>(-1);
  const [accessTokenLocal, setAccessToken] = useState<string>("");
  // Function to retrieve accessToken from localStorage
  const getAccessTokenFromLocalStorage = () => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setAccessToken(storedToken);
    }
  };
  // useEffect hook to run once on component mount to get accessToken from localStorage
  useEffect(() => {
    getAccessTokenFromLocalStorage();
  }, []);

  // const fetchCommentByUser = async (idNote:string) => {
  //   try {
  //     // alert(id);
  //     const res = await axios.get("//localhost:3000/api/comments", {
  //       params: {
  //         offset: 0,
  //         limit: 10,
  //         orderBy: "createdAt_DESC",
  //         filter: `{"diaryId":"${idNote}"}`,
  //       },
  //       headers: { "x-token": accessTokenLocal },
  //     });
  //     const result = res.data.data;
  //     // console.log(result.comments);
  //     setComments(res.data.data.comments);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className="bg-slate-300 h-fit p-10">
      <span className="block w-4/5 bg-[#4682b4] h-1 mx-auto rounded-md"></span>
      <h1 className="text-center">
        <u>My Notes</u>
      </h1>
      <div className="flex flex-row w-full justify-center items-center gap-10">
        {!!notes && notes.length > 0 ? (
          notes.map((value: any, index: number) => {
            return (
              <div
                className="flex items-center justify-center gap-1"
                key={index}
              >
                <a
                  className={
                    !selected || index !== colorIndex
                      ? "underline text-[12px] cursor-pointer"
                      : "text-[12px] cursor-pointer bg-white"
                  }
                  onClick={() => {
                    fetchCommentByUser(
                      value._id,
                      accessTokenLocal,
                      setComments
                    );
                    setSelect(true);
                    setColorIndex(index);
                    setTitle(value.title);
                    setContent(value.content);
                    setDisabled(false);
                    setHidden(true);
                    setNoteId(value._id);
                    setDisableSaveButton(false);
                    setViewers(value.viewers);
                  }}
                >
                  {value.title}
                </a>
              </div>
            );
          })
        ) : (
          <p className="text-[12px]">Not have any note yet</p>
        )}
      </div>
    </div>
  );
};

export default MyNote;
